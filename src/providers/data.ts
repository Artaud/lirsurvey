import { Storage } from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class TodoData {
  constructor(public storage: Storage){}

  getData() {
    return this.storage.get('todos');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('todos', newData);
  }
}

@Injectable()
export class SurveyTemplateData {
  constructor(public storage: Storage){}

  getData() {
    return this.storage.get('survey_templates');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('survey_templates', newData);
  }
}

@Injectable()
export class SurveyData {
  constructor(public storage: Storage){}

  getData() {
    return this.storage.get('surveys');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('surveys', newData);
  }
}