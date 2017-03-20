import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
/*
  Generated class for the ShowFormlyForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-formly-form',
  templateUrl: 'show-formly-form.html'
})
export class ShowFormlyFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

    form: FormGroup = new FormGroup({});

    userFields: FormlyFieldConfig = [{
      className: 'row',
      fieldGroup: [
        {
          className: 'col-xs-6',
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
        }, {
          className: 'col-xs-6',
          key: 'password',
          type: 'input',
          templateOptions: {
              type: 'password',
              label: 'Password',
              placeholder: 'Password',
              pattern: ''
          },
          validators: {
            validation: Validators.compose([Validators.required])
          }
        }, {
          className: 'col-md-4',
          key: 'select',
          type: 'select',
          templateOptions: {
            options: [{
              label: 'Male',
              value: 'male',
            }, {
              label: 'Female',
              value: 'female',
            }],
            label: 'Gender',
            placeholder: 'Select Gender',
          }
        }, {
          type: 'multicheckbox',
          key: 'interest',
          className: 'col-md-6',
          templateOptions: {
            options: [{
              key: 'sports',
              value: 'Sports',
            }, {
              key: 'movies',
              value: 'Movies',
            }, {
              key: 'others',
              value: 'Others',
            }],
            label: 'Interest',
            description: 'Select areas which you are interested',
          }
        }
      ]
    }];

  user = {
    email: 'email@gmail.com',
    select: 'male'
    // checked: false
  };

  submit(user) {
    console.log(user);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowFormlyFormPage');
  }

}