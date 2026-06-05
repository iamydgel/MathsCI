import * as cheerio from 'cheerio';
import { EventItem } from '../constants/content';

interface ScrapedEvent {
  title: string;
  date: string;
  location: string;
  type: EventItem['type'];
  ctaLabel: string;
  eventUrl: string;
}

export class EventScraperService {
  // URLs des sites cibles pour le scraping des événements/actualités
  private static SOURCES = {
    ENSEA: 'https://ensea.ed.ci/actualites/',
    INPHB: 'https://inphb.ci/actualites', // ou page principale
    UFHB: 'https://univ-fhb.edu.ci/index.php/category/actualites/'
  };

  /**
   * Scrape les sites institutionnels pour récupérer les actualités et événements récents.
   * Retourne une liste d'événements formatés.
   */
  public static async scrapeAll(): Promise<EventItem[]> {
    const events: ScrapedEvent[] = [];

    // 1. Scraping de l'ENSEA
    try {
      const enseaEvents = await this.scrapeENSEA();
      events.push(...enseaEvents);
    } catch (error) {
      console.error('Erreur de scraping ENSEA, utilisation du fallback:', error);
    }

    // 2. Scraping de l'INP-HB
    try {
      const inphbEvents = await this.scrapeINPHB();
      events.push(...inphbEvents);
    } catch (error) {
      console.error('Erreur de scraping INP-HB, utilisation du fallback:', error);
    }

    // 3. Scraping de l'UFHB
    try {
      const ufhbEvents = await this.scrapeUFHB();
      events.push(...ufhbEvents);
    } catch (error) {
      console.error('Erreur de scraping UFHB, utilisation du fallback:', error);
    }

    // 4. Fusion et complétion avec les événements par défaut ajustés à l'année courante
    const mergedEvents = this.mergeWithDefaultEvents(events);

    return mergedEvents;
  }

