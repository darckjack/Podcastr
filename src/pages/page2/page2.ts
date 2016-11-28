import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { PlayPage } from '../play/play';
import { FeedService, FeedItem, Feed } from '../../providers/feed-service';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private feedService: FeedService) {
    this.selectedFeed = navParams.get('selectedFeed');
  }

  loadPodcasts() {
    this.loading = true;
    this.feedService.getPodcastsForUrl(this.selectedFeed.url).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }

  public openPodcast(podcast: FeedItem) {
    this.navCtrl.push(PlayPage, {'selectedItem': podcast});
  }

  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null) {
      this.loadPodcasts();
    } else {
      this.feedService.getSavedFeeds().then(feeds => {
        if (feeds.length > 0) {
          let item = feeds[0];
          this.selectedFeed = new Feed(item.title, item.url);
          this.loadPodcasts();
        }
      });
    }
  }

}
