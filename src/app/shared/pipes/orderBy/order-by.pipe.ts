import { Pipe, PipeTransform, Injectable } from '@angular/core';

export type SortOrder = 'asc' | 'desc';

@Injectable()
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    list: any[],
    sortOrder: SortOrder | string = 'asc',
    sortKey?: string
  ): any[] {
    console.log('transform', list, sortOrder, sortKey);
    let sorted = [];

    if (!sortKey) {
      sorted = list.sort();
    } else {
      sorted = list.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1;
        else if (a[sortKey] > b[sortKey]) return 1;
        else return 0;
      });
    }

    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }
}
