import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="brand" onClick={() => navigate("/master")}>
        <img src="/raven.png" alt="Raven Studio" className="logo" />
        <span className="brand-text">Raven Studio</span>
      </div>
    </header>
  );
}
