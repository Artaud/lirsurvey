import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormlyFieldConfig } from 'ng-formly';
import { Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-run-survey',
  templateUrl: 'run-survey.html'
})
export class RunSurveyPage {

  bkgImageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  private survey: any = {};
  parent = this.navParams.get('parent');
  templateData = this.navParams.get('survey_template');
  title = this.templateData.title;
  survey_template = {fieldGroup: this.templateData.template_definition};
  form: FormGroup = new FormGroup({});
  surveyFields: Array<FormlyFieldConfig> = [ this.survey_template ];


  ionViewDidLoad() {
    // Reset all fields
    this.resetFields();
  }

  ionViewWillEnter(){
    this.bkgImageUrl = this.parent.bkgImageUrl;
  }

  submit(survey, form){
    console.log("submitting form");
    survey.surveyTitle = this.title;
    this.fillEmptyFields(survey);
    console.log(survey);
    var surveyTmp: any = JSON.parse(JSON.stringify(survey));
    this.parent.saveSurvey(surveyTmp).then(data => {
      this.restartSurvey();
    });
    // this.resetForm(form);
    // this.navCtrl.pop();
    // this.parent.startNewSurvey();
    // this.resetFields();
  }

  fillEmptyFields(survey){
    console.log("fillEmptyFields");

    let def = this.templateData.template_definition;

    for (let i=0; i<def.length; i++){
      // console.log(def[i].key);
      let k = def[i].key;
      // console.log(survey.hasOwnProperty(k));
      if (!(survey.hasOwnProperty(k))){
        survey[k] = "";
      }
    }
  }

  resetFields() {
    for (let i=0; i<this.surveyFields[0].fieldGroup.length; i++){
      this.surveyFields[0].fieldGroup[i].formControl.reset();
    }
  }

  restartSurvey(){
    this.survey = {};
    // parent = this.navParams.get('parent');
    this.templateData = this.navParams.get('survey_template');
    this.title = this.templateData.title;
    this.survey_template = {fieldGroup: this.templateData.template_definition};
    this.form = new FormGroup({});
    this.surveyFields = [ this.survey_template ];
    this.resetFields();
  }

  // resetFields(){
  //   this.form.reset();
  //   this.survey = {};
  // }

  // resetForm(form){
  //   // clearing inputs
  //   var inputs = form.getElementsByTagName('input');
  //   for (var i = 0; i<inputs.length; i++) {
  //       switch (inputs[i].type) {
  //           // case 'hidden':
  //           case 'text':
  //               inputs[i].value = '';
  //               break;
  //           case 'radio':
  //           case 'checkbox':
  //               inputs[i].checked = false;
  //       }
  //   }

  //   // clearing selects
  //   var selects = form.getElementsByTagName('select');
  //   for (var i = 0; i<selects.length; i++)
  //       selects[i].selectedIndex = 0;

  //   // clearing textarea
  //   var text= form.getElementsByTagName('textarea');
  //   for (var i = 0; i<text.length; i++)
  //       text[i].innerHTML= '';

  //   return false;
  // }
}
