import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/operators';

interface Beer {
  id: number;
  uid: string;
  brand: string;
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: string;
  alcohol: string;
  blg: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Luis';
  beersUrl = 'https://random-data-api.com/api/beer/random_beer?size=30';
  beers$: Observable<Beer[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.beers$ = this.getBeers();

    let ops = ['5', '-2', '4', 'C', 'D', '9', '+', '+'];
    let result = [];
    let i = 0;
    let resultIndex = 0;

    while (i <= ops.length) {
      if (ops[i] === 'C') {
        console.log('i: ', i);
        console.log('Result index: ', resultIndex);
        result.pop();
        resultIndex--;
        console.log('Result: ', result);
      } else if (ops[i] === 'D') {
        console.log('i: ', i);
        console.log('Result index: ', resultIndex);
        result.push(parseInt(result[resultIndex - 1]) * 2);
        resultIndex++;
        console.log('Result: ', result);
      } else if (ops[i] === '+') {
        console.log('i: ', i);
        console.log('Result index: ', resultIndex);
        result.push(
          parseInt(result[resultIndex - 1]) + parseInt(result[resultIndex - 2])
        );
        resultIndex++;
        console.log('Result: ', result);
      } else if (ops[i] !== undefined) {
        console.log('i: ', i);
        console.log('Result index: ', resultIndex);
        result.push(parseInt(ops[i]));
        resultIndex++;
        console.log('Result: ', result);
      }

      i++;
    }

    console.log('Final Result array: ', result);
    console.log(
      'Final Result: ',
      result.reduce((a, b) => a + b, 0)
    );
  }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl).pipe(
      map((beers) => {
        beers.map((beer) => {
          beer.alcohol = beer.alcohol.split('%')[0];
        });
        return beers;
      })
    );
  }
}
