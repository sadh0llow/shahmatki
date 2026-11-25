import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center chess-pattern px-4 py-20">
      <div className="max-w-3xl text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-chess-accent/10 text-chess-accent font-semibold text-sm border border-chess-accent/20">
          Онлайн-платформа
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-neutral-900 dark:text-white leading-tight">
          Мир шахмат <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-chess-accent to-green-700">
            в вашем браузере
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl mx-auto">
          Ищите профили, следите за рейтингами и анализируйте партии в реальном времени через официальное API Chess.com.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/players"
            className="px-8 py-3.5 rounded-2xl bg-chess-accent text-white font-bold text-lg hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-chess-accent/30"
          >
            Найти игрока
          </Link>
          <Link
            to="/leaderboard"
            className="px-8 py-3.5 rounded-2xl bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white font-bold text-lg border border-neutral-200 dark:border-neutral-700 hover:border-chess-accent hover:text-chess-accent hover:-translate-y-1 transition-all duration-300 shadow-sm"
          >
            Смотреть Лидерборд
          </Link>
        </div>
      </div>
    </section>
  );
}