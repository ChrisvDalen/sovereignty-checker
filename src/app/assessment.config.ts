/**
 * INHOUD VAN HET ASSESSMENT
 * Vervang de domeinen hieronder door het echte assessment. Elk domein heeft
 * precies 4 levelomschrijvingen (level 1 t/m 4). Het `id` moet overeenkomen
 * met een sleutel in `solution-catalog.ts`.
 */
export interface Domein {
  id: string;
  naam: string;
  beschrijving: string;
  /** Omschrijving per level: [level 1, level 2, level 3, level 4] */
  levels: [string, string, string, string];
}

export const LEVEL_NAMEN = ['Afhankelijk', 'Bewust', 'Beheerst', 'Soeverein'] as const;

export const STANDAARD_STREEFNIVEAU = 3;

export const DOMEINEN: Domein[] = [
  {
    id: 'cloud',
    naam: 'Cloud & hosting',
    beschrijving: 'Waar draaien applicaties en infrastructuur, en wie heeft daar zeggenschap over?',
    levels: [
      'Hosting bij één niet-Europese hyperscaler zonder overzicht of exitmogelijkheid.',
      'Overzicht van workloads en hostinglocaties; risico’s per workload benoemd.',
      'Kritieke workloads draaien op een Europese of soevereine omgeving; exitplan beschikbaar.',
      'Workloads zijn portabel tussen aanbieders; regie en sleutelbeheer liggen bij de organisatie.',
    ],
  },
  {
    id: 'ai',
    naam: 'AI & modellen',
    beschrijving: 'Inzet van AI-diensten en taalmodellen, en grip op data, modellen en leveranciers.',
    levels: [
      'AI-tools worden ad hoc gebruikt door medewerkers, zonder beleid of zicht op dataverwerking.',
      'Inventarisatie van AI-gebruik en een basisbeleid voor toegestaan gebruik.',
      'Goedgekeurde AI-voorzieningen met afspraken over datalocatie, logging en risicobeoordeling.',
      'Eigen of open modellen in een beheerste omgeving; wisselen van model zonder grote impact.',
    ],
  },
  {
    id: 'werkplek',
    naam: 'Werkplek',
    beschrijving: 'Kantoorapplicaties, samenwerking, e-mail en endpoints van medewerkers.',
    levels: [
      'Volledig afhankelijk van één kantoorsuite; geen alternatief en geen zicht op dataverwerking.',
      'In kaart gebracht welke werkplekdiensten welke data verwerken en waar.',
      'Gevoelige samenwerking en opslag lopen via een soevereine voorziening; heldere scheiding.',
      'Open standaarden en uitwisselbare componenten; overstap is een beheersbare migratie.',
    ],
  },
  {
    id: 'data',
    naam: 'Data & opslag',
    beschrijving: 'Opslag, back-up, classificatie en zeggenschap over (persoons)gegevens.',
    levels: [
      'Geen dataclassificatie; data verspreid over diverse SaaS-diensten.',
      'Classificatie van gegevens vastgesteld; bekend waar kritieke data staat.',
      'Kritieke data versleuteld met eigen sleutelbeheer en back-up buiten de primaire leverancier.',
      'Data is volledig exporteerbaar in open formaten; zeggenschap aantoonbaar geborgd.',
    ],
  },
  {
    id: 'identiteit',
    naam: 'Identiteit & toegang',
    beschrijving: 'Identiteitsbeheer, authenticatie en autorisatie voor medewerkers en ketenpartners.',
    levels: [
      'Identiteiten volledig belegd bij de werkplekleverancier; geen eigen regie.',
      'Overzicht van identiteitsbronnen, koppelingen en beheerrechten.',
      'Federatie op open standaarden; kritieke toegang los van één leverancier te beheren.',
      'Eigen of soeverein beheerde identiteitsvoorziening; leveranciers zijn aansluitbaar en vervangbaar.',
    ],
  },
  {
    id: 'leveranciers',
    naam: 'Leveranciersafhankelijkheid',
    beschrijving: 'Contracten, exitmogelijkheden en concentratierisico bij IT-leveranciers.',
    levels: [
      'Geen zicht op afhankelijkheden; contracten zonder exit- of portabiliteitsafspraken.',
      'Afhankelijkheden en concentratierisico’s in kaart; kritieke contracten geïdentificeerd.',
      'Soevereiniteitseisen standaard in aanbestedingen; exitafspraken in kritieke contracten.',
      'Actief leveranciersportfolio met getoetste exitscenario’s en alternatieven.',
    ],
  },
  {
    id: 'wetgeving',
    naam: 'Wet- en regelgeving',
    beschrijving: 'Naleving van relevante wet- en regelgeving en toezicht daarop.',
    levels: [
      'Relevante wet- en regelgeving niet expliciet vertaald naar IT-keuzes.',
      'Overzicht van relevante wet- en regelgeving per domein; verantwoordelijkheden belegd.',
      'Toetsing op soevereiniteit vast onderdeel van architectuur- en inkoopbesluiten.',
      'Aantoonbare naleving met periodieke toetsing en rapportage aan bestuur.',
    ],
  },
];

/** Voorbeeldklant voor de demo: een kleine gemeente. */
export const VOORBEELDKLANT = {
  klantnaam: 'Gemeente Voorbeeld (± 30.000 inwoners)',
  scores: {
    cloud: 2,
    ai: 1,
    werkplek: 2,
    data: 2,
    identiteit: 3,
    leveranciers: 2,
    wetgeving: 4,
  } as Record<string, number>,
  toelichtingen: {
    cloud: 'Zaaksysteem en website in de cloud; overzicht per applicatie is er, exitplan nog niet.',
    ai: 'Medewerkers gebruiken publieke AI-chatdiensten voor teksten; er is nog geen beleid.',
    werkplek: 'Kantoorsuite van één Amerikaanse leverancier; in kaart gebracht welke data waar staat.',
    data: 'Classificatie is vorig jaar vastgesteld, maar back-up en sleutels staan bij dezelfde leverancier.',
    identiteit: 'Federatie via open standaarden voor de belangrijkste applicaties.',
    leveranciers: 'Afhankelijkheden in kaart via samenwerkingsverband; exitclausules ontbreken nog.',
    wetgeving: 'Privacy officer en CISO toetsen structureel; soevereiniteit staat in het inkoopbeleid.',
  } as Record<string, string>,
};
