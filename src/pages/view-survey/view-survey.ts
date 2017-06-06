import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormlyFieldConfig } from 'ng-formly';
import { Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-view-survey',
  templateUrl: 'view-survey.html'
})
export class ViewSurveyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  templateField: FormlyFieldConfig;
  surveyData = this.navParams.get('survey');
  templateData = this.navParams.get('survey_template');
  title = this.surveyData.surveyTitle;
  survey_template = {fieldGroup: this.templateData[0].template_definition};
  form: FormGroup = new FormGroup({});
  templateFields: Array<FormlyFieldConfig> = [ this.survey_template ];

  ionViewDidLoad() {
    console.log(this.surveyData);
    console.log(this.templateData[0].template_definition);
  }

}
