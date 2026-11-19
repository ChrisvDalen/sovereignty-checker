import { Domein } from '../assessment.config';
import { Catalogus, CatalogusItem, LevelStap } from '../solution-catalog';
import { berekenGaten, DomeinGat, Scores, topPrioriteiten } from './scoring';

export interface Prioriteit {
  domein: Domein;
  score: number;
  gat: number;
  stap: LevelStap;
  item: CatalogusItem;
  toelichting: string;
}

export interface Voorstel {
  klantnaam: string;
  streefniveau: number;
  aantalDomeinen: number;
  aantalOnderStreef: number;
  grootsteGat: DomeinGat | null;
  prioriteiten: Prioriteit[];
  herbruikbareComponenten: string[];
}

export interface VoorstelInput {
  klantnaam: string;
  domeinen: Domein[];
  catalogus: Catalogus;
  scores: Scores;
  toelichtingen: Record<string, string>;
  streefniveau: number;
}

export function stelVoorstelSamen(input: VoorstelInput): Voorstel {
  const gaten = berekenGaten(input.domeinen, input.scores, input.streefniveau);
  const top = topPrioriteiten(gaten);

  const prioriteiten = top.map((g): Prioriteit => {
    const score = g.score as number;
    const stap = `${score}-${score + 1}` as LevelStap;
    return {
      domein: g.domein,
      score,
      gat: g.gat,
      stap,
      item: input.catalogus[g.domein.id][stap],
      toelichting: input.toelichtingen[g.domein.id]?.trim() ?? '',
    };
  });

  return {
    klantnaam: input.klantnaam,
    streefniveau: input.streefniveau,
    aantalDomeinen: input.domeinen.length,
    aantalOnderStreef: gaten.filter((g) => g.gat > 0).length,
    grootsteGat: top[0] ?? null,
    prioriteiten,
    herbruikbareComponenten: [...new Set(prioriteiten.map((p) => p.item.herbruikbareComponent))],
  };
}

export function samenvatting(v: Voorstel): string {
  if (!v.grootsteGat) return `Alle ${v.aantalDomeinen} domeinen op of boven streefniveau ${v.streefniveau}.`;
  return (
    `${v.aantalOnderStreef} van ${v.aantalDomeinen} domeinen onder streefniveau ${v.streefniveau}, ` +
    `grootste gat: ${v.grootsteGat.domein.naam} (${v.grootsteGat.gat} level${v.grootsteGat.gat > 1 ? 's' : ''}).`
  );
}

export function naarMarkdown(v: Voorstel): string {
  const r: string[] = [
    `# Solution-voorstel digitale soevereiniteit — ${v.klantnaam || 'klant'}`,
    '',
    `**Samenvatting:** ${samenvatting(v)}`,
    '',
  ];
  v.prioriteiten.forEach((p, i) => {
    r.push(
      `## ${i + 1}. ${p.domein.naam} (level ${p.score} → ${p.score + 1})`,
      '',
      `Gat t.o.v. streefniveau: ${p.gat}`,
      ...(p.toelichting ? ['', `> Toelichting klant: ${p.toelichting}`] : []),
      '',
      `**Aanpak:** ${p.item.aanpak}`,
      '',
      '**Proof of value**',
      '',
      `- Scope: ${p.item.proofOfValue.scope}`,
      `- Doorlooptijd: ${p.item.proofOfValue.duur}`,
      `- Succescriterium: ${p.item.proofOfValue.succescriterium}`,
      '',
      `**Herbruikbare component:** ${p.item.herbruikbareComponent}`,
      '',
      `**Afhankelijkheden:** ${p.item.afhankelijkheden.join('; ')}`,
      '',
    );
  });
  if (v.herbruikbareComponenten.length) {
    r.push(
      '## Herbruikbare solution',
      '',
      'Input voor een solution die voor meerdere klanten bruikbaar is:',
      '',
      ...v.herbruikbareComponenten.map((c) => `- ${c}`),
      '',
    );
  }
  return r.join('\n');
}
