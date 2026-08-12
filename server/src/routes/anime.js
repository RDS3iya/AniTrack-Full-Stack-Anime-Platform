import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
const router = Router();

router.get('/', async (req, res, next) => {
  try { res.json(await prisma.anime.findMany({ orderBy: { createdAt: 'desc' } })); } catch (error) { next(error); }
});
router.get('/episode/:episodeId', async (req, res, next) => {
  try {
    const episode = await prisma.episode.findUnique({ where: { id: req.params.episodeId }, include: { season: { include: { anime: true } } } });
    if (!episode) return res.status(404).json({ message: 'Episodio no encontrado.' });
    res.json(episode);
  } catch (error) { next(error); }
});
router.get('/library', async (_req, res, next) => {
  try {
    const episodes = await prisma.episode.findMany({
      orderBy: { publishedAt: 'desc' },
      include: { season: { include: { anime: true } } }
    });
    res.json(episodes);
  } catch (error) { next(error); }
});
router.get('/:id', async (req, res, next) => {
  try {
    const anime = await prisma.anime.findUnique({ where: { id: req.params.id }, include: { seasons: { orderBy: { number: 'asc' }, include: { episodes: { orderBy: { number: 'asc' } } } } } });
    if (!anime) return res.status(404).json({ message: 'Anime no encontrado.' });
    res.json(anime);
  } catch (error) { next(error); }
});
export default router;
