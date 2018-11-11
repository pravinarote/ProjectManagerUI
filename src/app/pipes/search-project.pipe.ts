import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'src/app/models/project';

@Pipe({
  name: 'searchProject'
})
export class SearchProjectPipe implements PipeTransform {

  transform(items: Project[], searchText: string): Project[] {
    if(!items) return [];
    var searchItems : any = items;
    if(searchText) {
      searchText = searchText.toLowerCase();
      searchItems = items.filter( it => {
        return it.ProjectName.toLowerCase().includes(searchText) ;
      });
    }
    return searchItems;
  }

}
