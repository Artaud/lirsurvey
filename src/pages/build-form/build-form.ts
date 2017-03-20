import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms'

/*
  Generated class for the BuildForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-build-form',
  templateUrl: 'build-form.html'
})
export class BuildFormPage {
  myForm: FormGroup;
  private myData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      'subject': '',
      'message': ''
    })
  }

  onSubmit(formData) {
    console.log('Form data is ', formData);
    this.myData = formData;
  }

}
