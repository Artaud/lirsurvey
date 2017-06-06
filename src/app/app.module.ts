import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Utils } from '../utils/utils.ts';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { BrowserModule } from '@angular/platform-browser';

import { IonicStorageModule } from '@ionic/storage';
import { TodoData, SurveyTemplateData, SurveyData, SettingsData } from '../providers/data';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly'
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component'
import { DynamicFormQuestionComponent } from './dynamic-form-question.component'

import { HomePage } from '../pages/home/home';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { BuildFormPage } from '../pages/build-form/build-form';
import { BuildDynamicFormPage } from '../pages/build-dynamic-form/build-dynamic-form';
import { ShowFormlyFormPage } from '../pages/show-formly-form/show-formly-form';
import { EditSurveyPage } from '../pages/edit-survey/edit-survey';
import { EditSurveyTemplatePage } from '../pages/edit-survey-template/edit-survey-template';
import { CreateSurveyTemplatePage } from '../pages/create-survey-template/create-survey-template';
import { AddTemplateFieldPage } from '../pages/add-template-field/add-template-field';
import { RunSurveyPage } from '../pages/run-survey/run-survey';
import { ViewSurveyPage } from '../pages/view-survey/view-survey';
import { ViewSurveyListPage } from '../pages/view-survey-list/view-survey-list';
import { SettingsPage } from '../pages/settings/settings';

import { BackgroundImage } from '../components/backgroundImage/backgroundImage.ts'

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
    EditSurveyTemplatePage,
    CreateSurveyTemplatePage,
    AddTemplateFieldPage,
    RunSurveyPage,
    ViewSurveyPage,
    ViewSurveyListPage,
    SettingsPage,
    BackgroundImage
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
    EditSurveyTemplatePage,
    CreateSurveyTemplatePage,
    AddTemplateFieldPage,
    RunSurveyPage,
    ViewSurveyPage,
    ViewSurveyListPage,
    SettingsPage
  ],
  providers: [File, FilePath, Camera, Utils, TodoData, SurveyTemplateData, SurveyData, SettingsData, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
