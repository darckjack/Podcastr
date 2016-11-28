import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { PlayPage } from '../pages/play/play';
import { Storage } from '@ionic/storage';
import { FeedService } from '../providers/feed-service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'bbb6739d'
  }
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    PlayPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    PlayPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, FeedService, Storage]
})
export class AppModule {}
