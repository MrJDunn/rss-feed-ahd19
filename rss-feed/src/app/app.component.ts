import { Component, OnInit } from '@angular/core';
import { Item } from './classes/item';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'RSS Feed';

  results: Item[];

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.feedMe();
    this.results = this.apiService.results;
  }

  deleteEntry(item: Item) {
    this.apiService.deleteEntry(item);
    this.results = this.apiService.results;
  }

  feedMe() {
    this.apiService.feedMe();
    this.results = this.apiService.results;
  }
}
