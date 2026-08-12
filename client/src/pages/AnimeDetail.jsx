import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api.js';
export default function AnimeDetail() {
 const { id } = useParams(); const [anime, setAnime] = useState(null); const [error, setError] = useState('');
 useEffect(() => { api(`/anime/${id}`).then(setAnime).catch(e => setError(e.message)); }, [id]);
 if (error) return <p className="error">{error}</p>; if (!anime) return <p>Cargando...</p>;
 return <section><div className="detail"><img src={anime.coverUrl} alt=""/><div><p className="eyebrow">{anime.status}</p><h1>{anime.title}</h1><p>{anime.description}</p><p>{anime.genre} · {anime.releaseYear}</p></div></div>{anime.seasons.map(season => <div className="season" key={season.id}><h2>Temporada {season.number}{season.title ? `: ${season.title}` : ''}</h2>{season.episodes.map(episode => <Link className="episode" key={episode.id} to={`/watch/${episode.id}`}><span>E{episode.number}</span><b>{episode.title}</b><small>{Math.round(episode.durationSeconds / 60)} min</small></Link>)}</div>)}</section>;
}
