import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import AnimeDetail from './pages/AnimeDetail.jsx';
import WatchEpisode from './pages/WatchEpisode.jsx';
import Auth from './pages/Auth.jsx';
import History from './pages/History.jsx';
import Library from './pages/Library.jsx';

function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const closeMenu = () => { setMenuOpen(false); setAccountOpen(false); };
  const toggleTheme = () => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');

  return <>
    <header className="site-header">
      <Link className="brand" to="/">AniTrack</Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/library">Biblioteca</NavLink>
        {user && <NavLink to="/history">Historial</NavLink>}
      </nav>
      <div className="header-actions">
        <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}>
          {theme === 'dark' ? '☀' : '◐'}
        </button>
        {user && <div className="account-menu">
          <button className="account-menu__toggle" type="button" onClick={() => setAccountOpen((isOpen) => !isOpen)} aria-expanded={accountOpen}>
            <span className="account-menu__avatar" aria-hidden="true">{user.name.slice(0, 1).toUpperCase()}</span>
            <span>{user.name}</span>
            <span aria-hidden="true">⌄</span>
          </button>
          {accountOpen && <div className="account-menu__panel">
            <button type="button" onClick={() => { logout(); closeMenu(); }}>Cerrar sesión</button>
          </div>}
        </div>}
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="side-menu">
          <span aria-hidden="true">☰</span><span>Menú</span>
        </button>
      </div>
    </header>
    <div className={`menu-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={closeMenu} aria-hidden="true" />
    <aside id="side-menu" className={`side-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Menú de cuenta" aria-hidden={!menuOpen}>
      <div className="side-menu__top">
        <div>
          <p className="eyebrow">NAVEGACIÓN</p>
          <strong>{user ? user.name : 'Tu cuenta'}</strong>
        </div>
        <button className="icon-button" type="button" onClick={closeMenu} aria-label="Cerrar menú">×</button>
      </div>
      <nav className="side-menu__links">
        <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
        <NavLink to="/library" onClick={closeMenu}>Biblioteca</NavLink>
        {user ? <>
          <NavLink to="/history" onClick={closeMenu}>Mi historial</NavLink>
          <button className="menu-link" type="button" onClick={() => { logout(); closeMenu(); }}>Cerrar sesión</button>
        </> : <>
          <NavLink to="/login" onClick={closeMenu}>Iniciar sesión</NavLink>
          <NavLink to="/register" onClick={closeMenu}>Crear cuenta</NavLink>
        </>}
      </nav>
      <button className="theme-menu-button" type="button" onClick={toggleTheme}>
        <span>{theme === 'dark' ? '☀' : '◐'}</span>
        Usar modo {theme === 'dark' ? 'claro' : 'oscuro'}
      </button>
    </aside>
  </>;
}

function Private({ children }) {
  return useAuth().user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return <>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/watch/:episodeId" element={<Private><WatchEpisode /></Private>} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/history" element={<Private><History /></Private>} />
      </Routes>
    </main>
  </>;
}
