import { Component, computed, signal } from '@angular/core';
import {
  DOMEINEN,
  LEVEL_NAMEN,
  STANDAARD_STREEFNIVEAU,
  VOORBEELDKLANT,
} from './assessment.config';
import { CATALOGUS } from './solution-catalog';
import { berekenGaten } from './logic/scoring';
import { naarMarkdown, samenvatting, stelVoorstelSamen } from './logic/voorstel';

type Stap = 1 | 2 | 3;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly domeinen = DOMEINEN;
  protected readonly levelNamen = LEVEL_NAMEN;
  protected readonly levels = [1, 2, 3, 4];

  protected readonly stap = signal<Stap>(1);
  protected readonly klantnaam = signal('');
  protected readonly scores = signal<Record<string, number>>({});
  protected readonly toelichtingen = signal<Record<string, string>>({});
  protected readonly streefniveau = signal(STANDAARD_STREEFNIVEAU);

  protected readonly aantalIngevuld = computed(() => Object.keys(this.scores()).length);
  protected readonly gaten = computed(() =>
    berekenGaten(this.domeinen, this.scores(), this.streefniveau()),
  );
  protected readonly voorstel = computed(() =>
    stelVoorstelSamen({
      klantnaam: this.klantnaam(),
      domeinen: this.domeinen,
      catalogus: CATALOGUS,
      scores: this.scores(),
      toelichtingen: this.toelichtingen(),
      streefniveau: this.streefniveau(),
    }),
  );
  protected readonly samenvatting = computed(() => samenvatting(this.voorstel()));

  protected gaNaar(stap: Stap) {
    this.stap.set(stap);
    window.scrollTo(0, 0);
  }

  protected zetScore(id: string, level: number) {
    this.scores.update((s) => ({ ...s, [id]: level }));
  }

  protected zetToelichting(id: string, tekst: string) {
    this.toelichtingen.update((t) => ({ ...t, [id]: tekst }));
  }

  protected laadVoorbeeldklant() {
    this.klantnaam.set(VOORBEELDKLANT.klantnaam);
    this.scores.set({ ...VOORBEELDKLANT.scores });
    this.toelichtingen.set({ ...VOORBEELDKLANT.toelichtingen });
  }

  protected wisAssessment() {
    this.klantnaam.set('');
    this.scores.set({});
    this.toelichtingen.set({});
  }

  /** 'ok' | 'klein' | 'groot' | 'leeg' — bepaalt de kleur in het resultaat */
  protected status(score: number | null, gat: number): string {
    if (score === null) return 'leeg';
    return gat === 0 ? 'ok' : gat === 1 ? 'klein' : 'groot';
  }

  protected exporteerMarkdown() {
    const md = naarMarkdown(this.voorstel());
    const url = URL.createObjectURL(new Blob([md], { type: 'text/markdown;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution-voorstel-${(this.klantnaam() || 'klant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
