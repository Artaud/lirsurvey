import { Component } from '@angular/core';
import { Utils } from '../../utils/utils';

import { ModalController, NavController, NavParams, reorderArray, Platform, AlertController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { BuildDynamicFormPage } from '../build-dynamic-form/build-dynamic-form';
import { ShowFormlyFormPage } from '../show-formly-form/show-formly-form';
import { EditSurveyTemplatePage } from '../edit-survey-template/edit-survey-template';
import { EditSurveyPage } from '../edit-survey/edit-survey';
import { CreateSurveyTemplatePage } from '../create-survey-template/create-survey-template';
import { RunSurveyPage } from '../run-survey/run-survey';
import { ViewSurveyPage } from '../view-survey/view-survey';
import { ViewSurveyListPage } from '../view-survey-list/view-survey-list';
import { SettingsPage } from '../settings/settings';

import { TodoData } from '../../providers/data';
import { SurveyTemplateData } from '../../providers/data';
import { SurveyData } from '../../providers/data';
// import { Camera } from '@ionic-native/camera'
import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';

import { SettingsData } from '../../providers/data';

import { availableLanguages, sysOptions } from '../i18n/i18n.constants';
import { TranslateService } from 'ng2-translate';


// declare var cordova:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  public survey_templates = [];
  public surveys = [];
  public collapsedSurveys = {};
  public surveyTitles = [];
  public base64Image: string;
  storageDirectory: string = '';

  languages = availableLanguages;
  selectedLanguage = sysOptions.systemLanguage;
  // param = { value: 'world' };
  private translate: TranslateService;
  really_delete;
  really_delete_template;
  no;
  del;
  csv_saved;
  survey_data_saved;
  really_delete_survey_data;

  titleImageUrl: string = 'assets/img/LIRlogoinverse.png';
  bkgImageUrl: string = 'assets/img/stage2.jpg';
  // public testBkg: string = 'file:///storage/emulated/0/DCIM/Camera/IMG_20170531_164530.jpg';



  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public modalCtrl: ModalController, private navParams: NavParams, public todoDataService: TodoData, public surveyTemplateDataService: SurveyTemplateData, public surveyDataService: SurveyData, public settingsDataService: SettingsData, private file: File, translate: TranslateService) {

// ================= Constructor -- I18N ====================
// ===========================================================

  this.translate = translate;



// ================= Constructor -- FILES ====================
// ===========================================================
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        console.log("Not a cordova platform");
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        console.log("Android cordova> " + this.file);
        this.storageDirectory = this.file.externalRootDirectory;
        console.log("Android cordova storageDir> " + this.storageDirectory);
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
// ================= Constructor -- DATA ====================
// ===========================================
    // this.todoDataService.getData().then((todos) => {
    //   if(todos){
    //     this.items = JSON.parse(todos);
    //   }
    // });
    this.surveyTemplateDataService.getData().then((survey_templates) => {
      if(survey_templates){
        this.survey_templates = JSON.parse(survey_templates);
        console.log(this.survey_templates);
      }
    });
    this.surveyDataService.getData().then((surveys) => {
      if(surveys){
        this.surveys = JSON.parse(surveys);
        // console.log(this.surveys);
        this.collapseSurveys();
        // console.log("Surveys collapsed");
        // console.log(this.collapsedSurveys);
      }
    });
  }

// ================= LIFECYCLE METHODS ====================
// ===========================================

  ionViewDidLoad(){
    console.log(this.survey_templates);
  }

// ================= I18N ====================
// ===========================================

  applyLanguage() {
    this.translate.use(this.selectedLanguage);
  }

// ================= BKG IMG // LOGO ===========================
// =============================================================

  ionViewWillEnter(){
    this.settingsDataService.getBackgroundImageUrl().then(url => {
      console.log('ionViewWillEnter home, bkgimg url:' + url);
      if (url != null) {
        this.bkgImageUrl = url;
      }
      // this.file.resolveLocalFilesystemUrl(url).then(resolvedUrl => {
      //   console.log('bkg img resolved url');
      //   console.log(resolvedUrl.toURL);
      //   this.testBkg = resolvedUrl.toURL();
      // });
    });
    this.settingsDataService.getLogoUrl().then(url => {
      console.log('ionViewWillEnter home, logo url:' + url);
      if (url != null) {
        this.titleImageUrl = url;
      }
    });
  }

