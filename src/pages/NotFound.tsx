import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl mb-2">♚</h1>
      <h2 className="text-2xl font-bold mb-3">Мат! Страница не найдена</h2>
      <Link to="/" className="text-chess-accent underline">
        На главную
      </Link>
    </div>
  );
}