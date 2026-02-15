import { Component } from '@angular/core';
import { Search } from './components/search/search';

@Component({
  selector: 'app-root',
  imports: [Search],
  template: `<app-search />`,
  styles: [],
})
export class App {}