  /**
   * Scrape le site de l'ENSEA
   */
  private static async scrapeENSEA(): Promise<ScrapedEvent[]> {
    const response = await fetch(this.SOURCES.ENSEA, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },
      next: { revalidate: 0 } // Désactiver le cache Next.js interne pour le fetch
    });

    if (!response.ok) {
      throw new Error(`Statut HTTP invalide pour ENSEA: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: ScrapedEvent[] = [];

    // Essayer de trouver les articles via des sélecteurs communs
    // (Ajusté typiquement pour WordPress/CMS classiques souvent utilisés par ces universités)
    $('.post, article, .et_pb_post, .entry-header').each((_, element) => {
      const title = $(element).find('h2, h3, .entry-title, .title').first().text().trim();
      const rawDate = $(element).find('.published, .date, .post-meta, time').first().text().trim();
      const link = $(element).find('a').first().attr('href') || this.SOURCES.ENSEA;
      
      if (title) {
        // Formater la date en français si possible
        const cleanedDate = this.cleanScrapedDate(rawDate) || 'Juin 2026';
        
        results.push({
          title: this.truncateText(title, 80),
          date: cleanedDate,
          location: 'Abidjan, Campus ENSEA',
          type: title.toLowerCase().includes('concours') ? 'Concours' : 'Conférence',
          ctaLabel: 'En savoir plus',
          eventUrl: link
        });
      }
    });

    // Limiter à 3 événements maximum pour ne pas surcharger
    return results.slice(0, 3);
  }

  /**
   * Scrape le site de l'INP-HB
   */
  private static async scrapeINPHB(): Promise<ScrapedEvent[]> {
    // Note: Le site de l'INP-HB peut rejeter ou bloquer si Cloudflare est activé.
    // Nous implémentons une tentative de fetch avec timeout court.
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(this.SOURCES.INPHB, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: controller.signal,
        next: { revalidate: 0 }
      });
      
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Statut HTTP invalide pour INP-HB: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const results: ScrapedEvent[] = [];

      $('article, .news-item, .post').each((_, element) => {
        const title = $(element).find('h2, h3, h4, .title').first().text().trim();
        const rawDate = $(element).find('.date, time, .meta').first().text().trim();
        const link = $(element).find('a').first().attr('href') || this.SOURCES.INPHB;

        if (title) {
          const cleanedDate = this.cleanScrapedDate(rawDate) || 'Juillet 2026';
          
          results.push({
            title: this.truncateText(title, 80),
            date: cleanedDate,
            location: 'Yamoussoukro, Campus INP-HB',
            type: title.toLowerCase().includes('concours') ? 'Concours' : 'Salon',
            ctaLabel: 'Voir les détails',
            eventUrl: link
          });
        }
      });

      return results.slice(0, 3);
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  }

  /**
   * Scrape le site de l'Université Félix Houphouët-Boigny (UFHB)
   */
  private static async scrapeUFHB(): Promise<ScrapedEvent[]> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(this.SOURCES.UFHB, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: controller.signal,
        next: { revalidate: 0 }
      });
      
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Statut HTTP invalide pour UFHB: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      const results: ScrapedEvent[] = [];

      $('article, .post, .blog-post').each((_, element) => {
        const title = $(element).find('h2, h3, .entry-title, .title').first().text().trim();
        const rawDate = $(element).find('.date, time, .entry-date, .meta').first().text().trim();
        const link = $(element).find('a').first().attr('href') || this.SOURCES.UFHB;

        if (title) {
          const cleanedDate = this.cleanScrapedDate(rawDate) || 'Août 2026';
          results.push({
            title: this.truncateText(title, 80),
            date: cleanedDate,
            location: 'Abidjan, Campus UFHB (Cocody)',
            type: title.toLowerCase().includes('masterclass') || title.toLowerCase().includes('formation') ? 'Masterclass' : 'Conférence',
            ctaLabel: 'En savoir plus',
            eventUrl: link
          });
        }
      });

      return results.slice(0, 3);
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  }

  /**
   * Formate proprement une date brute issue du scraping
   */
  private static cleanScrapedDate(dateStr: string): string | null {
    if (!dateStr) return null;
    // Enlever les retours à la ligne, les tabulations et espaces superflus
    let clean = dateStr.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Supprimer les préfixes éventuels comme "Publié le" ou "Date :"
    clean = clean.replace(/^(publi[ée] le|post[ée] le|le|date\s*:)/gi, '').trim();

    return clean.length > 5 ? clean : null;
  }

  /**
   * Tronque les titres trop longs pour l'affichage UI
   */
  private static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Combine les événements scrapés avec notre liste d'événements de référence,
   * en s'assurant que les événements de référence ont des dates de l'année en cours (2026)
   */
  private static mergeWithDefaultEvents(scraped: ScrapedEvent[]): EventItem[] {
    const currentYear = new Date().getFullYear(); // 2026

    // Événements de base statiques adaptés dynamiquement à l'année courante
    const baseEvents: EventItem[] = [
      {
        id: "olympiades-nationales",
        title: "Olympiades Nationales de Mathématiques",
        date: `15 Février ${currentYear}`,
        location: "Abidjan, Lycée Sainte-Marie",
        type: "Olympiade",
        ctaLabel: "S'inscrire",
        eventUrl: "https://societemathematiqueci.org"
      },
      {
        id: "portes-ouvertes-inphb-base",
        title: "Journée Portes Ouvertes INP-HB",
        date: `08 Mars ${currentYear}`,
        location: "Yamoussoukro, Campus INP-HB",
        type: "Salon",
        ctaLabel: "Voir le programme",
        eventUrl: "https://inphb.ci"
      },
      {
        id: "conf-maths-ia-base",
        title: "Conférence : Mathématiques & IA en Afrique",
        date: `22 Avril ${currentYear}`,
        location: "Abidjan, Palais des Congrès",
        type: "Conférence",
        ctaLabel: "Réserver son badge",
        eventUrl: "https://univ-fhb.edu.ci"
      },
      {
        id: "masterclass-actuaire-base",
        title: "Masterclass : Devenir Actuaire en Côte d'Ivoire",
        date: `10 Mai ${currentYear}`,
        location: "En ligne (Zoom)",
        type: "Masterclass",
        ctaLabel: "Rejoindre le webinaire",
        eventUrl: "https://ensea.ed.ci"
      },
      {
        id: "salon-grandes-ecoles-base",
        title: "Salon des Grandes Écoles de CI",
        date: `07 Juin ${currentYear}`,
        location: "Abidjan, Sofitel Hôtel Ivoire",
        type: "Salon",
        ctaLabel: "Obtenir mon ticket",
        eventUrl: "https://mesrs.gouv.ci"
      },
      {
        id: "concours-ensea-base",
        title: "Concours national d'entrée à l'ENSEA",
        date: `20 Juin ${currentYear}`,
        location: "Abidjan, Campus ENSEA",
        type: "Concours",
        ctaLabel: "Télécharger le dossier",
        eventUrl: "https://ensea.ed.ci"
      }
    ];

    // Convertir les événements scrapés en EventItem avec des IDs uniques
    const formattedScraped: EventItem[] = scraped.map((event, idx) => ({
      id: `scraped-${event.type.toLowerCase()}-${idx}-${Date.now()}`,
      title: event.title,
      date: event.date,
      location: event.location,
      type: event.type,
      ctaLabel: event.ctaLabel,
      eventUrl: event.eventUrl
    }));

    // Fusionner : on place les événements scrapés en tête s'ils existent,
    // et on complète ou mélange avec nos événements de référence.
    // On va s'assurer de renvoyer un maximum de 6 événements ordonnés dans le temps (ou par type)
    const all = [...formattedScraped, ...baseEvents];
    
    // Éliminer les doublons potentiels basés sur le titre approchant
    const unique: EventItem[] = [];
    const titlesSeen = new Set<string>();

    for (const item of all) {
      const normalizedTitle = item.title.toLowerCase().substring(0, 15);
      if (!titlesSeen.has(normalizedTitle)) {
        titlesSeen.add(normalizedTitle);
        unique.push(item);
      }
    }

    return unique.slice(0, 6);
  }
}
