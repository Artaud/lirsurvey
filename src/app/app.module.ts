import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { BuildFormPage } from '../pages/build-form/build-form';
import { BuildDynamicFormPage } from '../pages/build-dynamic-form/build-dynamic-form';
import { IonicStorageModule } from '@ionic/storage';
import { TodoData, SurveyTemplateData, SurveyData } from '../providers/data';

import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component'
import { DynamicFormQuestionComponent } from './dynamic-form-question.component'

import {BrowserModule} from '@angular/platform-browser';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly'
import { ShowFormlyFormPage } from '../pages/show-formly-form/show-formly-form';
import { EditSurveyPage } from '../pages/edit-survey/edit-survey';
import { CreateSurveyTemplatePage } from '../pages/create-survey-template/create-survey-template';
import { AddTemplateFieldPage } from '../pages/add-template-field/add-template-field';
import { RunSurveyPage } from '../pages/run-survey/run-survey';
import { Utils } from '../utils/utils.ts';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage,
    BuildFormPage,
    BuildDynamicFormPage,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ShowFormlyFormPage,
    EditSurveyPage,
    CreateSurveyTemplatePage,
    AddTemplateFieldPage,
    RunSurveyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemPage,
    ItemDetailPage,
    BuildFormPage,
    BuildDynamicFormPage,
    ShowFormlyFormPage,
    EditSurveyPage,
    CreateSurveyTemplatePage,
    AddTemplateFieldPage,
    RunSurveyPage
  ],
  providers: [Utils, TodoData, SurveyTemplateData, SurveyData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
