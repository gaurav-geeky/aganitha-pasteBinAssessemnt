import { useState } from "react";
import api from "../api/axios";

export default function CreatePaste() {
    const [content, setContent] = useState("");
    const [ttl, setTtl] = useState("");
    const [maxViews, setMaxViews] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLink("");
        setLoading(true);

        try {
            const payload = {
                content,
                ...(ttl && { ttl_seconds: Number(ttl) }),
                ...(maxViews && { max_views: Number(maxViews) }),
            };

            const res = await api.post("/api/pastes", payload);
            setLink(res.data.url);
            setContent("");
            setTtl("");
            setMaxViews("");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Create Paste</h2>

            <form onSubmit={handleSubmit}>
                <textarea
                    rows="6"
                    placeholder="Enter text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <br />

                <input
                    type="number"
                    placeholder="TTL (seconds)"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max views"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                />

                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>

            {link && (
                <p>
                    Share link:{" "}
                    <a href={link} target="_blank" rel="noreferrer">
                        {link}
                    </a>
                </p>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
