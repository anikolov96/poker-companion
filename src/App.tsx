import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import CalculateurPushFold from './CalculateurPushFold';
import CallTapis from './CallTapis'; // Import du nouveau composant CallTapis

export default function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<CalculateurPushFold />} />
          <Route path="/call-tapis" element={<CallTapis />} />
        </Routes>
      </main>
      <NavBar />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        Push-Fold
      </NavLink>
      <NavLink to="/call-tapis" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        Call Tapis
      </NavLink>
    </nav>
  );
}
