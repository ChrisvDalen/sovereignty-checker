import { berekenGaten, topPrioriteiten } from './scoring';
import { Domein } from '../assessment.config';

const d = (id: string): Domein => ({
  id,
  naam: id.toUpperCase(),
  beschrijving: '',
  levels: ['l1', 'l2', 'l3', 'l4'],
});
const DOMEINEN = [d('a'), d('b'), d('c'), d('e'), d('f')];

describe('berekenGaten', () => {
  it('berekent gat als streefniveau minus score', () => {
    const gaten = berekenGaten(DOMEINEN, { a: 1, b: 2, c: 3, e: 4, f: 2 }, 3);
    expect(gaten.map((g) => g.gat)).toEqual([2, 1, 0, 0, 1]);
  });

  it('geeft nooit een negatief gat als score boven streefniveau ligt', () => {
    const [g] = berekenGaten([d('a')], { a: 4 }, 2);
    expect(g.gat).toBe(0);
  });

  it('telt niet-ingevulde domeinen niet mee als gat', () => {
    const [g] = berekenGaten([d('a')], {}, 3);
    expect(g.score).toBeNull();
    expect(g.gat).toBe(0);
  });

  it('herberekent bij een ander streefniveau', () => {
    const scores = { a: 1, b: 2, c: 3, e: 4, f: 2 };
    expect(berekenGaten(DOMEINEN, scores, 4).map((g) => g.gat)).toEqual([3, 2, 1, 0, 2]);
    expect(berekenGaten(DOMEINEN, scores, 2).map((g) => g.gat)).toEqual([1, 0, 0, 0, 0]);
  });
});

describe('topPrioriteiten', () => {
  it('kiest de 3 domeinen met het grootste gat, aflopend', () => {
    const gaten = berekenGaten(DOMEINEN, { a: 3, b: 1, c: 2, e: 4, f: 1 }, 4);
    // gaten: a1 b3 c2 e0 f3
    expect(topPrioriteiten(gaten).map((g) => g.domein.id)).toEqual(['b', 'f', 'c']);
  });

  it('gebruikt bij gelijkspel de volgorde uit de config', () => {
    const gaten = berekenGaten(DOMEINEN, { a: 2, b: 2, c: 2, e: 2, f: 2 }, 3);
    expect(topPrioriteiten(gaten).map((g) => g.domein.id)).toEqual(['a', 'b', 'c']);
  });

  it('neemt alleen domeinen onder streefniveau mee', () => {
    const gaten = berekenGaten(DOMEINEN, { a: 3, b: 2, c: 3, e: 4, f: 3 }, 3);
    expect(topPrioriteiten(gaten).map((g) => g.domein.id)).toEqual(['b']);
  });

  it('wijzigt de top 3 als het streefniveau verandert', () => {
    const scores = { a: 3, b: 3, c: 2, e: 1, f: 3 };
    expect(topPrioriteiten(berekenGaten(DOMEINEN, scores, 3)).map((g) => g.domein.id)).toEqual([
      'e',
      'c',
    ]);
    expect(topPrioriteiten(berekenGaten(DOMEINEN, scores, 4)).map((g) => g.domein.id)).toEqual([
      'e',
      'c',
      'a',
    ]);
  });
});
