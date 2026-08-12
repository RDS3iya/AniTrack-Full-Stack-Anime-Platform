import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const userResponse = ({ id, name, email }) => ({ id, name, email });
const tokenFor = (user) => jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '3h' });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ message: 'Nombre, correo y contraseña de al menos 8 caracteres son obligatorios.' });
    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (exists) return res.status(409).json({ message: 'El correo ya está registrado.' });
    const user = await prisma.user.create({ data: { name, email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12) } });
    res.status(201).json({ user: userResponse(user), token: tokenFor(user) });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email?.toLowerCase() } });
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    res.json({ user: userResponse(user), token: tokenFor(user) });
  } catch (error) { next(error); }
});

router.post('/refresh', requireAuth, (req, res) => {
  res.json({ token: tokenFor(req.user) });
});

export default router;
