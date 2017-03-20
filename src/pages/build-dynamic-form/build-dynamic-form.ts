import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuestionService } from '../../app/question.service'

/*
  Generated class for the BuildDynamicForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-build-dynamic-form',
  templateUrl: 'build-dynamic-form.html',
  providers: [QuestionService]
})
export class BuildDynamicFormPage {
  questions: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, service: QuestionService) {
    // console.log(service.getQuestions);
    this.questions = service.getQuestions();

  }

}
