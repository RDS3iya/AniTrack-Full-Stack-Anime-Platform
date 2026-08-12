import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const history = await prisma.watchHistory.findMany({ where: { userId: req.user.id }, orderBy: { lastWatchedAt: 'desc' }, include: { episode: { include: { season: { include: { anime: true } } } } } });
    res.json(history);
  } catch (error) { next(error); }
});
router.get('/episode/:episodeId', async (req, res, next) => {
  try { res.json(await prisma.watchHistory.findUnique({ where: { userId_episodeId: { userId: req.user.id, episodeId: req.params.episodeId } } })); } catch (error) { next(error); }
});
router.put('/:episodeId', async (req, res, next) => {
  try {
    const { progressSeconds = 0, completed = false } = req.body;
    const episode = await prisma.episode.findUnique({ where: { id: req.params.episodeId } });
    if (!episode) return res.status(404).json({ message: 'Episodio no encontrado.' });
    const progress = Math.max(0, Math.min(Number(progressSeconds) || 0, episode.durationSeconds));
    const history = await prisma.watchHistory.upsert({ where: { userId_episodeId: { userId: req.user.id, episodeId: episode.id } }, create: { userId: req.user.id, episodeId: episode.id, progressSeconds: progress, completed: Boolean(completed) }, update: { progressSeconds: progress, completed: Boolean(completed) } });
    res.json(history);
  } catch (error) { next(error); }
});
export default router;
