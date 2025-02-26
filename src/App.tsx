import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { UserPage } from "./pages/user/User";
import { GamesPage } from "./pages/games/Games";
import { UserBets } from "./pages/games/UserBets";
import { UserStorageProvider } from "./store/UserStorage";
import "./App.css";

function App() {
  return (
    <UserStorageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apostar" element={<GamesPage />} />
          <Route path="/minhas-apostas" element={<UserBets />} />
          <Route path="/perfil" element={<UserPage />} />
        </Routes>
      </Router>
    </UserStorageProvider>
  );
}

export default App;