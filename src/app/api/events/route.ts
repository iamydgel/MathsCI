import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { EventScraperService } from '@/lib/services/scraper';

const CACHE_FILE_PATH = path.join(process.cwd(), 'src/lib/data/events-cache.json');
const CACHE_EXPIRATION_MS = 12 * 60 * 60 * 1000; // 12 heures

export async function GET() {
  let cacheData: any = null;
  let shouldUpdateCache = false;

  // 1. Essayer de lire le fichier de cache
  try {
    const fileContent = await fs.readFile(CACHE_FILE_PATH, 'utf-8');
    cacheData = JSON.parse(fileContent);

    // Vérifier l'âge du cache
    const lastUpdated = new Date(cacheData.lastUpdated).getTime();
    const now = new Date().getTime();

    if (now - lastUpdated > CACHE_EXPIRATION_MS) {
      shouldUpdateCache = true;
    }
  } catch (error) {
    // Si le fichier de cache n'existe pas ou est corrompu, on doit l'initialiser
    shouldUpdateCache = true;
  }

  // 2. Déclencher la mise à jour asynchrone du cache en arrière-plan
  if (shouldUpdateCache) {
    // Note : Nous exécutons la fonction en arrière-plan sans "await"
    // pour que le client reçoive immédiatement les données actuelles du cache
    // sans subir la latence du scraping (qui peut prendre plusieurs secondes).
    runBackgroundScrape().catch((err) => {
      console.error('Erreur lors du scraping en arrière-plan:', err);
    });
  }

  // 3. Retourner les données du cache (ou fallback par défaut si tout échoue)
  const responseData = cacheData?.events || getDefaultFallbackEvents();

  return new NextResponse(JSON.stringify(responseData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Interdire la mise en cache par le navigateur pour forcer l'actualisation au refresh
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

/**
 * Lance le scraping en arrière-plan et met à jour le fichier de cache.
 */
async function runBackgroundScrape() {
  console.log('Début du scraping de l\'agenda en arrière-plan...');
  const freshEvents = await EventScraperService.scrapeAll();
  
  const cachePayload = {
    lastUpdated: new Date().toISOString(),
    events: freshEvents
  };

  // S'assurer que le dossier parent existe
  const dir = path.dirname(CACHE_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });

  // Écrire le cache
  await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cachePayload, null, 2), 'utf-8');
  console.log('Cache de l\'agenda mis à jour avec succès. Nombre d\'événements :', freshEvents.length);
}

/**
 * Valeurs de secours statiques si aucune donnée n'est disponible dans le cache
 */
function getDefaultFallbackEvents() {
  const currentYear = new Date().getFullYear();
  return [
    {
      id: "olympiades-2025",
      title: "Olympiades Nationales de Mathématiques",
      date: `15 Février ${currentYear}`,
      location: "Abidjan, Lycée Sainte-Marie",
      type: "Olympiade",
      ctaLabel: "S'inscrire"
    },
    {
      id: "portes-ouvertes-inphb",
      title: "Journée Portes Ouvertes INP-HB",
      date: `08 Mars ${currentYear}`,
      location: "Yamoussoukro, Campus INP-HB",
      type: "Salon",
      ctaLabel: "Voir le programme"
    },
    {
      id: "conf-maths-ia",
      title: "Conférence : Mathématiques & IA en Afrique",
      date: `22 Avril ${currentYear}`,
      location: "Abidjan, Palais des Congrès",
      type: "Conférence",
      ctaLabel: "Réserver son badge"
    },
    {
      id: "masterclass-actuaire",
      title: "Masterclass : Devenir Actuaire en Côte d'Ivoire",
      date: `10 Mai ${currentYear}`,
      location: "En ligne (Zoom)",
      type: "Masterclass",
      ctaLabel: "Rejoindre le webinaire"
    },
    {
      id: "salon-grandes-ecoles",
      title: "Salon des Grandes Écoles de CI",
      date: `07 Juin ${currentYear}`,
      location: "Abidjan, Sofitel Hôtel Ivoire",
      type: "Salon",
      ctaLabel: "Obtenir mon ticket"
    },
    {
      id: "concours-ensea",
      title: "Concours national d'entrée à l'ENSEA",
      date: `20 Juin ${currentYear}`,
      location: "Abidjan, Campus ENSEA",
      type: "Concours",
      ctaLabel: "Télécharger le dossier"
    }
  ];
}
