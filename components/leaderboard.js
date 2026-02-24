import { useState, useEffect } from "react";
import Modal from "./ui/modal";

export default function Leaderboard({ onClose }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/scores?limit=20")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setScores(data);
            })
            .catch(() => setError("Could not load leaderboard"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Modal onClose={onClose}>
            <h2 className="mb-4 font-titilliumWeb text-xl text-rose">Leaderboard</h2>
            {loading && <p className="text-neutral-400">Loading…</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && !error && scores.length === 0 && (
                <p className="text-neutral-400">No scores yet. Play and sign in to save yours!</p>
            )}
            {!loading && !error && scores.length > 0 && (
                <ul className="space-y-2">
                    {scores.map((entry, i) => (
                        <li
                            key={entry.id}
                            className="flex items-center justify-between rounded border border-neutral-600 bg-neutral-800/30 px-3 py-2 text-sm"
                        >
                            <span className="text-neutral-400">#{i + 1}</span>
                            <span className="font-medium text-white">
                                {entry.user?.name || "Anonymous"}
                            </span>
                            <span className="text-rose">Level {entry.level}</span>
                            <span className="text-love">{entry.score} pts</span>
                        </li>
                    ))}
                </ul>
            )}
        </Modal>
    );
}
