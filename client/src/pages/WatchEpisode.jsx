import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api.js';

function getYouTubeEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl);
    const videoId = url.hostname === 'youtu.be'
      ? url.pathname.slice(1)
      : url.searchParams.get('v');

    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default function WatchEpisode() {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState('');
  const [resumeAt, setResumeAt] = useState(0);
  const video = useRef(null);

  useEffect(() => {
    let active = true;
    Promise.all([api(`/anime/episode/${episodeId}`), api(`/history/episode/${episodeId}`)])
      .then(([found, history]) => {
        if (active) {
          setEpisode(found);
          setResumeAt(history?.progressSeconds || 0);
        }
      })
      .catch((requestError) => active && setError(requestError.message));

    return () => { active = false; };
  }, [episodeId]);

  function save(completed = false) {
    if (video.current) {
      api(`/history/${episodeId}`, {
        method: 'PUT',
        body: JSON.stringify({
          progressSeconds: Math.floor(video.current.currentTime),
          completed
        })
      }).catch(() => {});
    }
  }

  useEffect(() => {
    const timer = setInterval(() => save(), 20000);
    const leaving = () => save();
    window.addEventListener('beforeunload', leaving);
    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', leaving);
      save();
    };
  }, [episodeId]);

  if (error) return <p className="error">{error}</p>;
  if (!episode) return <p>Cargando episodio...</p>;

  const youtubeEmbedUrl = getYouTubeEmbedUrl(episode.videoUrl);

  return <section className="watch-page">
    <p className="eyebrow">{episode.season.anime.title} · EPISODIO {episode.number}</p>
    <h1>{episode.title}</h1>
    {youtubeEmbedUrl ? (
      <iframe
        className="player"
        src={youtubeEmbedUrl}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    ) : (
      <video
        ref={video}
        className="player"
        controls
        poster={episode.thumbnailUrl || undefined}
        src={episode.videoUrl}
        onLoadedMetadata={() => {
          if (video.current && resumeAt) video.current.currentTime = resumeAt;
        }}
        onPause={() => save()}
        onEnded={() => save(true)}
      >
        Tu navegador no admite vídeo HTML5.
      </video>
    )}
    <p>{episode.description}</p>
  </section>;
}
