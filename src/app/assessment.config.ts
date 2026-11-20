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

/**
 * VOORBEELDKLANTEN voor de demo (fictief). Elke klant krijgt een knop in stap 1.
 * `streefniveau` wordt bij laden gezet; laat weg voor STANDAARD_STREEFNIVEAU.
 */
export interface Voorbeeldklant {
  id: string;
  label: string; // korte tekst op de knop
  klantnaam: string;
  streefniveau: number;
  scores: Record<string, number>;
  toelichtingen: Record<string, string>;
}

export const VOORBEELDKLANTEN: Voorbeeldklant[] = [
  {
    // Middelgroot, deels in kaart → mix van beleid, migratiepilot en werkplek
    id: 'gemeente',
    label: 'Gemeente',
    klantnaam: 'Gemeente Voorbeeld (± 30.000 inwoners)',
    streefniveau: STANDAARD_STREEFNIVEAU,
    scores: { cloud: 2, ai: 1, werkplek: 2, data: 2, identiteit: 3, leveranciers: 2, wetgeving: 4 },
    toelichtingen: {
      cloud: 'Zaaksysteem en website in de cloud; overzicht per applicatie is er, exitplan nog niet.',
      ai: 'Medewerkers gebruiken publieke AI-chatdiensten voor teksten; er is nog geen beleid.',
      werkplek: 'Kantoorsuite van één Amerikaanse leverancier; in kaart gebracht welke data waar staat.',
      data: 'Classificatie is vorig jaar vastgesteld, maar back-up en sleutels staan bij dezelfde leverancier.',
      identiteit: 'Federatie via open standaarden voor de belangrijkste applicaties.',
      leveranciers: 'Afhankelijkheden in kaart via samenwerkingsverband; exitclausules ontbreken nog.',
      wetgeving: 'Privacy officer en CISO toetsen structureel; soevereiniteit staat in het inkoopbeleid.',
    },
  },
  {
    // Beginnend: weinig zicht → voorstel draait om inzicht en classificatie
    id: 'waterschap',
    label: 'Waterschap',
    klantnaam: 'Waterschap Voorbeeld',
    streefniveau: STANDAARD_STREEFNIVEAU,
    scores: { cloud: 1, ai: 2, werkplek: 2, data: 1, identiteit: 2, leveranciers: 1, wetgeving: 2 },
    toelichtingen: {
      cloud: 'Kantoor-IT grotendeels uitbesteed; onduidelijk waar applicaties precies draaien.',
      ai: 'Verkenning naar AI voor het voorspellen van waterstanden; gebruik is geïnventariseerd.',
      werkplek: 'Standaard kantoorsuite; overzicht van gebruikte diensten is gemaakt.',
      data: 'Meetdata en procesdata staan verspreid over leveranciersportalen; geen classificatie.',
      identiteit: 'Aparte accounts voor kantoor-IT en procesautomatisering.',
      leveranciers: 'Procesautomatisering bij enkele gespecialiseerde leveranciers; contracten zonder exitafspraken.',
      wetgeving: 'Verantwoordelijkheden voor informatiebeveiliging recent belegd.',
    },
  },
  {
    // Gevorderd, veel burgerdata → twee domeinen komen uit op dezelfde landingszone
    id: 'uitvoering',
    label: 'Uitvoeringsorganisatie',
    klantnaam: 'Uitvoeringsorganisatie Voorbeeld (landelijk, veel burgerdata)',
    streefniveau: STANDAARD_STREEFNIVEAU,
    scores: { cloud: 2, ai: 2, werkplek: 3, data: 2, identiteit: 2, leveranciers: 3, wetgeving: 3 },
    toelichtingen: {
      cloud: 'Eigen datacenter wordt afgebouwd; nieuwe workloads gaan naar een publieke cloud.',
      ai: 'AI-beleid vastgesteld; behoefte aan een goedgekeurde voorziening voor medewerkers.',
      werkplek: 'Gevoelige dossiers al in een aparte, soeverein beheerde omgeving.',
      data: 'Classificatie op orde; sleutelbeheer ligt nog bij de cloudleverancier.',
      identiteit: 'Koppelingen in kaart; veel applicaties nog direct gekoppeld aan één identiteitsbron.',
      leveranciers: 'Soevereiniteitseisen standaard in aanbestedingen sinds dit jaar.',
      wetgeving: 'Soevereiniteitstoets onderdeel van de architectuurboard.',
    },
  },
  {
    // Hoge ambitie (streefniveau 4) → ook de stap 3→4 komt in beeld
    id: 'ministerie',
    label: 'Ministerie (ambitie 4)',
    klantnaam: 'Ministerie Voorbeeld (streefniveau 4)',
    streefniveau: 4,
    scores: { cloud: 3, ai: 2, werkplek: 3, data: 3, identiteit: 3, leveranciers: 2, wetgeving: 3 },
    toelichtingen: {
      cloud: 'Kritieke workloads draaien op een soevereine omgeving; portabiliteit nog niet getest.',
      ai: 'AI-register en beleid zijn er; medewerkers missen een goedgekeurde AI-voorziening.',
      werkplek: 'Soevereine samenwerkingsomgeving voor gerubriceerde informatie in gebruik.',
      data: 'Eigen sleutelbeheer voor kritieke data; export in open formaten niet aangetoond.',
      identiteit: 'Federatielaag op open standaarden in productie.',
      leveranciers: 'Concentratierisico’s bekend; eisenset voor aanbestedingen ontbreekt nog.',
      wetgeving: 'Soevereiniteitstoets vast onderdeel van besluitvorming.',
    },
  },
];
