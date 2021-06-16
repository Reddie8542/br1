import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'src/utils/string-utils';

@Pipe({
  name: 'toDisplayName',
  pure: true,
})
export class DisplayNamePipe implements PipeTransform {
  transform(id: string | null | undefined) {
    if (id != null) {
      let displayName = '';
      const words = id.split('-');
      for (let i = 0; i < words.length; i++) {
        const isLastWord = i === words.length - 1;
        const word = words[i];
        displayName += capitalize(word);
        if (!isLastWord) {
          displayName += ' ';
        }
      }
      return displayName;
    } else {
      return id;
    }
  }
}
