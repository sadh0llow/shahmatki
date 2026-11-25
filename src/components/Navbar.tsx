import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface NavItem {
  to: string;
  label: string;
}

const links: NavItem[] = [
  { to: "/", label: "Главная" },
  { to: "/players", label: "Игроки" },
  { to: "/leaderboard", label: "Лидерборд" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-4 z-50 max-w-5xl mx-auto px-4 w-full">
      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md shadow-sm border border-neutral-200 dark:border-neutral-700 rounded-2xl px-5 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2 text-neutral-800 dark:text-white">
          <span className="text-chess-accent">♞</span> ШахМат
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-chess-accent text-white shadow-md shadow-chess-accent/30"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-2"></div>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Сменить тему"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button type="button" onClick={toggleTheme} className="p-2 text-lg">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white dark:bg-neutral-800 shadow-lg rounded-2xl p-2 border border-neutral-200 dark:border-neutral-700 flex flex-col gap-1 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-chess-accent text-white"
                    : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}