// ================= SURVEY TEMPLATES ====================
// =======================================================

  addSurveyTemplate(){
    this.navCtrl.push(CreateSurveyTemplatePage, {parent: this});
  }

  viewSurveyTemplate(){
    // do nothing as we never want to just view the template -- we always go to edit
  }

  editSurveyTemplate(e, survey_template){
    e.stopPropagation();
    this.navCtrl.push(EditSurveyTemplatePage, {
      survey_template: survey_template,
      parent: this
    });
  }

  saveSurveyTemplates(){
    this.surveyTemplateDataService.save(this.survey_templates);
  }

  saveSurveyTemplate(title, survey_template){
    let template_definition = this.extractTemplateDefinitionFromDOMObject(survey_template);
    // let title_jsonified = this.extractTemplateDefinitionFromDOMObject(title);
    console.log(title);
    console.log(template_definition);
    this.survey_templates.push({ title: title, template_definition: template_definition });
    this.saveSurveyTemplates();
  }
  extractTemplateDefinitionFromDOMObject(survey_template){
    let temp = survey_template[0].fieldGroup;
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
  deleteSurveyTemplate(e, survey_template){
    e.stopPropagation();
    this.translate.get('REALLY DELETE').subscribe(value => {this.really_delete = value;})
    this.translate.get('REALLY DELETE TEMPLATE', {title: survey_template.title}).subscribe(value => {this.really_delete_template = value;})
    this.translate.get('NO').subscribe(value => {this.no = value;})
    this.translate.get('DELETE').subscribe(value => {this.del = value;})

    let confirm = this.alertCtrl.create({
      title: this.really_delete,
      message: this.really_delete_template,
      buttons: [
        {
          text: this.no,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.del,
          handler: () => {
            this.deleteSurveys(survey_template.title);

            this.survey_templates.splice(this.survey_templates.indexOf(survey_template),1);
            this.saveSurveyTemplates();
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  reorderSurveyTemplates(indexes){
    this.survey_templates = reorderArray(this.survey_templates, indexes);
    this.saveSurveyTemplates();
  }
  exportSurveys(e, title){
    e.stopPropagation();

    this.translate.get('CSV SAVED').subscribe(value => {this.csv_saved = value;})
    this.translate.get('SURVEY DATA SAVED', {title: title, dir: this.storageDirectory}).subscribe(value => {this.survey_data_saved = value;})


    let selectedSurveys = this.surveys.filter(function(el){
        return el.surveyTitle == title;
      })

    console.log(selectedSurveys);

    if (selectedSurveys.length > 0){
      let csvSurveys = Utils.convertToCSV(selectedSurveys);
      this.platform.ready().then(() => {
        // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
        if(!this.platform.is('cordova')) {
          console.log("Would have saved the file...");
          console.log(csvSurveys);
          return false;
        } else {
          console.log("Saving file..." + csvSurveys);
          // File.checkFile(this.storageDirectory, 'LIR-' + title + '.csv').then((filePresent) => {
            // console.log(filePresent);
            // return filePresent;
          // }
          // File.checkDir(this.storageDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));

          this.file.removeFile(this.storageDirectory, 'LIR-' + title + '.csv').then(_ =>
            this.file.writeFile(this.storageDirectory, 'LIR-' + title + '.csv', csvSurveys, true)
          ).catch(err =>
            this.file.writeFile(this.storageDirectory, 'LIR-' + title + '.csv', csvSurveys, true)
          );
          // File.removeFile(this.storageDirectory, 'LIR-' + title + '.csv').then(_ =>
          //   File.writeFile(this.storageDirectory, 'LIR-' + title + '.csv', csvSurveys, true)
          // ).catch(err =>
          //   File.writeFile(this.storageDirectory, 'LIR-' + title + '.csv', csvSurveys, true)
          // );

        }
      });

      let confirm = this.alertCtrl.create({
        title: this.csv_saved,
        message: this.survey_data_saved,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              console.log('OK clicked');
            }
          }
        ]
      });
      confirm.present();
    }

    // File.checkDir(this.storageDirectory, 'LIR').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
    // File.createDir(this.storageDirectory, "LIR_dir", false);

  }

// ================= SURVEYS ====================
// ==============================================

  collapseSurveys(){
    this.collapsedSurveys = {};
    this.surveyTitles = [];

    let st = [];

    this.surveys.forEach(function(s){
      st.push(s.surveyTitle);
    });

    let stitles = this.collapsedSurveys;

    st.forEach(function(s){
      stitles[s] = (1 + stitles[s] || 1);
      // console.log(stitles);
    });

    this.surveyTitles = Object.keys(stitles);
  }

  startNewSurvey(e, survey_template){
    e.stopPropagation();
    this.navCtrl.push(RunSurveyPage, {parent: this, survey_template: survey_template});
  }

  saveSurvey(survey){
    this.surveys.push(survey);
    return this.saveSurveys();
  }
  saveSurveys(){
    var savePromise = this.surveyDataService.save(this.surveys);
    this.collapseSurveys();
    return savePromise;
  }

  // viewSurvey(e, survey){
  //   e.stopPropagation();

  //   let survey_template = this.survey_templates.filter(function(el){
  //     return el.title == survey.surveyTitle;
  //   })

  //   console.log(survey_template);

  //   this.navCtrl.push(ViewSurveyPage, {
  //     survey: survey,
  //     survey_template: survey_template
  //   });
  // }
  viewSurveyList(e, title){
    e.stopPropagation();

    let surveys = this.surveys.filter(function(el){
      return el.surveyTitle == title;
    })

    let survey_template = this.survey_templates.filter(function(el){
      return el.title == title;
    })

    this.navCtrl.push(ViewSurveyListPage, {
      title: title,
      surveys: surveys,
      survey_template: survey_template,
      allsurveys: this.surveys,
      parent: this
    });
  }

  // editSurvey(e, survey){
  //   e.stopPropagation();
  //   this.navCtrl.push(EditSurveyPage, {
  //     survey: survey
  //   });
  // }
  deleteSurvey(e, survey){
    e.stopPropagation();
    this.surveys.splice(this.surveys.indexOf(survey),1);
    this.saveSurveys();
  }
  deleteSurveysAsk(e, surveyTitle){
    e.stopPropagation();

    this.translate.get('REALLY DELETE').subscribe(value => {this.really_delete = value;})
    this.translate.get('REALLY DELETE SURVEY DATA', {title: surveyTitle}).subscribe(value => {this.really_delete_survey_data = value;})
    this.translate.get('NO').subscribe(value => {this.no = value;})
    this.translate.get('DEL').subscribe(value => {this.del = value;})


    let confirm = this.alertCtrl.create({
      title: this.really_delete,
      message: this.really_delete_survey_data,
      buttons: [
        {
          text: this.no,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.del,
          handler: () => {
            this.platform.ready().then(() => {
              // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
              let csvSurveys = Utils.convertToCSV(
                  this.surveys.filter(function(el){
                  return el.surveyTitle == surveyTitle;
                })
              );

              console.log('Agree clicked, saving backup file');

              if(!this.platform.is('cordova')) {
                console.log("Would have saved the file...");
                console.log(csvSurveys);
                return false;
              } else {
                console.log("Saving file..." + csvSurveys);
                this.file.removeFile(this.storageDirectory, 'LIR-' + surveyTitle + 'bak.csv').then(_ =>
                  this.file.writeFile(this.storageDirectory, 'LIR-' + surveyTitle + 'bak.csv', csvSurveys, true)
                ).catch(err =>
                  this.file.writeFile(this.storageDirectory, 'LIR-' + surveyTitle + 'bak.csv', csvSurveys, true)
                );
                this.file.writeFile;
              }
            });

            this.deleteSurveys(surveyTitle);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteSurveys(surveyTitle){
    let survs = this.surveys;
    let i = survs.length;

    while(i--){
      if (survs[i].surveyTitle == surveyTitle){
        survs.splice(survs.indexOf(survs[i]),1);
      }
    }
    this.saveSurveys();
  }

// ================= SETTINGS ====================
// ==============================================

  goToSettings(){
    this.navCtrl.push(SettingsPage, {parent: this});
    // this.takePicture();
    // this.selectPicture();
    // this.titleImageUrl = 'assets/img/stormlogo.png';
  }

  // goToShowFormlyForm(){
  //   this.navCtrl.push(ShowFormlyFormPage);
  // }
  // goToBuildForm(){
  //   this.navCtrl.push(BuildDynamicFormPage);
  // }

}