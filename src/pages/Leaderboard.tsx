import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/chessApi";
import type {
  LeaderboardResponse,
  LeaderboardPlayer,
} from "../api/types";
import Loader from "../components/Loader";

type CategoryTuple = [string, LeaderboardPlayer[] | undefined];

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getLeaderboard()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch(() => {
        if (!cancelled) setError("Не удалось загрузить лидерборд");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader label="Загрузка лидерборда..." />;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  const categories: CategoryTuple[] = [
    ["♟️ Blitz", data?.live_blitz],
    ["⏱️ Rapid", data?.live_rapid],
    ["🚀 Bullet", data?.live_bullet],
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Топ игроков</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map(([title, list]) => (
          <div
            key={title}
            className="rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-xl shadow-neutral-200/50 dark:shadow-none rounded-3xl p-4"
          >
            <h2 className="font-bold mb-3">{title}</h2>
            <ol className="space-y-2 text-sm">
              {list?.slice(0, 10).map((p, i) => (
                <li key={p.username} className="flex justify-between gap-2">
                  <span className="truncate">
                    {i + 1}.{" "}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-chess-accent"
                    >
                      {p.username}
                    </a>
                  </span>
                  <b>{p.score}</b>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}