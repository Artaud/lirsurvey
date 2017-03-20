import { Component } from '@angular/core';

import { ModalController, NavController, NavParams, reorderArray } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { BuildDynamicFormPage } from '../build-dynamic-form/build-dynamic-form';
import { ShowFormlyFormPage } from '../show-formly-form/show-formly-form';
import { EditSurveyPage } from '../edit-survey/edit-survey';
import { CreateSurveyTemplatePage } from '../create-survey-template/create-survey-template';

import { TodoData } from '../../providers/data';
import { SurveyTemplateData } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public survey_templates = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private navParams: NavParams, public todoDataService: TodoData, public surveyTemplateDataService: SurveyTemplateData) {

    this.todoDataService.getData().then((todos) => {
      if(todos){
        this.items = JSON.parse(todos);
      }
    });
    this.surveyTemplateDataService.getData().then((survey_templates) => {
      if(survey_templates){
        this.survey_templates = JSON.parse(survey_templates);
      }
    });

  }

  ionViewDidLoad(){ }

  goToBuildForm(){
    this.navCtrl.push(BuildDynamicFormPage);
  }
  goToShowFormlyForm(){
    this.navCtrl.push(ShowFormlyFormPage);
  }

  addSurveyTemplate(){
    this.navCtrl.push(CreateSurveyTemplatePage, {parent: this});
  }

  viewSurveyTemplate(){
    // do nothing as we never want to just view the template -- we always go to edit
  }

  editSurveyTemplate(survey_template){
    this.navCtrl.push(EditSurveyPage, {
      survey_template: survey_template
    });
  }

  saveSurveyTemplates(){
    this.surveyTemplateDataService.save(this.survey_templates);
  }

  saveSurveyTemplate(survey_template){
    let template_definition = this.extractTemplateDefinitionFromDOMObject(survey_template);
    this.survey_templates.push(template_definition);
    this.saveSurveyTemplates();
  }

  extractTemplateDefinitionFromDOMObject(survey_template){
    // let temp_def = {fieldGroup: survey_template[0].fieldGroup};
    // let temp_def = survey_template;
    let temp = survey_template[0].fieldGroup;
    // debugger;

    // var i=0;
    let temp_def = [];
    for (var i=0; i < temp.length; i = i + 1) {

      temp_def[i] = {
        className: temp[i].className,
        key: temp[i].key,
        type: temp[i].type,
        templateOptions: temp[i].templateOptions
      }

    }

    return temp_def;
  }

  reorderSurveyTemplates(indexes) {
    this.survey_templates = reorderArray(this.survey_templates, indexes);
    this.saveSurveyTemplates();
  }


  addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if(item){
        this.saveItem(item);
      }
    });

    addModal.present();

  }

  saveItems(){
    this.todoDataService.save(this.items);
  }

  saveItem(item){
    this.items.push(item);
    this.saveItems();
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  reorderItem(indexes) {
    this.items = reorderArray(this.items, indexes);
    this.saveItems();
  }

}
