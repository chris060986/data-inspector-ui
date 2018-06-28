import { Component, OnInit } from "@angular/core";

@Component({
  selector: "diu-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  constructor() {}
  fullscreen: boolean = false;

  ngOnInit() {
    document.addEventListener(
      "fullscreenchange",
      () => {
        this.fullscreen = !this.fullscreen;
      },
      false
    );
    document.addEventListener(
      "mozfullscreenchange",
      () => {
        this.fullscreen = !this.fullscreen;
      },
      false
    );
    document.addEventListener(
      "webkitfullscreenchange",
      () => {
        this.fullscreen = !this.fullscreen;
      },
      false
    );
  }

  enterFullscreen() {
    let element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
