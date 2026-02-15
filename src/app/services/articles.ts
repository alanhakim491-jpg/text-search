import { Injectable, signal } from '@angular/core';
import { Article } from '../models/articles.types';

@Injectable({
  providedIn: 'root',
})
export class Articles {
  articles = signal<Article[]>([
    {
      id: 1,
      title: 'Angular Standalone Components',
      excerpt: 'Standalone components simplify module management in Angular.',
      content: 'Standalone components remove the need for NgModules in many cases. You can import CommonModule, FormsModule, and other dependencies directly into the component.',
      tags: ['angular', 'standalone', 'components']
    },
    {
      id: 2,
      title: 'RxJS in Practice',
      excerpt: 'Streams make UI interactions like search smoother',
      content: 'RxJS is helpful for debouncing, handling async streams, and composing events. In search UIs, debounceTime and distinctUntilChanged are especially useful.',
      tags: ['rxjs', 'angular', 'streams']
    },
    {
      id: 3,
      title: 'Building Search UIs',
      excerpt: 'Search UIs should be fast, forgiving, and easy to scan.',
      content: 'Good search design includes instant feedback, clear results, highlited matches, and handling empty states. Highlighting must escape regex characters to avoid errors.',
      tags: ['ui', 'search', 'frontend']
    },
    {
      id: 4,
      title: 'Frontend Performance Basics',
      excerpt: 'Performance is a feature-optimize rendering and avoid unnecessary work.',
      content: 'Use trackBy in ngFor, keep filtering efficient, and avoid heavy computations in templates. For larger datasets, consider virtual scrolling.',
      tags: ['performance', 'frontend']
    }
  ]);
}
