import { useState, type FormEvent } from "react";
import { getPlayer, getPlayerStats } from "../api/chessApi";
import type { PlayerProfile, PlayerStats } from "../api/types";
import Loader from "../components/Loader";

export default function Players() {
  const [username, setUsername] = useState<string>("");
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const search = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clean = username.trim().toLowerCase();
    if (!clean) return;

    setLoading(true);
    setError("");
    setPlayer(null);
    setStats(null);

    try {
      const [p, s] = await Promise.all([
        getPlayer(clean),
        getPlayerStats(clean),
      ]);
      setPlayer(p);
      setStats(s);
    } catch {
      setError("Игрок не найден или ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Поиск игрока</h1>

      <form onSubmit={search} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Chess.com username (напр. magnuscarlsen)"
          className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-chess-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-chess-accent text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Ищем..." : "Найти"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {player && stats && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-xl shadow-neutral-200/50 dark:shadow-none rounded-3xl">
            <img
              src={
                player.avatar ??
                "https://www.chess.com/bundles/web/images/user-image.svg"
              }
              alt={player.username}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">
              {player.name ?? player.username}
            </h2>
            <p className="text-sm opacity-70 mb-2">
              @{player.username} •{" "}
              {player.country?.split("/").pop() ?? "—"}
            </p>
            <p className="text-sm opacity-80">
              {player.followers} подписчиков •{" "}
              {new Date(player.joined * 1000).toLocaleDateString()}
            </p>
            <a
              href={player.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-chess-accent underline"
            >
              Профиль на Chess.com →
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 shadow">
            <h3 className="font-bold mb-3">Рейтинги</h3>
            <ul className="space-y-2 text-sm">
              {stats.chess_blitz?.last && (
                <li>
                  ⚡ Blitz: <b>{stats.chess_blitz.last.rating}</b>
                </li>
              )}
              {stats.chess_rapid?.last && (
                <li>
                  ⏱️ Rapid: <b>{stats.chess_rapid.last.rating}</b>
                </li>
              )}
              {stats.chess_bullet?.last && (
                <li>
                  🚀 Bullet: <b>{stats.chess_bullet.last.rating}</b>
                </li>
              )}
              {stats.chess_daily?.last && (
                <li>
                  📅 Daily: <b>{stats.chess_daily.last.rating}</b>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {loading && <Loader label="Ищем игрока..." />}
    </div>
  );
}