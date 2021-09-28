import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//SCENE SETUP
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


//MATERIAL SETUP
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});

//JOIN FIGURES
const torus = new THREE.Mesh(geometry, material);


scene.add(torus);


//FOCAL LIGHT
const pointLight =  new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

//GENERAL LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);


//HELP YOU TO SEE WHERE IS THE LIGHT
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)


const controls = new OrbitControls(camera, renderer.domElement);

//ANIMATING THE TORUS OBJECT
function animate () {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.x += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();