import { naarMarkdown, stelVoorstelSamen } from './voorstel';
import { Domein } from '../assessment.config';
import { Catalogus, CatalogusItem } from '../solution-catalog';

const d = (id: string): Domein => ({
  id,
  naam: `Domein ${id.toUpperCase()}`,
  beschrijving: '',
  levels: ['l1', 'l2', 'l3', 'l4'],
});
const item = (id: string, stap: string, component: string): CatalogusItem => ({
  aanpak: `aanpak ${id} ${stap}`,
  proofOfValue: { scope: `scope ${id}`, duur: '6 weken', succescriterium: `succes ${id}` },
  herbruikbareComponent: component,
  afhankelijkheden: [`afh ${id}`],
});
const DOMEINEN = [d('a'), d('b'), d('c'), d('e')];
const CATALOGUS: Catalogus = Object.fromEntries(
  DOMEINEN.map((dom) => [
    dom.id,
    {
      '1-2': item(dom.id, '1-2', dom.id === 'b' ? 'Gedeeld component' : `Comp ${dom.id} 1-2`),
      '2-3': item(dom.id, '2-3', dom.id === 'a' ? 'Gedeeld component' : `Comp ${dom.id} 2-3`),
      '3-4': item(dom.id, '3-4', `Comp ${dom.id} 3-4`),
    },
  ]),
);

const basis = {
  klantnaam: 'Gemeente Test',
  domeinen: DOMEINEN,
  catalogus: CATALOGUS,
  streefniveau: 3,
  toelichtingen: { b: 'Alles draait bij één hyperscaler' },
};

describe('stelVoorstelSamen', () => {
  const v = stelVoorstelSamen({ ...basis, scores: { a: 2, b: 1, c: 3, e: 2 } });

  it('vat samen hoeveel domeinen onder streefniveau zitten en het grootste gat', () => {
    expect(v.aantalOnderStreef).toBe(3);
    expect(v.aantalDomeinen).toBe(4);
    expect(v.grootsteGat?.domein.id).toBe('b');
  });

  it('kiest per prioriteit het catalogusitem voor de stap van huidige score naar +1', () => {
    expect(v.prioriteiten.map((p) => [p.domein.id, p.stap])).toEqual([
      ['b', '1-2'],
      ['a', '2-3'],
      ['e', '2-3'],
    ]);
    expect(v.prioriteiten[0].item.aanpak).toBe('aanpak b 1-2');
    expect(v.prioriteiten[0].toelichting).toBe('Alles draait bij één hyperscaler');
  });

  it('bundelt unieke herbruikbare componenten uit de top 3', () => {
    expect(v.herbruikbareComponenten).toEqual(['Gedeeld component', 'Comp e 2-3']);
  });

  it('geeft een leeg voorstel als alles op streefniveau zit', () => {
    const leeg = stelVoorstelSamen({ ...basis, scores: { a: 3, b: 4, c: 3, e: 3 } });
    expect(leeg.aantalOnderStreef).toBe(0);
    expect(leeg.grootsteGat).toBeNull();
    expect(leeg.prioriteiten).toEqual([]);
    expect(leeg.herbruikbareComponenten).toEqual([]);
  });
});

describe('naarMarkdown', () => {
  it('bevat samenvatting, prioriteiten, proof of value en herbruikbare solution', () => {
    const md = naarMarkdown(stelVoorstelSamen({ ...basis, scores: { a: 2, b: 1, c: 3, e: 2 } }));
    expect(md).toContain('# Solution-voorstel digitale soevereiniteit — Gemeente Test');
    expect(md).toContain('3 van 4 domeinen onder streefniveau');
    expect(md).toContain('## 1. Domein B (level 1 → 2)');
    expect(md).toContain('aanpak b 1-2');
    expect(md).toContain('succes b');
    expect(md).toContain('Alles draait bij één hyperscaler');
    expect(md).toContain('## Herbruikbare solution');
    expect(md).toContain('- Gedeeld component');
  });
});
