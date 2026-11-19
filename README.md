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

In de app: **Laad voorbeeldklant** → **Naar resultaat** → **Naar solution-voorstel** → **Exporteer als Markdown**.

## Assessment vervangen

Alles staat in `src/app/assessment.config.ts`:

- `DOMEINEN`: per domein `id`, `naam`, `beschrijving` en `levels` (precies 4 omschrijvingen, level 1 t/m 4).
  De volgorde van deze lijst is ook de tiebreak bij gelijke gaten.
- `LEVEL_NAMEN`: de labels voor level 1–4.
- `STANDAARD_STREEFNIVEAU`: startwaarde van het streefniveau (in de app instelbaar bij Resultaat).
- `VOORBEELDKLANT`: scores en toelichtingen achter de knop "Laad voorbeeldklant".

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
