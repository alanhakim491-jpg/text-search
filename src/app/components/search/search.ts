import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { Articles } from '../../services/articles';
import { Article } from '../../models/articles.types';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, HighlightPipe],
  template: `
    <div class="page">
      <h2>Article Search</h2>
      <input class="search" type="search" [ngModel]="query()" (ngModelChange)="query.set($event)" placeholder="Search" autocomplete="off"/>
      <div class="meta">
        @if (query().trim().length > 0) {
          {{ results().length }} results{{ results().length === 1 ? '' : 's' }}
          for "{{ query().trim() }}"
        } @else {
          Showing all articles (type to search)
        }
      </div>

      @if (results().length === 0) {
        <div class="empty">No matches found.</div>
      } @else {
        <ul class="list">
          @for (result of results(); track result.id) {
            <li class="list-item">
              <div class="title" [innerHTML]="result.title | highlight: query()"></div>
              <div class="excerpt" [innerHTML]="result.excerpt | highlight: query()"></div>
              <div class="content" [innerHTML]="result.content | highlight: query()"></div>
              <div class="tags">
                @for (tag of result.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styleUrls: ['./search.scss'],
})
export class Search {
  private articles = inject(Articles);

  readonly query = signal('');

  readonly results = computed<Article[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.articles.articles();

    return this.articles.articles().filter((a: Article) => {
      const haystack = `${a.title} ${a.excerpt} ${a.content} ${a.tags.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  });

  trackById(_: number, item: Article) {
    return item.id;
  }
}
