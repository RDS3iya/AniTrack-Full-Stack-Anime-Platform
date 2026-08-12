import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api.js';

const filterGroups = {
  category: { label: 'Categoría', value: (episode) => episode.season.anime.genre.split(' · ')[0] },
  date: { label: 'Fecha de publicación', value: (episode) => new Intl.DateTimeFormat('es-DO', { dateStyle: 'long' }).format(new Date(episode.publishedAt)) },
  subgenre: { label: 'Subgénero', value: (episode) => episode.season.anime.genre.split(' · ').slice(1) },
  collection: { label: 'Colección', value: (episode) => episode.season.anime.title }
};

export default function Library() {
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const groupKey = filterGroups[searchParams.get('group')] ? searchParams.get('group') : 'category';
  const selectedValue = searchParams.get('value') || '';
  const group = filterGroups[groupKey];

  useEffect(() => { api('/anime/library').then(setEpisodes).catch((requestError) => setError(requestError.message)); }, []);

  const options = useMemo(() => {
    const values = episodes.flatMap((episode) => {
      const value = group.value(episode);
      return Array.isArray(value) ? value : [value];
    });
    return [...new Set(values)].sort((first, second) => first.localeCompare(second, 'es'));
  }, [episodes, group]);

  const visibleEpisodes = useMemo(() => episodes.filter((episode) => {
    if (!selectedValue) return true;
    const value = group.value(episode);
    return Array.isArray(value) ? value.includes(selectedValue) : value === selectedValue;
  }), [episodes, group, selectedValue]);

  function selectOption(value) {
    setSearchParams(value ? { group: groupKey, value } : { group: groupKey });
  }

  return <section className="library-page">
    <p className="eyebrow">BIBLIOTECA DE PRÁCTICA</p>
    <h1>Explora por {group.label.toLowerCase()}.</h1>
    <p>Selecciona un filtro para ver todos los episodios que pertenecen a esa selección.</p>
    <div className="filter-tabs" aria-label="Tipo de filtro">
      {Object.entries(filterGroups).map(([key, item]) => <Link key={key} className={key === groupKey ? 'is-active' : ''} to={`/library?group=${key}`}>{item.label}</Link>)}
    </div>
    <div className="filter-options" aria-label={`Opciones de ${group.label}`}>
      <button className={!selectedValue ? 'is-active' : ''} type="button" onClick={() => selectOption('')}>Todos</button>
      {options.map((option) => <button className={selectedValue === option ? 'is-active' : ''} key={option} type="button" onClick={() => selectOption(option)}>{option}</button>)}
    </div>
    {error && <p className="error">{error}</p>}
    <p className="library-count">{visibleEpisodes.length} episodio{visibleEpisodes.length === 1 ? '' : 's'} encontrado{visibleEpisodes.length === 1 ? '' : 's'}</p>
    <div className="library-grid">
      {visibleEpisodes.map((episode) => <Link className="library-episode" key={episode.id} to={`/watch/${episode.id}`}>
        <img src={episode.thumbnailUrl || episode.season.anime.coverUrl} alt="" />
        <div>
          <p className="eyebrow">{episode.season.anime.title}</p>
          <h2>{episode.title}</h2>
          <small>{episode.season.anime.genre} · {Math.round(episode.durationSeconds / 60)} min</small>
        </div>
      </Link>)}
    </div>
  </section>;
}
