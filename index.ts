import {
  OnInit,
  OnDestroy,
  Directive,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
declare var require: any;
// tslint:disable-next-line:no-var-requires
const elementResizeDetectorMaker = require('element-resize-detector');

@Directive({ selector: '[dimensions]' })
export class DimensionsDirective implements OnInit, OnDestroy {
  public observer: any;

  @Output() public onDimensionsChange = new EventEmitter<any>();

  constructor(public el: ElementRef) {}

  public ngOnInit() {
    const { nativeElement } = this.el;
    const { offsetWidth: width, offsetHeight: height } = nativeElement;
    const dimensions = { width, height };
    const event = new Event('dimensions');

    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(nativeElement, element => {
      const { offsetWidth, offsetHeight } = element;
      const detectedDimensions = { width, height };
      event['dimensions'] = detectedDimensions;
      this.onDimensionsChange.emit(event);
    });
  }

  public ngOnDestroy() {
    this.observer.uninstall(this.el.nativeElement);
  }
}

export default DimensionsDirective;
