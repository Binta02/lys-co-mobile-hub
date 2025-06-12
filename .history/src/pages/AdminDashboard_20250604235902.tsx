import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // Charger tous les clients
  useEffect(() => {
    const fetchClients = async () => {
      console.log("🔍 DÉBUT fetchClients");

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error(
          "❌ Erreur récupération utilisateur connecté :",
          userError
        );
        return;
      }

      const currentUserId = userData.user.id;
      console.log("👤 ID utilisateur connecté :", currentUserId);

      // Récupère le champ is_admin du profil actuel
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", currentUserId)
        .single();

      if (profileError) {
        console.error("❌ Erreur récupération profil admin :", profileError);
        return;
      }

      console.log("🔐 Est admin :", profileData?.is_admin);

      if (!profileData?.is_admin) {
        console.warn("⛔️ Utilisateur non admin, accès refusé");
        return;
      }

      // Requête pour TOUS les profils
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name");
      console.log("✅ USERS :", data);
      console.log("❌ error :", error);

      if (error) {
        console.error("❌ Erreur chargement profils :", error);
      } else {
        console.log("✅ Profils récupérés :", data);
        setClients(data || []);
      }
    };

    fetchClients();
  }, []);

  // Charger les documents du client sélectionné
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedClient) return;
      const { data, error } = await supabase
        .from("user_documents")
        .select("*")
        .eq("user_id", selectedClient.id)
        .order("uploaded_at", { ascending: false });

      if (error) console.error("Erreur chargement documents", error);
      else setDocuments(data || []);
    };

    fetchDocuments();
  }, [selectedClient]);

  const handleUpload = async () => {
    if (!file || !selectedClient) return;

    const filePath = `${selectedClient.id}/${file.name}`;

    // 1) Upload dans le bucket documents
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Erreur upload", uploadError);
      return;
    }

    // 2) Récupérer l'URL publique
    const { data: publicUrl } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    // 3) Insérer dans user_documents et récupérer l'objet inséré (avec id)
    const { data: insertedRow, error: insertError } = await supabase
      .from("user_documents")
      .insert({
        user_id: selectedClient.id,
        file_name: file.name,
        file_url: publicUrl.publicUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Erreur insertion", insertError);
    } else {
      // insérer l'objet complet avec son id dans le state
      setFile(null);
      setDocuments((prev) => [insertedRow, ...prev]);
    }
  };

  const handleDelete = async (docId: string) => {
    const { error } = await supabase
      .from("user_documents")
      .delete()
      .eq("id", docId);
    if (error) console.error("Erreur suppression", error);
    else setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestion des clients et de leurs documents
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des clients */}
          <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Clients
            </h2>
            <select
              className="w-full border rounded p-2 text-gray-700"
              onChange={(e) => {
                const client = clients.find((c) => c.id === e.target.value);
                setSelectedClient(client || null);
              }}
              value={selectedClient?.id || ""}
            >
              <option value="">Sélectionner un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name} — {client.email}
                </option>
              ))}
            </select>
          </div>

          {/* Détails du client sélectionné */}
          {selectedClient && (
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Documents de{" "}
                  <span className="text-blue-600">
                    {selectedClient.first_name} {selectedClient.last_name}
                  </span>
                </h2>

                {/* Zone d’upload */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <input
                    type="file"
                    className="block w-full sm:w-auto text-gray-600 file:mr-4 file:py-2 file:px-4
                             file:rounded file:border-0 file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <button
                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg
                             shadow hover:bg-blue-700 transition-colors duration-150"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>

                {/* Liste des documents */}
                {documents.length === 0 ? (
                  <p className="text-gray-500">
                    Aucun document pour ce client.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row
                                 justify-between items-start sm:items-center shadow-sm"
                      >
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">
                            {doc.file_name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(doc.uploaded_at).toLocaleDateString(
                              "fr-FR",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                          >
                            Voir le fichier
                          </a>
                        </div>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="mt-4 sm:mt-0 text-red-600 hover:text-red-800 transition-colors duration-150
                                   font-medium text-sm"
                        >
                          Supprimer
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
