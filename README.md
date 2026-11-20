# Soevereiniteitsassessment → Solution-voorstel (demo)

Single-page Angular-app: assessment invullen → resultaat t.o.v. streefniveau → regelgebaseerd
solution-voorstel (top 3 grootste gaten) met Markdown-export. Geen backend, geen LLM, geen
netwerkcalls; werkt volledig offline na `npm install`.

## Starten

```bash
npm install
npm start          # http://localhost:4200
npm test -- --watch=false
```

In de app: kies een voorbeeldklant (Gemeente, Waterschap, Uitvoeringsorganisatie, Ministerie) → **Naar resultaat** → **Naar solution-voorstel** → **Exporteer als Markdown**.

## Assessment vervangen

Alles staat in `src/app/assessment.config.ts`:

- `DOMEINEN`: per domein `id`, `naam`, `beschrijving` en `levels` (precies 4 omschrijvingen, level 1 t/m 4).
  De volgorde van deze lijst is ook de tiebreak bij gelijke gaten.
- `LEVEL_NAMEN`: de labels voor level 1–4.
- `STANDAARD_STREEFNIVEAU`: startwaarde van het streefniveau (in de app instelbaar bij Resultaat).
- `VOORBEELDKLANTEN`: de demo-cases (fictief). Elke case krijgt automatisch een knop; per case `label`, `klantnaam`, `streefniveau`, `scores` en `toelichtingen`. Een case toevoegen = een object toevoegen. `npm test` controleert dat elke case volledig is en een eigen top 3 oplevert.

Voeg je een domein toe of wijzig je een `id`, voeg dan ook een catalogusblok met hetzelfde `id` toe.
`npm test` faalt als de catalogus niet compleet is.

## Catalogus aanpassen

`src/app/solution-catalog.ts` bevat per domein-`id` drie levelstappen (`'1-2'`, `'2-3'`, `'3-4'`), elk met:
`aanpak`, `proofOfValue { scope, duur, succescriterium }`, `herbruikbareComponent`, `afhankelijkheden`.

Het blok "Herbruikbare solution" toont de unieke `herbruikbareComponent`-teksten uit de top 3.
Een component die in meerdere domeinen terugkomt (bijv. de landingszone) staat bovenin als constante;
gebruik die, dan wordt hij ontdubbeld.

## Logica

- `src/app/logic/scoring.ts`: gat = max(0, streefniveau − score); top 3 = grootste gat, gelijkspel op config-volgorde.
- `src/app/logic/voorstel.ts`: kiest per prioriteit het catalogusitem voor de stap score → score+1 en maakt de Markdown.

## Huisstijl

Afgeleid van de stylesheet van soprasteria.com (november 2026). Alles staat als CSS-variabelen
bovenin `src/styles.css`:

- tekst en primaire knoppen donkerpaars `#2a1449`; randen lila `#9179b1`, vlakken `#ede9f2` / `#fdf2e5`
- merkverloop paars → magenta → rood → oranje (`--ss-verloop`) onder de kop, onder h2 en op het actieve tabblad
- vierkante hoeken, knoppen in hoofdletters, witte kop met lila schaduw
- logo: `public/logo-soprasteria.svg` (officiële SVG van soprasteria.com)
- resultaatgrafiek: paars = op streefniveau, oranje = 1 level onder, rood = 2+ levels onder

Het huisfont (Hurme Geometric Sans) is een gelicentieerd font en wordt niet meegeleverd.
Is het lokaal geïnstalleerd, dan gebruikt de app het automatisch; anders een geometrische fallback.
