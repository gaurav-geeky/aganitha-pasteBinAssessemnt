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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <pre>my content : {content}</pre>
  );
}
