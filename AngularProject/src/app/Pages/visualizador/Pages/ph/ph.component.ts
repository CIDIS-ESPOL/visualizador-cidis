import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ph',
  templateUrl: './ph.component.html',
  styleUrls: ['./ph.component.scss']
})
export class PhComponent implements OnInit {

  @Input()

  sensor: string = ""

  srcInicio:string = "";
  srcHistorico:string = "";

  urlSafeInicio!: SafeResourceUrl;
  urlSafeHistorico!: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  
    this.sensor = ""

    this.srcInicio = ""
    this.srcHistorico = ""

    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcInicio);
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHistorico);
  }

}
