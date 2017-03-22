import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { FormlyFieldConfig } from 'ng-formly';
import { Utils } from '../../utils/utils.ts';

@Component({
  selector: 'page-add-template-field',
  templateUrl: 'add-template-field.html'
})
export class AddTemplateFieldPage {
  key;
  fieldType = "input";
  question;
  selectOptions = [];
  label;
  value;
  checkboxLabel;
  multicheckboxOptions = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {}

  saveTemplateField(){
    let newTemplateField = {
      key: Utils.toCamelCase(Utils.removeDiacritics(this.question)),
      type: this.fieldType,
      templateOptions: {
          type: this.fieldType,
          label: this.question,
          options: []
      },
    };

    switch (newTemplateField.type) {
      case 'input':
        // do nothing
        break;
      case 'textarea':
        // do nothing
        break;
      case 'select':
        this.selectOptions = this.addValueAccordingToLabel(this.selectOptions);
        newTemplateField.templateOptions.options = this.selectOptions;
        break;
      case 'checkbox':
        // do nothing
        break;
      case 'multicheckbox':
        this.multicheckboxOptions = this.addKeyAccordingToValue(this.multicheckboxOptions);
        newTemplateField.templateOptions.options = this.multicheckboxOptions;
        break;
    };

    console.log(newTemplateField.key);
    console.log("newTemplateField");
    console.log(newTemplateField);

    this.view.dismiss(newTemplateField);
  }

  addSelectOption(){
    this.selectOptions.push(
      {
        label: this.label,
        value: this.value
      }
    );
  }

  addMulticheckboxOption(){
    this.multicheckboxOptions.push({
      key: this.key,
      value: this.value
    });
  }

  addKeyAccordingToValue(multicheckboxOptionsArray){
    multicheckboxOptionsArray.forEach(function(arrayItem){
      arrayItem.key = Utils.toCamelCase(Utils.removeDiacritics(arrayItem.value));
    })
    return multicheckboxOptionsArray;
  }

  addValueAccordingToLabel(selectOptionsArray){
    selectOptionsArray.forEach(function(arrayItem){
      arrayItem.value = Utils.toCamelCase(Utils.removeDiacritics(arrayItem.label));
    })
    return selectOptionsArray;
  }

  close(){
    this.view.dismiss();
  }


}
