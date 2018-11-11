import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(items: User[], searchText : string): User[] {
    if(!items) return [];
    var searchItems : any = items;
    if(searchText) {
      searchText = searchText.toLowerCase();
      searchItems = items.filter( it => {
        return it.FirstName.toLowerCase().includes(searchText) ||
        it.LastName.toLowerCase().includes(searchText);
      });
    }
    return searchItems;
  }

}
