import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Players from "./pages/Players";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          {/* Вот тут должны быть роуты! */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/players" element={<Players />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="text-center text-sm py-8 opacity-50 font-medium">
            ♞ Сделано на React + TypeScript + Tailwind + Chess.com API
          </footer>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}