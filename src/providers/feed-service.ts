import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

export class FeedItem {
  title: string;
  file: string;
  description: string;

  constructor(title: string, file: string, description: string) {
    this.title = title;
    this.file = file;
    this.description = description;
  }
}

export class Feed {
  title: string;
  url: string;
 
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class FeedService {

  constructor(public http: Http, public storage: Storage) {}

  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return [];
      }
    });
  }

  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(arrayOfFeeds => {
      arrayOfFeeds.push(newFeed);
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }

  public getPodcastsForUrl(feedUrl: string) {
        var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20subtitle%2C%20content.url%20from%20rss%20where%20url%20%3D%22'+encodeURIComponent(feedUrl)+'%22&format=json';
        let articles = [];
        return this.http.get(url)
        .map(data => data.json()['query']['results'])
        .map((res) => {
          if (res == null) {
            return articles;
          }
          let objects = res['item'];
          var length = 20;

          for (let i = 0; i < objects.length; i++) {
            let item = objects[i];
            var trimmedDescription = item.subtitle;
            let newFeedItem = new FeedItem(item.title, item.content.url, trimmedDescription);
            articles.push(newFeedItem);
          }
          return articles;
        });
  }

}
