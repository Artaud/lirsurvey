import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormlyFieldConfig } from 'ng-formly';
import { Validators, FormGroup } from '@angular/forms';

/*
  Generated class for the EditSurvey page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-survey',
  templateUrl: 'edit-survey.html'
})
export class EditSurveyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data);
    console.log(this.templateFields);
  }

  templateField: FormlyFieldConfig;
  survey_template = {fieldGroup: this.navParams.get('survey_template')};
  form: FormGroup = new FormGroup({});
  templateFields: Array<FormlyFieldConfig> = [ this.survey_template ];

  ionViewDidLoad() {
  }

}
