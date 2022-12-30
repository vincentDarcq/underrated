import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-qui-sommes-nous',
  templateUrl: './qui-sommes-nous.component.html',
  styleUrls: ['./qui-sommes-nous.component.scss']
})
export class QuiSommesNousComponent implements OnInit, AfterViewInit {

  @Output() height = new EventEmitter();

  @ViewChild('component')
  component: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.height.emit(this.component.nativeElement.offsetHeight);
  }
}
