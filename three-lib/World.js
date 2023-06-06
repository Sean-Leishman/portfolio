import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { Boids } from './components/boids/Boids';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { createComposer } from './systems/composer.js';

let camera, scene, renderer, loop, loadingManager, composerObj;

class World{
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        const resizer = new Resizer(container, camera, renderer);

        container.append(renderer.domElement);

        composerObj = createComposer(renderer, scene, camera);
        loop = new Loop(camera, scene, renderer, composerObj['composer']);

        const boids = new Boids(150);
        scene.add(boids.getGroup());
        loop.toUpdate.push(boids);
    
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        loadingScreen.addEventListener('transitionend', () => {
            event.target.remove();
        })
    }

    render() {
        //composer.render();
        renderer.render(scene, camera);
    }

    start(){
        loop.start();
    }

    stop(){
        loop.stop();
    }
}

export { World }