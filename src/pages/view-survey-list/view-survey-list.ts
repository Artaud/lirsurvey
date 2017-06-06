import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditSurveyPage } from '../edit-survey/edit-survey';
/*
  Generated class for the ViewSurveyList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-survey-list',
  templateUrl: 'view-survey-list.html'
})
export class ViewSurveyListPage {

  bkgImageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  parent = this.navParams.get('parent');
  title: string = this.navParams.get('title');
  surveys = this.navParams.get('surveys');
  allsurveys = this.navParams.get('allsurveys')
  survey_template = this.navParams.get('survey_template');

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewSurveyListPage');
  }
  ionViewWillEnter(){
    this.bkgImageUrl = this.parent.bkgImageUrl;
  }

  editSurvey(e, survey){
    e.stopPropagation();
    this.navCtrl.push(EditSurveyPage, {
      survey: survey,
      survey_template: this.survey_template,
      allsurveys: this.allsurveys,
      home: this.parent
    });
    console.log(survey);
  }



}
