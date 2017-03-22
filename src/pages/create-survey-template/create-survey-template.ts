import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
import {AddTemplateFieldPage} from '../add-template-field/add-template-field';
/*
  Generated class for the CreateSurveyTemplate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-survey-template',
  templateUrl: 'create-survey-template.html'
})
export class CreateSurveyTemplatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {}

    parent = this.navParams.get('parent');

    title;
    templateField: FormlyFieldConfig;
    form: FormGroup = new FormGroup({});
    initFieldGroup = {
      fieldGroup: [
        {
          className: '',
          key: 'firstName',
          type: 'input',
          templateOptions: {
              type: 'input',
              label: 'First name',
              placeholder: 'First name'
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: '',
          key: 'lastName',
          type: 'input',
          templateOptions: {
              type: 'input',
              label: 'Last name',
              placeholder: 'Last name'
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: '',
          key: 'email',
          type: 'input',
          templateOptions: {
              type: 'email',
              label: 'Email address',
              placeholder: 'Enter email'
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
        {
          className: '',
          key: 'country',
          type: 'select',
          templateOptions: {
              options: [{
                label: 'Argentina',
                value: 'argentina'
              },{
                label: 'Brasil',
                value: 'brasil'
              }],
              type: 'select',
              label: 'Country',
              placeholder: ''
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        },
      ]};

    // Initial form fields
    templateFields: Array<FormlyFieldConfig> = [ this.initFieldGroup ];

    selectTemplateFieldToAdd(){
      let addModal = this.modalCtrl.create(AddTemplateFieldPage);
      addModal.onDidDismiss((newTemplateField) => {
        if(newTemplateField){
          this.addTemplateField(newTemplateField);
          console.log(newTemplateField);
        }
      });
      addModal.present();
    }

    addTemplateField(templateField){
      this.templateFields = [];
      this.initFieldGroup.fieldGroup.push(templateField);
      this.templateFields = [this.initFieldGroup];
      console.log(this.templateFields);
    }

    removeLastTemplateField(){
      let tfLen = this.templateFields[0].fieldGroup.length;
      this.templateFields[0].fieldGroup.splice(tfLen-1,1);
    }
    removeTemplateField(index){
      this.templateFields[0].fieldGroup.splice(index,1);
    }

    saveTemplate(){
      // console.log(this.templateFields);
      this.parent.saveSurveyTemplate(this.templateFields);
      this.navCtrl.pop()
    }

}
