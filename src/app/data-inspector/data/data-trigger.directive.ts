import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { DataService } from './data.service';

@Directive({
  selector: '[diuDataTrigger]'
})
export class DataTriggerDirective {

  @Input() diuDataTrigger: string;
  transitionActive: boolean = false;

  constructor(private element: ElementRef, private renderer: Renderer2,private dataService: DataService) {
    this.dataService.topicNameEmitter.subscribe((name: string) => {
      if(this.diuDataTrigger == name && !this.transitionActive) {
        this.transitionActive = true;
        this.renderer.setStyle(this.element.nativeElement, 'opacity', 0.8);
        this.renderer.setStyle(this.element.nativeElement, 'transform', 'scale(0.95)');
        setTimeout(() => {
          this.renderer.setStyle(this.element.nativeElement, 'opacity', 1)
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'scale(1)')
          this.transitionActive = false;
        }, 270);
      }
    });
  }

}
