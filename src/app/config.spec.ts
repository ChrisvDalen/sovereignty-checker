import { DOMEINEN, VOORBEELDKLANT } from './assessment.config';
import { CATALOGUS } from './solution-catalog';

describe('config en catalogus', () => {
  it.each(DOMEINEN.map((d) => [d.id]))('catalogus is compleet voor domein %s', (id) => {
    for (const stap of ['1-2', '2-3', '3-4'] as const) {
      const item = CATALOGUS[id]?.[stap];
      expect(item, `${id} ${stap}`).toBeDefined();
      expect(item.aanpak && item.herbruikbareComponent && item.proofOfValue.scope).toBeTruthy();
    }
  });

  it('voorbeeldklant heeft voor elk domein een score tussen 1 en 4', () => {
    for (const d of DOMEINEN) expect(VOORBEELDKLANT.scores[d.id]).toBeGreaterThanOrEqual(1);
    for (const d of DOMEINEN) expect(VOORBEELDKLANT.scores[d.id]).toBeLessThanOrEqual(4);
  });
});
