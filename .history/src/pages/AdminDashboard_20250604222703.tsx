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
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name");

      if (error) console.error("Erreur chargement clients", error);
      else setClients(data || []);
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
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Erreur upload", uploadError);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from("user_documents")
      .insert({
        user_id: selectedClient.id,
        file_name: file.name,
        file_url: publicUrl.publicUrl,
      });

    if (insertError) {
      console.error("Erreur insertion", insertError);
    } else {
      setFile(null);
      setDocuments((prev) => [
        {
          file_name: file.name,
          file_url: publicUrl.publicUrl,
          uploaded_at: new Date().toISOString(),
        },
        ...prev,
      ]);
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
    <div className="p-6">
      <div className="flex flex-wrap gap-6">
        <div className="w-full md:w-1/3">
          <h2 className="font-semibold mb-2">Clients</h2>
          <ul className="border rounded p-2 h-[400px] overflow-auto">
            {clients.map((client) => (
              <li
                key={client.id}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${
                  selectedClient?.id === client.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedClient(client)}
              >
                {client.first_name} {client.last_name} <br />
                <span className="text-sm text-gray-600">{client.email}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedClient && (
          <div className="w-full md:w-2/3">
            <h2 className="font-semibold mb-2">
              Documents de {selectedClient.first_name}{" "}
              {selectedClient.last_name}
            </h2>

            <div className="mb-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <button
                className="ml-2 px-4 py-1 bg-blue-600 text-white rounded"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>

            {documents.length === 0 ? (
              <p>Aucun document</p>
            ) : (
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="p-3 bg-gray-100 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{doc.file_name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(doc.uploaded_at).toLocaleString()}
                      </p>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Voir le fichier
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
