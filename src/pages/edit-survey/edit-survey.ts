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
    // console.log(this.templateFields);
  }

  survey = this.navParams.get('survey');
  home = this.navParams.get('home');
  templateData = this.navParams.get('survey_template');
  allsurveys = this.navParams.get('allsurveys');
  title = this.survey.surveyTitle;


  // templateField: FormlyFieldConfig;
  // templateData = this.navParams.get('survey_template');
  // title = this.survey_template.title;
  survey_template = {fieldGroup: this.templateData[0].template_definition};
  form: FormGroup = new FormGroup({});
  templateFields: Array<FormlyFieldConfig> = [ this.survey_template ];

  ionViewWillEnter(){
    // this.resetFields(); URCITE NE // maze zaznamy
  }

  ionViewDidLoad() {
    // this.restartSurvey();
    // this.reloadFields();
    this.resetFields();
    console.log('ionViewDidLoad EDIT SURVEY');
    console.log(this.survey);
    console.log(this.templateData);
    console.log(this.survey_template);
    console.log(this.form);
    console.log(this.templateFields);

    console.log('indexOf');
    console.log(this.allsurveys.indexOf(this.survey))
    // this.form = new FormGroup({});
    // debugger;
  }

  ionViewWillUnload(){
    // this.resetFields(); //taky maze zaznamy
    console.log('this.templateFields');
    console.log(this.templateFields);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }



  submit(survey){
    console.log('bingo');
    console.log(this.survey);
    console.log(this.allsurveys);
    console.log(this.allsurveys.indexOf(this.survey))
    console.log(this.home);
    this.home.saveSurveys();
    this.navCtrl.pop();
    // this.home.saveSurveys().then(() => {
    //     this.resetFields();
    //   }
    // );

  }

  resetFields() {
    for (let i=0; i<this.templateFields[0].fieldGroup.length; i++){
      // this.templateFields[0].fieldGroup[i].formControl.reset();
      this.templateFields[0].fieldGroup[i].formControl.setValue(this.survey[this.templateFields[0].fieldGroup[i].key]);
      // debugger;
    }
  }

  restartSurvey(){
    // this.resetFields();
    // this.survey = {};
    // parent = this.navParams.get('parent');
    this.templateData = this.navParams.get('survey_template');
    this.title = this.templateData.title;
    this.survey_template = {fieldGroup: this.templateData.template_definition};
    this.form = new FormGroup({});
    this.templateFields = [ this.survey_template ];
  }

  reloadFields(){
    this.survey = this.navParams.get('survey');
    this.home = this.navParams.get('home');
    this.templateData = this.navParams.get('survey_template');
    this.allsurveys = this.navParams.get('allsurveys');
    this.title = this.survey.surveyTitle;

    // templateField: FormlyFieldConfig;
    // templateData = this.navParams.get('survey_template');
    // title = this.survey_template.title;
    this.survey_template = {fieldGroup: this.templateData[0].template_definition};
    this.form = new FormGroup({});
    this.templateFields = [ this.survey_template ];




  }

  // saveSurvey(){
  //   console.log(this.survey);
  // }

}
