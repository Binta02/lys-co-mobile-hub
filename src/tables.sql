-- Table des espaces disponibles
CREATE TABLE public.spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  capacity INT,
  price_hour NUMERIC(10, 2),
  price_half_day NUMERIC(10, 2),
  price_full_day NUMERIC(10, 2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- 1) Extension nécessaire pour les contraintes d’exclusion
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- 2) Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3) Fonction pour calculer le period (créneau) avant INSERT ou UPDATE
CREATE OR REPLACE FUNCTION compute_reservation_period()
RETURNS TRIGGER AS $$
BEGIN
  -- Associe date + time → timestamp without time zone, puis construit un TSRANGE
  NEW.period = tsrange(
    (NEW.reservation_date + NEW.start_time),
    (NEW.reservation_date + NEW.end_time),
    '[)'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4) Création (ou modification) de la table reservations
CREATE TABLE IF NOT EXISTS public.reservations (
  id               UUID                     PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID                     NOT NULL REFERENCES auth.users(id),
  space_id         UUID                     NOT NULL REFERENCES public.spaces(id),
  reservation_date DATE                     NOT NULL,
  start_time       TIME WITHOUT TIME ZONE   NULL,
  end_time         TIME WITHOUT TIME ZONE   NULL,
  reservation_type TEXT                     NOT NULL
    CHECK (reservation_type IN ('hour','morning','afternoon','full_day')),
  status           TEXT                     NOT NULL DEFAULT 'confirmed'
    CHECK (status IN ('pending','confirmed','cancelled')),
  price            NUMERIC(10,2)            NOT NULL,
  created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  period           TSRANGE                  NOT NULL
);

-- 5) Trigger pour mettre à jour updated_at
CREATE TRIGGER trg_reservations_updated
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- 6) Trigger pour calculer period avant INSERT et UPDATE
CREATE TRIGGER trg_reservations_compute_period
  BEFORE INSERT OR UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION compute_reservation_period();

-- 7) Contrainte d’exclusion pour empêcher tout chevauchement
ALTER TABLE public.reservations
  ADD CONSTRAINT no_reservation_overlap
    EXCLUDE USING GIST (
      space_id WITH =,
      period   WITH &&
    );

-- 8) Check constraint pour s’assurer que start_time < end_time si type = 'hour'
ALTER TABLE public.reservations
  ADD CONSTRAINT chk_valid_time_range
    CHECK (
      (reservation_type = 'hour' AND start_time < end_time)
      OR reservation_type <> 'hour'
    );

-- 9) Index pour accélérer les recherches par espace et date
CREATE INDEX IF NOT EXISTS idx_reservations_space_date
  ON public.reservations (space_id, reservation_date);

-- 10) Activer la Row-Level Security
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- 11) Politiques RLS : chaque utilisateur gère seulement ses réservations
CREATE POLICY select_own_reservations ON public.reservations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY insert_own_reservations ON public.reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_reservations ON public.reservations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY delete_own_reservations ON public.reservations
  FOR DELETE USING (auth.uid() = user_id);
