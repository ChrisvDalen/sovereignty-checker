import { Domein } from '../assessment.config';

export type Scores = Record<string, number | null | undefined>;

export interface DomeinGat {
  domein: Domein;
  score: number | null;
  gat: number;
}

/** Gat per domein (streefniveau − score, minimaal 0), in de volgorde van de config. */
export function berekenGaten(domeinen: Domein[], scores: Scores, streefniveau: number): DomeinGat[] {
  return domeinen.map((domein) => {
    const score = scores[domein.id] ?? null;
    const gat = score === null ? 0 : Math.max(0, streefniveau - score);
    return { domein, score, gat };
  });
}

/** Domeinen onder streefniveau, grootste gat eerst; bij gelijkspel telt de config-volgorde. */
export function topPrioriteiten(gaten: DomeinGat[], aantal = 3): DomeinGat[] {
  return gaten
    .filter((g) => g.gat > 0)
    .sort((x, y) => y.gat - x.gat) // Array.sort is stabiel: config-volgorde blijft bij gelijkspel
    .slice(0, aantal);
}
