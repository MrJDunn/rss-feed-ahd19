import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Item {
  title: string;
  link: string;
  pubDate: string;
}

interface Response {
  items: Item[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'rss-feed';

  response$: Observable<Response>;
  url: string = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.ycombinator.com%2Frss"
  data: string;
  results: Item[];

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    this.feedMe();
  }

  deleteEntry(item: Item) {
    console.log(item.title);

    this.results = this.results
      .filter(element => {
        return element.title !== item.title
    });

    console.log(this.results);
  }

  feedMe() {
    this.response$ = this.httpClient
      .get<Response>(this.url)
      .pipe(map(data => {return data}));

    this.response$.subscribe(val => {
        console.log(val.items);
        this.results = val.items;
        return val.items;
      });
  }
}
