import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class TodoData {
  constructor(public storage: Storage){}

  getData() {
    return this.storage.get('todos');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('todos', newData);
  }
}

@Injectable()
export class SurveyTemplateData {
  constructor(public storage: Storage){}

  getData() {
    return this.storage.get('survey_templates');
  }

  save(data){
    try {
      let newData = JSON.stringify(data);
      this.storage.set('survey_templates', newData);
    } catch(e) {
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }
}

@Injectable()
export class SurveyData {
  constructor(public storage: Storage, private toastCtrl: ToastController){}

  getData() {
    return this.storage.get('surveys');
  }

  save(data){
    let newData = JSON.stringify(data);
    var savePromise = this.storage.set('surveys', newData);
    savePromise.then(data => {
      this.presentToast();
    });
    return savePromise;
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Dotazník uložen',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

@Injectable()
export class SettingsData {

  _bkgImageUrl: string;
  _logoUrl: string;

  constructor(public storage: Storage){}

  getBackgroundImageUrl(){
    console.log('getBKGIMG');
    return this.storage.get('bkgImageUrl');
  }

  setBackgroundImageUrl(newImageUrl){
    console.log(newImageUrl);
    var savePromise = this.storage.set('bkgImageUrl', newImageUrl);
    savePromise.then(data => {
      console.log('imageuri saved: ' + data);
    });
    return savePromise;
  }

  setLogoUrl(newImageUrl){
    console.log(newImageUrl);
    var savePromise = this.storage.set('logoUrl', newImageUrl);
    savePromise.then(data => {
      console.log('imageuri saved: ' + data);
    });
    return savePromise;
  }

  getLogoUrl(){
    console.log('getLOGO');
    return this.storage.get('logoUrl');
  }
}

