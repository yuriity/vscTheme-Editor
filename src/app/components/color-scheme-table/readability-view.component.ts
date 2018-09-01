import { Component, OnInit, Input } from '@angular/core';

interface Range {
  min: number;
  max: number;
}

interface ReadabilityLevel {
  range: Range;
  name: string;
  color: string;
  class: string;
  message: string;
}

const ReadabilityLevels: ReadabilityLevel[] = [
  {
    range: { min: 0, max: 3},
    name: 'fail',
    color: '#c00',
    class: 'visibility_off',
    message: 'Fails WCAG 2.0 :-('
  },
  {
    range: { min: 3, max: 4.5},
    name: 'aa-large',
    color: '#e69900',
    class: 'visibility',
    message: 'Passes AA for large text (above 18pt or bold above 14pt)'
  },
  {
    range: { min: 4.5, max: 7},
    name: 'aa',
    color: '#8ab82e',
    class: 'visibility',
    message: 'Passes AA level for any size text and AAA for large text (above 18pt or bold above 14pt)'
  },
  {
    range: { min: 7, max: 22},
    name: 'aaa',
    color: '#5ea72a',
    class: 'visibility',
    message: 'Passes AAA level for any size text'
  }
];

@Component({
  selector: 'app-readability-view',
  template: `
    <mat-icon
      class="mat-icon material-icons"
      [ngStyle]="{'color': readabilityLevel.color}"
      [matTooltip]="readabilityLevel.message">{{ readabilityLevel.class }}</mat-icon>
    <h1>{{readability | number:'1.0-1'}}</h1>
  `,
  styles: [`
    h1 {
      display: inline;
      margin-left: 10px;
    }
  `
  ]
})
export class ReadabilityViewComponent implements OnInit {
  private _readability: number;
  get readability(): number {
    return this._readability;
  }
  @Input()
  set readability(value: number) {
    this._readability = value;
  }

  get readabilityLevel(): ReadabilityLevel {
    for (const level of ReadabilityLevels) {
      if (this.readability >= level.range.min && this.readability < level.range.max) {
        return level;
      }
    }
  }

  constructor() {}

  ngOnInit() {}
}
