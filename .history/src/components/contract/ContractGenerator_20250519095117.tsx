import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define contract styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textDecoration: "underline",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 3,
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    width: 10,
  },
  listItemText: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "gray",
  },
  column: {
    width: "48%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

// Register font
Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.ttf",
});

interface ContractData {
  companyName: string;
  fullName: string;
  address: string;
  addressDetails?: string;
  city: string;
  postalCode: string;
  siretNumber: string;
  businessActivity: string;
  planPrice: number;
  planName: string;
  date: string;
}

// Contract Document Component
const ContractDocument = ({ data }: { data: ContractData }) => {
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>Lys & Co</Text>
          <Text style={styles.address}>
            28 Rue de l'église, 95170 Deuil-la-Barre
          </Text>
        </View>

        <Text style={styles.title}>CONTRAT DE DOMICILIATION COMMERCIALE</Text>

        <View style={styles.section}>
          <Text style={styles.text}>Entre les soussignés :</Text>

          <Text style={styles.subsectionTitle}>
            La Société de Domiciliation :
          </Text>
          <Text style={styles.text}>Nom : Europe Domiciliation</Text>
          <Text style={styles.text}>
            Adresse : 28 Rue de l'Eglise – 95170 Deuil la Barre
          </Text>
          <Text style={styles.text}>Numéro SIRET : 804 180 792</Text>
          <Text style={styles.text}>Agrément Préfectoral : 04_95_2023</Text>
          <Text style={styles.text}>
            Représenté par : Barbara EZELIS, gérante
          </Text>

          <Text style={styles.subsectionTitle}>ET</Text>

          <Text style={styles.subsectionTitle}>Le Domicilié :</Text>
          <Text style={styles.text}>Société : {data.companyName}</Text>
          <Text style={styles.text}>Nom et Prénom : {data.fullName}</Text>
          <Text style={styles.text}>Adresse : {data.address}</Text>
          {data.addressDetails && (
            <Text style={styles.text}>{data.addressDetails}</Text>
          )}
          <Text style={styles.text}>
            {data.postalCode} {data.city}
          </Text>
          <Text style={styles.text}>Numéro SIRET : {data.siretNumber}</Text>
          <Text style={styles.text}>
            Activité de l'entreprise : {data.businessActivity}
          </Text>
          <Text style={styles.text}>Représenté par : {data.fullName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subsectionTitle}>Préambule</Text>
          <Text style={styles.text}>
            Le Domiciliaire, en sa qualité d'entreprise agréée (n° préfectoral
            d'agrément : 04_95_2023) conformément aux dispositions du Code du
            commerce et aux articles R.123-167 à R.123-168, propose des services
            de domiciliation d'entreprise.
          </Text>
          <Text style={styles.text}>
            Le Domicilié souhaite bénéficier de ces services pour y établir son
            siège social.
          </Text>
          <Text style={styles.text}>
            Les parties conviennent de ce qui suit :
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article 1 – Objet du contrat</Text>
          <Text style={styles.text}>
            Le présent contrat a pour objet de permettre au Domicilié d'établir
            son siège social à l'adresse suivante :
          </Text>
          <Text style={styles.text}>
            28 Rue de l'Eglise – 95170 Deuil la Barre
          </Text>
          <Text style={styles.text}>
            Cette adresse sera utilisée par le Domicilié pour ses démarches
            administratives, fiscales et commerciales, conformément à la
            réglementation en vigueur.
          </Text>
          <Text style={styles.text}>
            L'adresse de domiciliation devra donc devenir le siège social de
            l'entreprise. Le Domicilié est habilité par la présente convention à
            recevoir à cette même adresse le courrier qui lui est destiné. Il
            pourra également utiliser cette adresse sur son papier à en-tête
            ainsi que sur ses documents commerciaux.
          </Text>
          <Text style={styles.text}>
            Le présent engagement de domiciliation est fait aux conditions
            prévues par les recommandations émises par la Chambre de Commerce et
            d'Industrie de Pontoise pour l'exercice de la domiciliation
            commerciale.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 2 – Obligations du Domiciliaire
          </Text>
          <Text style={styles.text}>Le Domiciliaire s'engage à :</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Mettre à disposition l'adresse mentionnée à l'article 1 pour
              l'établissement du siège social du Domicilié.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Assurer la réception, la conservation et, le cas échéant, la mise
              à disposition ou l'envoi des courriers du Domicilié selon les
              modalités définies à l'Article 4.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Tenir à disposition les documents nécessaires en cas de contrôle
              par les autorités compétentes.
            </Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 3 – Obligations du Domicilié
          </Text>
          <Text style={styles.text}>Le Domicilié s'engage à :</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Utiliser l'adresse exclusivement pour son activité
              professionnelle.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Communiquer au Domiciliaire toute modification concernant sa
              situation administrative ou légale (changement de statut, de
              gérant, cessation d'activité, etc.) et devra le notifier par écrit
              au Domiciliaire et fournir tout nouveau document justificatif dès
              que ce changement aura été pris en compte par l'organisme
              d'immatriculation concerné.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Fournir les documents requis lors de la signature du contrat,
              notamment :
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              Un justificatif d'identité du gérant
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              Un justificatif de domicile personnel du gérant (de moins de 6
              mois)
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              Adresse du comptable (si comptable)
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              Un extrait Kbis pour les sociétés immatriculées (ou preuve de
              dépôt de dossier pour une immatriculation en cours) ou un avis de
              situation Sirene pour ceux qui n'ont pas de Kbis
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              Une copie des statuts pour les entreprises
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}> -</Text>
            <Text style={styles.listItemText}>
              La procuration postale (à faire à La Poste) qui autorise le
              Domiciliaire à signer les recommandés.
            </Text>
          </View>

          <Text style={styles.text}>
            Le Domicilié certifie sur l'honneur l'exactitude des renseignements
            fournis au Domiciliaire et nécessaires à la conclusion du contrat.
            Le contrat est ferme et définitif à la signature et aucun
            remboursement partiel ou total ne pourra être revendiqué par le
            Domicilié pour quelque motif que ce soit.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 4 – Description des prestations de services
          </Text>
          <Text style={styles.text}>
            En regard des sommes versées à la conclusion du contrat, le
            Domiciliaire s'engage à fournir les prestations suivantes :
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Domiciliation commerciale dans les locaux sis : 28 Rue de l'Eglise
              – 95170 Deuil la Barre
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Réception, tri et mise à disposition du courrier destiné au
              Domicilié chaque jour ouvré pendant les horaires définis par le
              Domiciliaire. La garde du courrier ne peut excéder 21 (vingt et
              un) jours. Concernant l'option « Réexpédition », elle sera faite
              une fois par semaine. Un surcoût sera demandé en cas de
              dépassement de 14€ de timbres.
            </Text>
          </View>
          <Text style={styles.text}>
            Le Domiciliataire met à la disposition du Domicilié un bureau
            permettant une réunion régulière des organes chargés de la
            direction, de l'administration ou de la surveillance de l'entreprise
            et l'installation des services nécessaires à la tenue, conservation
            et la consultation de leurs registres et documents prescrits par les
            lois et règlements (Décret N.85.1280du 5 décembre 1985, modifié par
            le décret N°2007.750 du 9 Mai)
          </Text>
          <Text style={styles.text}>
            En aucun cas, la location de bureau ne peut être utilisée par le
            Domicilié pour le recrutement de personnel. « France Travail » devra
            diriger les postulants à l'adresse d'activité du Domicilié et non à
            l'adresse de son siège social.
          </Text>
          <Text style={styles.text}>
            Le Domicilié doit donner procuration au Domiciliaire pour le retrait
            de lettres recommandées. Celles-ci seront acheminées par courrier
            ordinaire. Le Domiciliaire se dégage de toute responsabilité en cas
            de perte ou de transmission tardive de tous courriers.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article 5 – Durée du contrat</Text>
          <Text style={styles.text}>
            Le présent contrat est conclu pour une durée de 6 mois, à compter du{" "}
            {today}, renouvelable par tacite reconduction, sauf dénonciation par
            l'une des parties avec un préavis de 15 (quinze) jours.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 6 – Tarifs et conditions de paiement
          </Text>
          <Text style={styles.text}>
            Le montant de la domiciliation est fixé à {data.planPrice} € par
            mois pour la formule "{data.planName}".
          </Text>
          <Text style={styles.text}>
            Les paiements devront être effectués par virement bancaire, espèce
            ou carte bleu.
          </Text>
          <Text style={styles.text}>
            En cas de retard de paiement, des pénalités équivalentes à 10%
            pourront être appliquées.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 7 – Résiliation du contrat
          </Text>
          <Text style={styles.text}>
            Le contrat pourra être résilié dans les conditions suivantes :
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Par le Domicilié, avec un préavis de 15 (quinze) jours.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemText}>
              Par le Domiciliaire, en cas de non-respect des obligations
              contractuelles du Domicilié ou de non-paiement des sommes dues.
            </Text>
          </View>
          <Text style={styles.text}>
            À l'expiration ou la résiliation du contrat, le Domicilié s'engage à
            procéder immédiatement au changement de son adresse de siège social.
          </Text>
          <Text style={styles.text}>
            Conformément au décret n°5.12.85, le Domiciliaire s'oblige à
            informer le greffier du Tribunal de Commerce, à l'expiration du
            contrat ou en cas de résiliation de celui-ci, de la cessation de la
            domiciliation de l'entreprise dans ses locaux. De plus, les ordres
            de réexpédition des sociétés domiciliées donnés à la poste, ne
            seront pas acceptés conformément à l'instruction du 26/01/2001.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article 8 – Responsabilité</Text>
          <Text style={styles.text}>
            Le Domiciliaire ne pourra être tenu responsable des conséquences
            liées à un retard ou à une perte de courrier imputable à des tiers
            (ex : service postal) ou à un cas de force majeure.
          </Text>
          <Text style={styles.text}>
            Le Domicilié dégage le Domiciliataire de toute responsabilité quant
            à la transmission du courrier effectuée par la Poste ou par des
            entreprises assimilées ainsi que pour tout envoi mal libellé
            (adresse incomplète ou illisible, absence de cédex, ou tout autre
            nom, etc.) reçu à l'intention du Domicilié.
          </Text>
          <Text style={styles.text}>
            Étant précisé que l'autorisation que le Domiciliaire lui accorde ne
            saurait en aucun cas engager sa responsabilité, sous quelque forme
            que ce soit, présente et à venir.
          </Text>
          <Text style={styles.text}>
            Le Domiciliaire ne saurait être tenu en aucune façon responsable du
            rejet du Domicilié par les différents organismes administratifs
            nécessaires à son inscription ou pour tout autre motif et ne
            procédera donc à aucun remboursement.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article 9 – Confidentialité</Text>
          <Text style={styles.text}>
            Les parties s'engagent à préserver la confidentialité des
            informations échangées dans le cadre du présent contrat.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Article 10 – Clauses résolutoires
          </Text>
          <Text style={styles.text}>
            A défaut de paiement d'une seule facture à son échéance ou en cas
            d'inexécution d'une des clauses du présent engagement, la prestation
            de tous les services sera suspendue après mise en demeure. A défaut
            de règlement d'une ou plusieurs factures, rappelé par les soins du
            Domiciliaire, le courrier ne pourra être réexpédié au domicilié. Il
            sera tenu à sa disposition dans nos locaux comme stipulé à l'article
            4 du contrat, dans la limite de 21 (vingt et un) jours. Au-delà, il
            sera renvoyé à l'expéditeur.
          </Text>
          <Text style={styles.text}>
            Le contrat pourra être dénoncé de plein droit par le Domiciliaire
            sans notification en respectant un préavis de 30 jours et la carence
            du Domicilié sera signalée au greffe du Tribunal de Commerce ou au
            Registre des Métiers afin de procéder à la radiation d'office de
            l'entreprise.
          </Text>
          <Text style={styles.text}>
            En cas de contestation liée aux présentes, seul le Tribunal de
            Commerce concerné sera compétent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Litiges</Text>
          <Text style={styles.text}>
            En cas de litige relatif à l'exécution ou l'interprétation du
            présent contrat, les parties s'efforceront de le résoudre à
            l'amiable. À défaut, le litige sera soumis aux juridictions
            compétentes du ressort du siège du Domiciliaire.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Signature</Text>
          <Text style={styles.text}>
            Fait en double exemplaire, à Deuil-la-Barre le {today}
          </Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.subsectionTitle}>Pour le Domiciliaire :</Text>
              <Text style={styles.text}>Nom : EZELIS</Text>
              <Text style={styles.text}>Fonction : GÉRANTE</Text>
              <Text style={styles.text}>Signature :</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.subsectionTitle}>Pour le Domicilié :</Text>
              <Text style={styles.text}>Nom : {data.fullName}</Text>
              <Text style={styles.text}>Signature :</Text>
              <Text style={styles.text}>
                (Précédée de la mention « Lu et Approuvé »)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>28 Rue de l'église, 95170 Deuil-la-Barre</Text>
          <Text>
            lys-and-co.com – tél : 09.53.42.11.63 / 07.56.85.37.02 –
            contact@lys-and-co.com
          </Text>
          <Text>© 2025 Lys & Co – Tous droits réservés</Text>
        </View>
      </Page>
    </Document>
  );
};

