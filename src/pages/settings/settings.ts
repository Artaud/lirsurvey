import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SettingsData } from '../../providers/data';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { availableLanguages, sysOptions } from '../i18n/i18n.constants';
import { TranslateService } from 'ng2-translate';

declare var cordova: any;
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  lastImage: string = null;

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;
  private translate: TranslateService;

  constructor(private camera: Camera, private file: File, private filePath: FilePath, public navCtrl: NavController, public navParams: NavParams, public settingsDataService: SettingsData, public platform: Platform, public toastCtrl: ToastController, translate: TranslateService) {
    this.translate = translate
  }

  parent = this.navParams.get('parent');

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWilEnter SettingsPage');
    console.log(this.settingsDataService.getBackgroundImageUrl());
  }

  applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }

  changeBackground(){
    var options = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        // targetWidth: 1000,
        // targetHeight: 1000
    }

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android')) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            // let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            // let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            this.settingsDataService.setBackgroundImageUrl(filePath);
            this.presentToast('Image loaded succesfully' + ' ' + filePath);
          });
      } else {
        // var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        // var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        this.settingsDataService.setBackgroundImageUrl(imagePath);
        this.presentToast('Image loaded successfully' + ' ' + imagePath);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }



  changeLogo(){

    var options = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        // targetWidth: 1000,
        // targetHeight: 40
    }

    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android')) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            this.settingsDataService.setLogoUrl(filePath);
            this.presentToast('Image loaded succesfully' + ' ' + filePath);
          });
      } else {
        this.settingsDataService.setLogoUrl(imagePath);
        this.presentToast('Image loaded successfully' + ' ' + imagePath);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
