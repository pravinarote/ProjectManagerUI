import { Pipe, PipeTransform } from '@angular/core';
import { Popup } from 'src/app/models/popup';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Popup[], filterString: string): Popup[] {
    if(!items) return [];
    var searchItems : any = items;
    if(filterString) {
      filterString = filterString.toLowerCase();
      searchItems = items.filter( it => {
        return it.Name.toLowerCase().includes(filterString);
      });
    }
    return searchItems;
  }

}
