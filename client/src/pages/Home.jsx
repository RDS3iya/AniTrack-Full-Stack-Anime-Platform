import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

function LandingPage() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    api('/anime/library').then((foundEpisodes) => setEpisodes(foundEpisodes.slice(0, 3))).catch(() => {});
  }, []);

  return <section className="landing-page">
    <div className="landing-copy">
      <p className="eyebrow">TU BIBLIOTECA DE PRÁCTICA</p>
      <h1>Historias enormes, un solo lugar para seguirlas.</h1>
      <p className="landing-intro">Explora colecciones, encuentra episodios por género y mantén tu progreso cuando inicies sesión.</p>
      <div className="landing-actions">
        <Link className="primary-action" to="/register">Crear una cuenta</Link>
        <Link className="secondary-action" to="/login">Iniciar sesión</Link>
      </div>
      <div className="landing-features">
        <span>✦ 5 colecciones</span>
        <span>✦ 10 subgéneros</span>
        <span>✦ Historial personal</span>
      </div>
    </div>
    <div className="landing-showcase" aria-label="Episodios destacados">
      <div className="showcase-glow" />
      {episodes.map((episode, index) => <article className={`showcase-card showcase-card--${index + 1}`} key={episode.id}>
        <img src={episode.thumbnailUrl || episode.season.anime.coverUrl} alt={`Episodio destacado: ${episode.title}`} />
        <div><p>{episode.season.anime.title}</p><strong>{episode.title}</strong></div>
      </article>)}
      {!episodes.length && <div className="showcase-placeholder">Cargando episodios destacados…</div>}
    </div>
  </section>;
}

function Catalog() {
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { api('/anime').then(setAnimes).catch((requestError) => setError(requestError.message)); }, []);

  return <section>
    <div className="hero">
      <p className="eyebrow">CATÁLOGO AUTORIZADO</p>
      <h1>Tu próximo anime te espera.</h1>
      <p>Explora episodios y continúa justo donde los dejaste.</p>
    </div>
    {error && <p className="error">{error}</p>}
    <div className="grid">{animes.map((anime) => <Link className="card" to={`/anime/${anime.id}`} key={anime.id}><img src={anime.coverUrl} alt={`Portada de ${anime.title}`} /><div><h2>{anime.title}</h2><p>{anime.genre} · {anime.releaseYear}</p></div></Link>)}</div>
    {!error && !animes.length && <p>Aún no hay animes publicados.</p>}
  </section>;
}

export default function Home() {
  const { user } = useAuth();
  return user ? <Catalog /> : <LandingPage />;
}