// Component to trigger contract download
interface ContractGeneratorProps {
  clientInfo: {
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    businessActivity: string;
    siretNumber: string;
    address: string;
    addressDetails?: string;
    city: string;
    postalCode: string;
    phone?: string;
  };
  planDetails: {
    name: string;
    price: number;
  };
}

const ContractGenerator = ({
  clientInfo,
  planDetails,
}: ContractGeneratorProps) => {
  const contractData: ContractData = {
    companyName: clientInfo.companyName,
    fullName: `${clientInfo.firstName} ${clientInfo.lastName}`,
    address: clientInfo.address,
    addressDetails: clientInfo.addressDetails,
    city: clientInfo.city,
    postalCode: clientInfo.postalCode,
    siretNumber: clientInfo.siretNumber,
    businessActivity: clientInfo.businessActivity,
    planPrice: planDetails.price,
    planName: planDetails.name,
    date: new Date().toLocaleDateString("fr-FR"),
  };

  return (
    <PDFDownloadLink
      document={<ContractDocument data={contractData} />}
      fileName={`contrat-domiciliation-${clientInfo.companyName
        .replace(/\s+/g, "-")
        .toLowerCase()}.pdf`}
      style={{ textDecoration: "none" }}
    >
      {({ loading }) => (
        <Button
          className="w-full bg-lysco-turquoise hover:bg-lysco-turquoise/90"
          disabled={loading}
        >
          <FileText className="mr-2 h-4 w-4" />
          {loading ? "Préparation du contrat..." : "Télécharger votre contrat"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ContractGenerator;
