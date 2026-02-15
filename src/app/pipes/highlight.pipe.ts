import { inject } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

function escapeRegExp(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Pipe({
    name: 'highlight',
    standalone: true,
})
export class HighlightPipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);

    transform(text: string, query: string): SafeHtml {
        if (!text) return '';
        const q = (query || '').trim();
        if (!q) return text;

        const escaped = escapeRegExp(q);
        const re = new RegExp(`(${escaped})`, 'gi');

        // wrap matched text in <mark> tags to highlight it
        const highlighted = text.replace(re, `<mark>$1</mark>`);

        // sanitize the highlighted text to prevent XSS attacks
        // bypassSecurityTrustHtml is a method that allows you to bypass the security of the browser
        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }

}