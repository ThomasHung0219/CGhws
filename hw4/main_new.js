import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { Candles } from "./Candles.js";

var camera, scene, renderer;
var pickables = [];
var candles = [];
var mouse = new THREE.Vector2();
var raycaster;


function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0x888888);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0,80,250);

  let controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);


  var floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({
    color: 'gray',
    side: THREE.DoubleSide
  }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  //scene.add (new THREE.GridHelper(200,20,'red','white'));
  ////////////////////////////////////////////////////////////
  
  candles.push(new Candles(0,0,"c0","b0","f0","t0"));
  candles.push(new Candles(50,50,"c1","b1","f1","t1"));
  candles.push(new Candles(-30,-60,"c2","b2","f2","t2"));
  candles.push(new Candles(-50,80,"c3","b3","f3","t3"));
  candles.push(new Candles(70,-50,"c4","b4","f4","t4"));
  
	
  window.addEventListener('resize', onWindowResize, false);

  raycaster = new THREE.Raycaster();
  document.addEventListener('pointerdown', onDocumentMouseDown, false);
  document.addEventListener('pointermove', onDocumentMouseMove, false);

  
  
  pickables.push(candles[0].candle);
  pickables.push(candles[1].candle);
  pickables.push(candles[2].candle);
  pickables.push(candles[3].candle);
  pickables.push(candles[4].candle);
  
  
  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}



function animate() {
  requestAnimationFrame(animate);
  
  render();

  // billboard
  // candle.lookAt (camera.position)  // does not work
  candles[0].candle.lookAt(camera.position.x, 0, camera.position.z);
  candles[1].candle.lookAt(camera.position.x, 0, camera.position.z);
  candles[2].candle.lookAt(camera.position.x, 0, camera.position.z);
  candles[3].candle.lookAt(camera.position.x, 0, camera.position.z);
  candles[4].candle.lookAt(camera.position.x, 0, camera.position.z);
  
}

function onDocumentMouseDown(event) {

  // PICKING DETAILS: 
  // convert mouse.xy = [-1,1]^2 (NDC)
  // unproject (mouse.xy, 1) to a point on the far plane (in world coordinate)
  // set raycaster (origin, direction)
  // find intersection objects, (closest first) 
  // each record as
  // [ { distance, point, face, faceIndex, object }, ... ]

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // find intersections
  /* old style
    var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );
	raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
    */
  // new style
  raycaster.setFromCamera(mouse, camera);

  // if recursive set to true, can go deeper into object3D hierarchy 
   var intersects = raycaster.intersectObjects( pickables, true );
  // var intersects = raycaster.intersectObjects(pickables);
  
  if (intersects.length > 0) {
    if (intersects[0].object.name === "b0"||intersects[0].object.name === "f0"){
    	candles[0].flameOff();
    } 
    
    else if (intersects[0].object.name === "b1"||intersects[0].object.name === "f1"){
    	candles[1].flameOff();
    } 
    
  	else if (intersects[0].object.name === "b2"||intersects[0].object.name === "f2"){
    	candles[2].flameOff();
    } 
    
    else if (intersects[0].object.name === "b3"||intersects[0].object.name === "f3"){
    	candles[3].flameOff();
    } 
    
    else if (intersects[0].object.name === "b4"||intersects[0].object.name === "f4"){
    	candles[4].flameOff();
    } 
  }

}

/////////////////////////////////////////////////////
// change cursor style
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(pickables);

  if (intersects.length > 0) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'auto';
  }
}

function render() {
  renderer.render(scene, camera);
}

export {init, animate, scene};