import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  Renderer2
} from "@angular/core";
import { GestureController } from "@ionic/angular";
import { Gesture, GestureConfig } from "@ionic/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements AfterViewInit {
  // tslint:disable-next-line: no-input-rename
  @Input("indicadorScroll") habilitado = true;
  @Input() title: string = 'titulo';
  state = "bottom";
  @Input() handleHeight = window.innerHeight - (window.innerHeight - 70); // altura inicial

  constructor(
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  async ngAfterViewInit() {
    const windowHeight = window.innerHeight;
    // const drawerHeight = windowHeight - this.handleHeight;
    const drawerHeight = 440 - this.handleHeight;
    // const drawerHeight = windowHeight - 118;

    const trigger = document.querySelector("#triggerSlider");
    console.log(trigger);

    this.renderer.setStyle(
      this.element.nativeElement,
      "top",
      windowHeight - this.handleHeight + "px"
    );

    const options: GestureConfig = {
      // el: document.querySelector('#header'),
      el: this.element.nativeElement,
      direction: "y",
      gestureName: "slide-drawer-swipe",
      onStart: ev => {
        // do something as the gesture begins
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "none"
        );
      },
      onMove: ev => {
        // do something in response to movement
        if (ev.deltaY < 0 && this.state === "bottom") {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(${ev.deltaY}px)`
          );
          this.renderer.addClass(trigger, "hide-indicador");
        } else if (this.state === "top") {
          // element size is -76 then deltaY subtraction. ex. calc (2 - 76) = -74 means downward movement.
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(calc(${ev.deltaY}px - ${drawerHeight}px))`
          );
        }
      },
      onEnd: ev => {
        // do something when the gesture ends
        this.renderer.setStyle(
          this.element.nativeElement,
          "transition",
          "0.3s ease-out"
        );
        if (ev.deltaY < -(windowHeight / 20) && this.state === "bottom") {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(-${drawerHeight}px)`
          );
          this.state = "top";
        } else if (ev.deltaY < windowHeight / 20 && this.state === "top") {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            `translateY(-${drawerHeight}px)`
          );
          this.state = "top";
        } else if (ev.deltaY > windowHeight / 20 && this.state === "top") {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            "translateY(0px)"
          );
          this.renderer.removeClass(trigger, "hide-indicador");
          this.state = "bottom";
        } else {
          this.renderer.setStyle(
            this.element.nativeElement,
            "transform",
            "translateY(0px)"
          );
          this.renderer.removeClass(trigger, "hide-indicador");
          this.state = "bottom";
        }
      }
    };
    const gesture: Gesture = await this.gestureCtrl.create(options);
    gesture.enable();
  }
}
