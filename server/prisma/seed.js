import { PrismaClient, AnimeStatus } from '@prisma/client';

const prisma = new PrismaClient();

const collections = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Crónicas del Murim',
    description: 'Colección de práctica inspirada en relatos de ascenso, clanes y técnicas marciales del canal DRAKE_RG.',
    coverUrl: 'https://i.ytimg.com/vi/XQjgbvgWKXU/hqdefault.jpg',
    genre: 'Fantasía de cultivo · Murim · Artes marciales',
    seasonTitle: 'DRAKE_RG · Prácticas',
    episodes: [
      ['Por el honor de su familia', 'XQjgbvgWKXU', '5:26:22'],
      ['Mutantes que deben ser protegidos', 'rxTXo66Eq7Q', '2:10:02'],
      ['Las espadas del Murim', 'hGibVx5CZZU', '5:53:53'],
      ['El dios abandonado en el infierno', 'ICljVuxpSEQ', '5:04:07'],
      ['El chico espía protector', 'DtoT5l5hLec', '59:19'],
      ['El dios que se convierte en padre', 'zUHWQWV0XFg', '1:03:22'],
      ['El regreso para proteger a la familia', 'bn9G1HswtuU', '5:21:07'],
      ['Camino hacia el culto de sangre', '2fComZgY9rs', '1:01:14'],
      ['El rey de los monstruos', 'jz5vRobA7lc', '1:24:53'],
      ['El dios de la destrucción del Murim', 'OVFsQq9i34k', '6:52:54']
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Despertar de los Elegidos',
    description: 'Colección de práctica sobre poderes ocultos, academias y héroes que desafían su destino, basada en TERCIRESUMEN.',
    coverUrl: 'https://i.ytimg.com/vi/njMitglhm9o/hqdefault.jpg',
    genre: 'Fantasía de poderes · Academia mágica · Superación',
    seasonTitle: 'TERCIRESUMEN · Prácticas',
    episodes: [
      ['El NPC que conoce todos los trucos', 'njMitglhm9o', '3:40:16'],
      ['El recluta que se rebeló', 'Pg7cRbqhQrM', '5:42:15'],
      ['El diferente entrenado para la guerra', 'NEfjIzeTElg', '3:00:11'],
      ['El genio sin magia', 'palzvELIhFk', '8:01:34'],
      ['La habilidad capaz de enfrentar dioses', '4w0famoJwwQ', '3:11:22'],
      ['El entrenamiento que cambiará el mundo', '6ekPBnkhmIQ', '6:53:06'],
      ['El desterrado que se transforma', 'Tgw_cDEBDqY', '6:42:18'],
      ['El estudiante con poder legendario', 'mK1UzMDhAN0', '3:46:57'],
      ['El traicionado que se volverá dios', 'airTcNkXuBw', '6:40:47'],
      ['Venganza contra el mundo que lo odió', 'SYCPFcSr-X4', '3:45:24']
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: 'Leyendas de la Arena',
    description: 'Colección de práctica de competición, progreso y aventuras de alto poder tomada del canal ArkinG.',
    coverUrl: 'https://i.ytimg.com/vi/0mzASbIBwg0/hqdefault.jpg',
    genre: 'Acción competitiva · Deportes · Mazmorras',
    seasonTitle: 'ArkinG · Prácticas',
    episodes: [
      ['El dios que mataba hormigas', 'CtNMC2uLeh8', '2:00:01'],
      ['De perdedor a leyenda del fútbol: 59–61', '0mzASbIBwg0', '12:56'],
      ['De perdedor a leyenda del fútbol: 56–58', 'Sz1v8lEYgN4', '12:37'],
      ['El poder que no podía controlar', 'cOI19OLXsjU', '9:34:33'],
      ['Renacer para buscar venganza', 'KLgzlECRbk0', '3:03:30'],
      ['De perdedor a leyenda del fútbol: 1–55', 'b7MyhgWZJyw', '4:00:24'],
      ['El poder oculto del inocente', '7_JP5MNQxpo', '9:04:17'],
      ['Los clones demasiado poderosos', 'Cor7AOghwiM', '4:05:47'],
      ['ChatGPT en una mazmorra', 'ZOWDbTXYEHE', '3:10:00'],
      ['Una obra maestra coreana', 'M8zQhLElj6w', '1:08:40']
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: 'Vidas que Regresan',
    description: 'Colección de práctica sobre reencarnación, imperios y nuevos comienzos procedente de La Grieta del Manhwa.',
    coverUrl: 'https://i.ytimg.com/vi/r3V9SyEDs4I/hqdefault.jpg',
    genre: 'Fantasía de reencarnación · Regresión temporal · Nobleza',
    seasonTitle: 'La Grieta del Manhwa · Prácticas',
    episodes: [
      ['El pastor que reveló su linaje', 'r3V9SyEDs4I', '3:23:25'],
      ['El psicópata reencarnado en Murim', 'VXAaFEXfK14', '2:18:27'],
      ['El devorador del rey demonio', 'NusY72gFuAY', '3:09:21'],
      ['El regreso para salvar al imperio', 'ljkD2LzIGlE', '1:40:22'],
      ['Supervivencia en un mundo de arena', 'E2zrBFLMgtk', '1:38:35'],
      ['El bastardo de otro mundo', '6KZglWmHReM', '3:06:29'],
      ['Del mercenario al hijo del duque', 'pO12AIQEXN8', '3:21:53'],
      ['El heredero de una nobleza caída', '-B9KltYH_Og', '4:24:43'],
      ['El rey demonio derrotado otra vez', 'KplDu4zIDI0', '1:17:28'],
      ['El esclavo en su juego favorito', '1NScIv5rAhY', '4:30:35']
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    title: 'Reyes del Abismo',
    description: 'Colección de práctica de fantasía oscura, demonios y supervivencia del canal Nyra.',
    coverUrl: 'https://i.ytimg.com/vi/qSUi9C0yN60/hqdefault.jpg',
    genre: 'Fantasía oscura · Demonios · Venganza',
    seasonTitle: 'Nyra · Prácticas',
    episodes: [
      ['El protagonista que no perdona', 'qSUi9C0yN60', '6:50:12'],
      ['El protagonista que no perdona: parte 6', '-DVnBUXF8nA', '53:58'],
      ['El protagonista que no perdona: parte 5', 'e5Ry8lic7Y4', '46:53'],
      ['Condenado a morir una y otra vez', 'ytDR35UzLAA', '1:26:51'],
      ['El rey de la guerra en un isekai', 'X8RGlzu-dhw', '1:54:38'],
      ['El terror de la escuela', 'IBs92ToL6jY', '3:16:15'],
      ['El protagonista que genera terror', '-3vnGP2ZzRM', '4:31:47'],
      ['Cambiar un futuro mortal', '0vjmOlcnuVM', '42:32'],
      ['El protagonista implacable', 'nxLozmLSjm8', '4:04:44'],
      ['El regreso al mundo demoníaco', 'r2mOs0AemMs', '4:28:40']
    ]
  }
];

function durationInSeconds(duration) {
  return duration.split(':').reduce((total, part) => total * 60 + Number(part), 0);
}

async function main() {
  for (const collection of collections) {
    const anime = await prisma.anime.upsert({
      where: { id: collection.id },
      update: {
        title: collection.title,
        description: collection.description,
        coverUrl: collection.coverUrl,
        genre: collection.genre,
        releaseYear: 2026,
        status: AnimeStatus.ONGOING
      },
      create: {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        coverUrl: collection.coverUrl,
        genre: collection.genre,
        releaseYear: 2026,
        status: AnimeStatus.ONGOING
      }
    });

    const season = await prisma.season.upsert({
      where: { animeId_number: { animeId: anime.id, number: 1 } },
      update: { title: collection.seasonTitle },
      create: { animeId: anime.id, number: 1, title: collection.seasonTitle }
    });

    await Promise.all(collection.episodes.map(([title, videoId, duration], index) => prisma.episode.upsert({
      where: { seasonId_number: { seasonId: season.id, number: index + 1 } },
      update: {
        title,
        description: `Vídeo público de práctica del canal ${collection.seasonTitle.replace(' · Prácticas', '')}.`,
        durationSeconds: durationInSeconds(duration),
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      },
      create: {
        seasonId: season.id,
        number: index + 1,
        title,
        description: `Vídeo público de práctica del canal ${collection.seasonTitle.replace(' · Prácticas', '')}.`,
        durationSeconds: durationInSeconds(duration),
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      }
    })));
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
