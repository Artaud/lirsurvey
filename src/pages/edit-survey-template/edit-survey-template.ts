import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormlyFieldConfig } from 'ng-formly';
import { Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-edit-survey-template',
  templateUrl: 'edit-survey-template.html'
})
export class EditSurveyTemplatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.data);
    console.log(this.templateFields);
  }

  parent = this.navParams.get('parent');
  templateField: FormlyFieldConfig;
  templateData = this.navParams.get('survey_template');
  title = this.templateData.title;
  survey_template = {fieldGroup: this.templateData.template_definition};
  form: FormGroup = new FormGroup({});
  templateFields: Array<FormlyFieldConfig> = [ this.survey_template ];

  // TODO saveTemplate --- aby se ulozilo do stejneho key a neduplikovalo se ve storage

  saveTemplate(){
    this.parent.saveSurveyTemplate(this.title, this.survey_template);
    this.navCtrl.pop()
  }

}
