import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { availableLanguages, sysOptions } from '../i18n/i18n.constants';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {
  title;
  description;

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;
  private translate: TranslateService;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, translate: TranslateService) {
    this.translate = translate;
  }

  applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }

  saveItem(){
    let newItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(newItem);
  }

  close(){
    this.view.dismiss();
  }

}
