import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedItem } from '../../providers/feed-service';
import { MediaPlugin } from 'ionic-native';


@Component({
  selector: 'page-play',
  templateUrl: 'play.html'
})
export class PlayPage {

  selectedPodcast: FeedItem;
  playing: Boolean;
  radio: MediaPlugin;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedPodcast = navParams.get('selectedItem');
    this.radio = new MediaPlugin(this.selectedPodcast.file);
    this.playing = false;
  }

  public play() {
    this.radio.play();
    this.playing = true;
  }

  public pause() {
    this.radio.pause();
    this.playing = false;
  }

}
