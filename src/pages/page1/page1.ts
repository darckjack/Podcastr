import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FeedService, Feed } from '../../providers/feed-service';
import { Page2 } from '../page2/page2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  feeds: Feed[];

  constructor(public navCtrl: NavController, private feedService: FeedService, private alertCtrl: AlertController) { }

  public addFeed() {
    let prompt = this.alertCtrl.create({
      title: 'Añadir Podcast',
      inputs: [
        {
          name: 'name',
          placeholder: 'El Mejor Podcast'
        },
        {
          name: 'url',
          placeholder: 'http://myPodcast.com/rss'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data => {
            let newFeed = new Feed(data.name, data.url);
            this.feedService.addFeed(newFeed).then( res => {
              this.loadFeeds();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private loadFeeds() {
    this.feedService.getSavedFeeds().then(allFeeds => {
      this.feeds = allFeeds;
    });
  }

  public openFeed(feed: Feed) {
    this.navCtrl.push(Page2, {'selectedFeed': feed});
  }

  public ionViewWillEnter() {
      this.loadFeeds();
    }

}
