import {Directive, ElementRef, Input} from '@angular/core';
// import { SettingsData } from '../../providers/data';

@Directive({
    selector: '[background-image]'
})
export class BackgroundImage {
    private el: HTMLElement;
    // private bkgImgUrl: string;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        // data.getBackgroundImageUrl().then(url => {
        //   this.bkgImgUrl = url;
        // });
    }

    @Input('background-image') backgroundImage: string;


    // ngAfterViewInit() {
    ngAfterViewChecked() {
        // if (this.bkgImgUrl === undefined) {
          this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
        //   console.log('was undefined');
        // } else {
        //   this.el.style.backgroundImage = 'url(' + this.bkgImgUrl + ')';
        //   console.log('was not undefined');
        //   console.log(this.bkgImgUrl);
        // }
    }

}