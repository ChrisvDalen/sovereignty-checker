import { DOMEINEN, VOORBEELDKLANTEN } from './assessment.config';
import { CATALOGUS } from './solution-catalog';
import { stelVoorstelSamen } from './logic/voorstel';

describe('config en catalogus', () => {
  it.each(DOMEINEN.map((d) => [d.id]))('catalogus is compleet voor domein %s', (id) => {
    for (const stap of ['1-2', '2-3', '3-4'] as const) {
      const item = CATALOGUS[id]?.[stap];
      expect(item, `${id} ${stap}`).toBeDefined();
      expect(item.aanpak && item.herbruikbareComponent && item.proofOfValue.scope).toBeTruthy();
    }
  });

  it('heeft meerdere voorbeeldklanten met unieke id', () => {
    expect(VOORBEELDKLANTEN.length).toBeGreaterThanOrEqual(4);
    expect(new Set(VOORBEELDKLANTEN.map((k) => k.id)).size).toBe(VOORBEELDKLANTEN.length);
  });

  it.each(VOORBEELDKLANTEN.map((k) => [k.label, k]))(
    'voorbeeldklant %s is volledig ingevuld en levert een top 3',
    (_label, k) => {
      for (const d of DOMEINEN) {
        expect(k.scores[d.id], d.id).toBeGreaterThanOrEqual(1);
        expect(k.scores[d.id], d.id).toBeLessThanOrEqual(4);
      }
      const v = stelVoorstelSamen({ ...k, domeinen: DOMEINEN, catalogus: CATALOGUS });
      expect(v.prioriteiten.length).toBe(3);
    },
  );

  it('voorbeeldklanten verschillen onderling in hun top 3', () => {
    const tops = VOORBEELDKLANTEN.map((k) =>
      stelVoorstelSamen({ ...k, domeinen: DOMEINEN, catalogus: CATALOGUS })
        .prioriteiten.map((p) => `${p.domein.id}:${p.stap}`)
        .join(','),
    );
    expect(new Set(tops).size).toBe(tops.length);
  });
});
