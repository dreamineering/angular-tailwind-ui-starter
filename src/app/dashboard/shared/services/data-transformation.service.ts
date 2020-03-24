import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class DataTransformationService {

  constructor() { }


  /*
   * JTBD
   *
   * https://github.com/tomi/fromfrom
   * https://github.com/ramda/ramda
   *
   *
   *
   *
   */


  // use and aggKey when you want to aggregate by more
  // than one field
  GroupDataByField(data: any, aggKey: string, whitelist: string[]) {


    // Calculate the sums and group data (while tracking count)
    const reduced = data.reduce((m, d) => {
      if (!m[d[aggKey]]) {
        m[d[aggKey]] = { ...d, count: 1 };
        return m;
      }
      whitelist.forEach((key) => {
        m[d[aggKey]][key] += d[key];
      });
      m[d[aggKey]].count += 1;
      return m;
    }, {});

    // Create new array from grouped data and compute the average
    return Object.keys(reduced).map((k) => {
      const item = reduced[k];
      const itemAverage = whitelist.reduce((m, key) => {
        m[key] = item[key] / item.count;
        return m;
      }, {});

      return {
        ...item, // Preserve any non white-listed keys
        ...itemAverage // Add computed averege for whitelisted keys
      };
    });
  }

  // to aggregate across a larger  dataset
  // where need to derive a new result without relying on the server
  getUniqueDatesFromArray(resultDates: any, dateField: string) {
    // let dates = [new Date(), new Date('1/1/11'), new Date('1/1/11'), new Date('1/4/66')]

    const uniqueDates = resultDates
      .map(d => d[dateField])
      .map(s => s.toString())
      .filter((s, i, a) => a.indexOf(s) === i)
      .map(s => new Date(s));

    // console.log(uniqueDates);

    return uniqueDates;
  }


}
