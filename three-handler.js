import * as THREE from "three";
import update_boids from "./boids.js";

let renderer, canvas, parent, camera, frustum, scene, clock, raycaster;

const cursor = { x: 0, y: 0 };

async function init(hdrmap, hdrEquirect) {
    

    canvas = document.querySelector("canvas.webgl");
    parent = document.querySelector(".container");
  
    const manager = new THREE.LoadingManager();
    const loading_screen = document.getElementById('loading-screen');
    loading_screen.classList.add( 'fade-out' );
    loading_screen.addEventListener( 'transitionend', onTransitionEnd );
    // Per
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 250;
  
    frustum = new THREE.Frustum();
    frustum.setFromMatrix(
      new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    );
  
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x212121);
  
    clock = new THREE.Clock();
    raycaster = new THREE.Raycaster();
  
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    //renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //renderer.toneMappingExposure = 1;
    //renderer.outputEncoding = THREE.sRGBEncoding;
  
    //envmaploader = new THREE.PMREMGenerator(renderer);
    //envmap = envmaploader.fromCubemap(hdrmap);
  
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 2);
    const spotLight = new THREE.SpotLight(0xffa05c, 2);
    spotLight.position.set(-200, 200, 200);
    spotLight.castShadow = true;
  
    scene.add(hemiLight);
    scene.add(spotLight);
  
    //scene.background = hdrEquirect;
    //scene.environment = hdrEquirect;
  
    scene.number_of_spheres = 250;
  
    // Sphere to contain boids
    const contain_geometry = new THREE.BoxGeometry(500, 200, 200);
    const object = new THREE.Mesh(
      contain_geometry,
      new THREE.MeshBasicMaterial()
    );
    object.visible = false;
    object.position.z = 50;
    object.name = "Containment Box";
    scene.add(object);
  
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    //const geometry = THREE.BufferGeometryUtils.fromGeometry(sphere);
    for (let i = 0; i < scene.number_of_spheres; i++) {
      generateBall(geometry);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

  }


  async function animate() {
    requestAnimationFrame(animate);
    animate_ball_motion(true);

    render();
  }

  function render() {
    renderer.render(scene, camera);
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  
    if (canvas.clientWidth < 700){
      scene.toDisplay = false;
    }
    else{
      scene.toDisplay = true;
    }
  }

  function generateBall(geometry) {
    const material = {
      color: 0x8418ca,
    };
    const object = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial(
        //{ color: Math.random() * 0xffffff }
        material
      )
    );
    object.scale.set(1, 1, 1);
    object.position.x = Math.random() * 300 - 150;
    object.position.y = Math.random() * 300 - 150;
    object.position.z = Math.random() * 300 - 150;
  
    object.original_scale = {
      x: object.scale.x,
      y: object.scale.y,
      z: object.scale.z,
    };
  
    object.name = "Sphere";
    object.velocity = new THREE.Vector3(
      2 * (Math.random() - 0.5),
      2 * (Math.random() - 0.5),
      2 * (Math.random() - 0.5)
    );
    object.ballsHeld = [];
  
    scene.add(object);
  
    return object;
  }

  function animate_ball_motion(is_boid_mode) {
    frustum.setFromMatrix(
      new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    );
    if (is_boid_mode)
      update_boids(
        scene,
        scene.children.filter((child) => {
          return child.name == "Sphere" && child.visible;
        })
      );
    scene.children.forEach((child) => {
      if (child.name == "Sphere" && child.visible) {
        child.position.x = child.position.x + child.velocity.x;
        child.position.y = child.position.y + child.velocity.y;
        if (child.position.z > -400 || is_boid_mode) {
          child.position.z = child.position.z + child.velocity.z;
        }
  
        // Checks sphere is in view
        if (!frustum.containsPoint(child.position)) {
          child.velocity.x = child.velocity.x * -1;
          child.velocity.y = child.velocity.y * -1;
        }
      }
    });
  }

  function onTransitionEnd( event ) {

	event.target.remove();
	
}

function onResize() {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function onMouseMove(event) {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
  }
  
export { init, animate };