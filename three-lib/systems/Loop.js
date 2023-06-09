import { Clock } from "three";

class Loop {
  constructor(camera, scene, renderer, composer, stats, mouseHandler) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.composer = composer;
    this.stats = stats;
    this.mouseHandler = mouseHandler;
    this.toUpdate = [];

    this.tickArgs = {
      mousePosition: this.mouseHandler.getPosition(),
      boxMesh: null,
      mode: "boids",
      updateMode: this.updateMode.bind(this),
    };
    var img = document.getElementsByClassName("avatar-img")[0];
    img.addEventListener("click", this.mouseDown.bind(this));
  }

  mouseDown() {
    this.tickArgs.mode = "converge";
  }

  updateMode(mode) {
    this.tickArgs.mode = mode;
  }

  start() {
    requestAnimationFrame(this.start.bind(this));
    this.tick();

    this.render();
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  render() {
    this.composer.render();
    //this.renderer.render(this.scene, this.camera);
  }

  updateToUpdate(item) {
    this.toUpdate.push(item);
  }

  tick() {
    this.tickArgs.mousePosition = this.mouseHandler.getPosition();
    this.toUpdate.forEach((el) => el.tick(this.tickArgs));
  }
}

export { Loop };
