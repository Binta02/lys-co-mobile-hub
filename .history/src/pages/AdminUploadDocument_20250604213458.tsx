import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminUploadDocument() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email");
      if (error) console.error("Erreur chargement clients:", error);
      else setClients(data || []);
    };

    fetchClients();
  }, []);

  const handleUpload = async () => {
    if (!selectedClient || !file) {
      alert("Sélectionnez un client et un fichier.");
      return;
    }

    setUploading(true);

    const filePath = `${selectedClient}/${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (storageError) {
      console.error("Erreur upload fichier:", storageError);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    const { error: insertError } = await supabase
      .from("user_documents")
      .insert({
        user_id: selectedClient,
        file_url: publicUrl,
        file_name: file.name,
      });

    if (insertError)
      console.error("Erreur enregistrement document:", insertError);
    else alert("Document envoyé avec succès !");

    setUploading(false);
    setFile(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        Uploader un document pour un client
      </h2>

      <label className="block mb-2 font-medium">Client :</label>
      <select
        onChange={(e) => setSelectedClient(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      >
        <option value="">-- Sélectionner --</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.first_name} {client.last_name} ({client.email})
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? "Envoi en cours..." : "Envoyer le document"}
      </button>
    </div>
  );
}
