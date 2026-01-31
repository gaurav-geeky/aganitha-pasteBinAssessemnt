import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPaste() {
      try {
        const res = await api.get(`/api/pastes/${id}`);
        if (!cancelled) {
          setContent(res.data.content);
        }
      } catch {
        if (!cancelled) {
          setError("Paste not found or expired");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPaste();
    return () => {
      cancelled = true;
    };
  }, [id]);

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading paste...
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-center">
          {error}
        </div>
      </div>
    );
  }

  /* Content */
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          View Paste
        </h2>

        <pre
          className="border bg-gray-50 rounded-md p-4 text-sm
                min-h-[200px] 
                max-h-[70vh]
                overflow-auto
                whitespace-pre-wrap break-words 
                no-scrollbar
              "
        >
          {content}
        </pre>
      </div>
    </div>
  );
}
