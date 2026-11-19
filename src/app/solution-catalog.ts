/**
 * SOLUTION-CATALOGUS
 * Per domein (zelfde `id` als in assessment.config.ts) en per levelstap één item.
 * Pas teksten hier aan; de app leest alles uit dit bestand.
 * Tip: gebruik exact dezelfde tekst voor `herbruikbareComponent` als een component
 * in meerdere domeinen terugkomt; het overzicht "Herbruikbare solution" ontdubbelt op tekst.
 */
export type LevelStap = '1-2' | '2-3' | '3-4';

export interface CatalogusItem {
  aanpak: string;
  proofOfValue: { scope: string; duur: string; succescriterium: string };
  herbruikbareComponent: string;
  afhankelijkheden: string[];
}

export type Catalogus = Record<string, Record<LevelStap, CatalogusItem>>;

// Componenten die in meerdere domeinen terugkomen
const AFHANKELIJKHEDENSCAN = 'Afhankelijkhedenscan: applicatie- en leverancierskaart met risicoscore';
const LANDINGSZONE = 'Soevereine landingszone (referentiearchitectuur + Infrastructure as Code)';
const EXIT_TOOLKIT = 'Exit- en portabiliteitstoolkit (draaiboek, contractclausules, migratiepatronen)';

export const CATALOGUS: Catalogus = {
  cloud: {
    '1-2': {
      aanpak:
        'Breng alle workloads, hostinglocaties en beheerpartijen in kaart en classificeer per workload het soevereiniteitsrisico.',
      proofOfValue: {
        scope: 'Inventarisatie van de 10 belangrijkste applicaties inclusief hostinglocatie en contractpartij',
        duur: '4 weken',
        succescriterium: 'Bestuurlijk vastgestelde risicokaart van kritieke workloads',
      },
      herbruikbareComponent: AFHANKELIJKHEDENSCAN,
      afhankelijkheden: ['Actuele CMDB of applicatieportfolio', 'Beschikbaarheid applicatie-eigenaren'],
    },
    '2-3': {
      aanpak:
        'Migreer één kritieke workload naar een Europese of soevereine cloudomgeving volgens een herbruikbare landingszone, inclusief exitplan.',
      proofOfValue: {
        scope: 'Eén representatieve applicatie live op een soevereine landingszone',
        duur: '8 weken',
        succescriterium: 'Applicatie draait productiewaardig met gelijke beschikbaarheid en vastgelegd exitplan',
      },
      herbruikbareComponent: LANDINGSZONE,
      afhankelijkheden: ['Keuze soevereine cloudaanbieder', 'Medewerking applicatieleverancier'],
    },
    '3-4': {
      aanpak:
        'Maak workloads portabel via containerisatie en open standaarden, en beleg sleutelbeheer bij de organisatie zelf.',
      proofOfValue: {
        scope: 'Eén containerised workload aantoonbaar verplaatsen tussen twee aanbieders',
        duur: '10 weken',
        succescriterium: 'Verplaatsing uitgevoerd binnen afgesproken tijd zonder functionele wijzigingen',
      },
      herbruikbareComponent: 'Portabiliteitsplatform: containerplatform met eigen sleutelbeheer (BYOK/HYOK)',
      afhankelijkheden: ['Containerkennis in beheerorganisatie', 'Landingszone bij tweede aanbieder'],
    },
  },
  ai: {
    '1-2': {
      aanpak:
        'Inventariseer welk AI-gebruik er feitelijk is, welke data daarin terechtkomt, en stel een basisbeleid voor verantwoord gebruik op.',
      proofOfValue: {
        scope: 'AI-gebruiksscan bij drie afdelingen plus concept-AI-beleid',
        duur: '4 weken',
        succescriterium: 'Vastgesteld AI-beleid en een register van AI-toepassingen',
      },
      herbruikbareComponent: 'AI-register en beleidskader voor verantwoord AI-gebruik',
      afhankelijkheden: ['Betrokkenheid privacy officer en CISO', 'Bestuurlijk mandaat'],
    },
    '2-3': {
      aanpak:
        'Bied een goedgekeurde AI-voorziening aan met afspraken over datalocatie, logging en risicobeoordeling vooraf.',
      proofOfValue: {
        scope: 'Eén use case (bijv. samenvatten van beleidsstukken) op een beheerde AI-voorziening',
        duur: '6 weken',
        succescriterium: 'Use case in gebruik bij een pilotgroep, met afgeronde risicobeoordeling',
      },
      herbruikbareComponent: 'Beheerde AI-gateway met logging, datafilters en modelkeuze',
      afhankelijkheden: ['AI-beleid (level 2)', 'Keuze hostingomgeving voor AI-diensten'],
    },
    '3-4': {
      aanpak:
        'Draai open of eigen modellen in een soevereine omgeving en ontkoppel applicaties van één specifieke modelleverancier.',
      proofOfValue: {
        scope: 'Bestaande use case overzetten naar een open model in een soevereine omgeving',
        duur: '8 weken',
        succescriterium: 'Vergelijkbare kwaliteit volgens vooraf afgesproken evaluatieset; wisselen van model zonder codewijziging',
      },
      herbruikbareComponent: 'Soevereine modelhosting met evaluatieset en modelonafhankelijke interface',
      afhankelijkheden: [LANDINGSZONE, 'GPU-capaciteit bij soevereine aanbieder'],
    },
  },
  werkplek: {
    '1-2': {
      aanpak:
        'Breng in kaart welke werkplekdiensten welke gegevens verwerken, waar die staan en welke koppelingen ervan afhankelijk zijn.',
      proofOfValue: {
        scope: 'Analyse van e-mail, bestandsopslag en samenwerking voor de hele organisatie',
        duur: '4 weken',
        succescriterium: 'Overzicht van werkplekdata met risico’s per dienst, gedeeld met bestuur',
      },
      herbruikbareComponent: AFHANKELIJKHEDENSCAN,
      afhankelijkheden: ['Beheerrechten op de huidige werkplekomgeving', 'Input informatiebeheer'],
    },
    '2-3': {
      aanpak:
        'Richt een soevereine samenwerkings- en opslagvoorziening in voor gevoelige informatie, naast de bestaande werkplek.',
      proofOfValue: {
        scope: 'Eén team met gevoelige dossiers werkt via een soevereine samenwerkingsomgeving',
        duur: '8 weken',
        succescriterium: 'Pilotteam werkt volledig in de nieuwe omgeving met positieve gebruikerservaring',
      },
      herbruikbareComponent: 'Soevereine samenwerkingsomgeving op open-sourcebasis (bestanden, chat, office)',
      afhankelijkheden: ['Dataclassificatie', 'Identiteitsfederatie op open standaarden'],
    },
    '3-4': {
      aanpak:
        'Standaardiseer op open documentstandaarden en uitwisselbare componenten, zodat een overstap een beheersbare migratie wordt.',
      proofOfValue: {
        scope: 'Migratiedraaiboek plus proefmigratie van één afdeling',
        duur: '10 weken',
        succescriterium: 'Afdeling volledig gemigreerd zonder dataverlies; draaiboek herbruikbaar',
      },
      herbruikbareComponent: EXIT_TOOLKIT,
      afhankelijkheden: ['Soevereine samenwerkingsomgeving (level 3)', 'Verandermanagement en training'],
    },
  },
  data: {
    '1-2': {
      aanpak: 'Stel een dataclassificatie vast en bepaal waar kritieke gegevens zich bevinden.',
      proofOfValue: {
        scope: 'Classificatiemodel plus datakaart voor twee kernprocessen',
        duur: '4 weken',
        succescriterium: 'Vastgesteld classificatiemodel en datakaart van kritieke gegevens',
      },
      herbruikbareComponent: 'Dataclassificatiemodel en datakaart-template voor overheid',
      afhankelijkheden: ['Betrokkenheid informatiebeheer en proceseigenaren'],
    },
    '2-3': {
      aanpak:
        'Versleutel kritieke data met eigen sleutelbeheer en richt een back-up in buiten de primaire leverancier.',
      proofOfValue: {
        scope: 'Eén kritieke dataset met eigen sleutelbeheer en onafhankelijke back-up, inclusief hersteltest',
        duur: '6 weken',
        succescriterium: 'Geslaagde hersteltest vanuit de onafhankelijke back-up',
      },
      herbruikbareComponent: LANDINGSZONE,
      afhankelijkheden: ['Dataclassificatie (level 2)', 'Keuze sleutelbeheeroplossing'],
    },
    '3-4': {
      aanpak:
        'Borg dat alle kritieke data exporteerbaar is in open formaten en dat zeggenschap periodiek wordt aangetoond.',
      proofOfValue: {
        scope: 'Volledige export en import van één systeem in open formaat',
        duur: '6 weken',
        succescriterium: 'Data aantoonbaar volledig en bruikbaar geëxporteerd en ingelezen',
      },
      herbruikbareComponent: EXIT_TOOLKIT,
      afhankelijkheden: ['Medewerking leveranciers', 'Exportfunctionaliteit in contracten'],
    },
  },
  identiteit: {
    '1-2': {
      aanpak:
        'Breng identiteitsbronnen, koppelingen en beheerrechten in kaart, inclusief afhankelijkheid van de werkplekleverancier.',
      proofOfValue: {
        scope: 'Overzicht van identiteitsbronnen en alle applicatiekoppelingen',
        duur: '3 weken',
        succescriterium: 'Volledige koppelingskaart met eigenaar per koppeling',
      },
      herbruikbareComponent: AFHANKELIJKHEDENSCAN,
      afhankelijkheden: ['Beheerrechten identiteitsomgeving'],
    },
    '2-3': {
      aanpak:
        'Ontkoppel kritieke applicaties via federatie op open standaarden (SAML/OIDC), zodat toegang niet aan één leverancier vastzit.',
      proofOfValue: {
        scope: 'Drie kritieke applicaties via een onafhankelijke federatielaag',
        duur: '6 weken',
        succescriterium: 'Applicaties werken via federatie; identiteitsbron is vervangbaar zonder herconfiguratie',
      },
      herbruikbareComponent: 'Federatielaag op open standaarden (referentie-implementatie)',
      afhankelijkheden: ['Applicaties ondersteunen SAML/OIDC', 'Koppelingskaart (level 2)'],
    },
    '3-4': {
      aanpak: 'Richt een eigen of soeverein beheerde identiteitsvoorziening in waarop leveranciers aansluiten.',
      proofOfValue: {
        scope: 'Soevereine identiteitsvoorziening voor één doelgroep (bijv. ketenpartners)',
        duur: '10 weken',
        succescriterium: 'Doelgroep logt in via eigen voorziening; leverancierswissel getest',
      },
      herbruikbareComponent: 'Soevereine identiteitsvoorziening (open source, beheerd)',
      afhankelijkheden: ['Federatielaag (level 3)', LANDINGSZONE],
    },
  },
  leveranciers: {
    '1-2': {
      aanpak:
        'Breng leveranciersafhankelijkheden en concentratierisico’s in kaart en identificeer de kritieke contracten.',
      proofOfValue: {
        scope: 'Analyse van de 20 grootste IT-contracten op afhankelijkheid en exitmogelijkheden',
        duur: '4 weken',
        succescriterium: 'Top-5 concentratierisico’s benoemd met eigenaar en vervolgactie',
      },
      herbruikbareComponent: AFHANKELIJKHEDENSCAN,
      afhankelijkheden: ['Toegang tot contractadministratie', 'Betrokkenheid inkoop'],
    },
    '2-3': {
      aanpak:
        'Neem standaard soevereiniteitseisen op in aanbestedingen en voeg exitafspraken toe aan kritieke contracten.',
      proofOfValue: {
        scope: 'Eisenset toepassen in één lopende aanbesteding en één contractverlenging',
        duur: '6 weken',
        succescriterium: 'Eisen opgenomen en geaccepteerd door inkoop en jurist',
      },
      herbruikbareComponent: 'Eisenset soevereiniteit voor aanbestedingen (modelbepalingen en gunningscriteria)',
      afhankelijkheden: ['Inkoopkalender', 'Juridische toets'],
    },
    '3-4': {
      aanpak: 'Toets exitscenario’s periodiek en houd per kritieke dienst een gevalideerd alternatief achter de hand.',
      proofOfValue: {
        scope: 'Tabletop-exitoefening voor één kritieke dienst',
        duur: '4 weken',
        succescriterium: 'Exitscenario doorlopen; knelpunten vastgelegd en belegd',
      },
      herbruikbareComponent: EXIT_TOOLKIT,
      afhankelijkheden: ['Exitafspraken in contracten (level 3)'],
    },
  },
  wetgeving: {
    '1-2': {
      aanpak:
        'Vertaal relevante wet- en regelgeving naar concrete eisen per IT-domein en beleg verantwoordelijkheden.',
      proofOfValue: {
        scope: 'Normenkader soevereiniteit voor drie domeinen',
        duur: '4 weken',
        succescriterium: 'Normenkader vastgesteld met eigenaar per eis',
      },
      herbruikbareComponent: 'Normenkader digitale soevereiniteit (vertaling wet- en regelgeving naar IT-eisen)',
      afhankelijkheden: ['Betrokkenheid jurist, privacy officer en CISO'],
    },
    '2-3': {
      aanpak:
        'Maak een soevereiniteitstoets vast onderdeel van architectuur- en inkoopbesluiten.',
      proofOfValue: {
        scope: 'Soevereiniteitstoets toepassen op twee lopende besluiten',
        duur: '4 weken',
        succescriterium: 'Toets uitgevoerd en meegenomen in besluitvorming',
      },
      herbruikbareComponent: 'Soevereiniteitstoets voor architectuur- en inkoopbesluiten (checklist + werkwijze)',
      afhankelijkheden: ['Normenkader (level 2)', 'Architectuurboard of vergelijkbaar gremium'],
    },
    '3-4': {
      aanpak: 'Richt periodieke toetsing en rapportage aan het bestuur in, zodat naleving aantoonbaar is.',
      proofOfValue: {
        scope: 'Eerste soevereiniteitsrapportage aan bestuur op basis van het assessment',
        duur: '4 weken',
        succescriterium: 'Rapportage besproken in bestuur; verbeteracties vastgesteld',
      },
      herbruikbareComponent: 'Soevereiniteitsdashboard en rapportagecyclus',
      afhankelijkheden: ['Soevereiniteitstoets (level 3)', 'Herhaalbaar assessment'],
    },
  },
};
