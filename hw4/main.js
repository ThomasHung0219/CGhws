import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { Candle } from "./Candle.js";

var camera, scene, renderer;
var flameMesh0,flameMesh1,flameMesh2,flameMesh3,flameMesh4;
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
  camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
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
  
  candles.push(new Candle(0,0,"c0","b0","f0"));
  candles.push(new Candle(50,50,"c1","b1","f1"));
  candles.push(new Candle(-30,-60,"c2","b2","f2"));
  candles.push(new Candle(-50,80,"c3","b3","f3"));
  candles.push(new Candle(70,-50,"c4","b4","f4"));
  
	
  window.addEventListener('resize', onWindowResize, false);

  raycaster = new THREE.Raycaster();
  document.addEventListener('pointerdown', onDocumentMouseDown, false);
  document.addEventListener('pointermove', onDocumentMouseMove, false);

	flameMesh0 = candles[0].flameMesh;
  flameMesh1 = candles[1].flameMesh;
  flameMesh2 = candles[2].flameMesh;
  flameMesh3 = candles[3].flameMesh;
  flameMesh4 = candles[4].flameMesh;
  
 	flameInterval0 = setInterval(textureAnimate0, 100);
  flameInterval1 = setInterval(textureAnimate1, 100);
  flameInterval2 = setInterval(textureAnimate2, 100);
  flameInterval3 = setInterval(textureAnimate3, 100);
  flameInterval4 = setInterval(textureAnimate4, 100);
  
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function textureAnimate0() {
  textureAnimate0.count = (textureAnimate0.count === undefined) ? 1 : textureAnimate0.count;

  if (flameMesh0 !== undefined) {
    var texture = flameMesh0.material.map;

    texture.offset.x += 1 / 3;

    if (textureAnimate0.count % 3 === 0) {
      texture.offset.y -= 1 / 3;
    }

    textureAnimate0.count++;
    
  }
}

function textureAnimate1() {
  textureAnimate1.count = (textureAnimate1.count === undefined) ? 1 : textureAnimate1.count;

  if (flameMesh1 !== undefined) {
    var texture = flameMesh1.material.map;
    
   
    texture.offset.x += 1 / 3;

    if (textureAnimate1.count % 3 === 0) {
      texture.offset.y -= 1 / 3;
    }

    textureAnimate1.count++;
    
  }
}

function textureAnimate2() {
  textureAnimate2.count = (textureAnimate2.count === undefined) ? 1 : textureAnimate2.count;

  if (flameMesh2 !== undefined) {
    var texture = flameMesh2.material.map;
    
   
    texture.offset.x += 1 / 3;

    if (textureAnimate2.count % 3 === 0) {
      texture.offset.y -= 1 / 3;
    }

    textureAnimate2.count++;
    
  }
}

function textureAnimate3() {
  textureAnimate3.count = (textureAnimate3.count === undefined) ? 1 : textureAnimate3.count;

  if (flameMesh3 !== undefined) {
    var texture = flameMesh3.material.map;
    
   
    texture.offset.x += 1 / 3;

    if (textureAnimate3.count % 3 === 0) {
      texture.offset.y -= 1 / 3;
    }

    textureAnimate3.count++;
    
  }
}

function textureAnimate4() {
  textureAnimate4.count = (textureAnimate4.count === undefined) ? 1 : textureAnimate4.count;

  if (flameMesh4 !== undefined) {
    var texture = flameMesh4.material.map;
    
   
    texture.offset.x += 1 / 3;

    if (textureAnimate4.count % 3 === 0) {
      texture.offset.y -= 1 / 3;
    }

    textureAnimate4.count++;
    
  }
}

function flameOn0(){
  clearInterval(Interval0);
	flameInterval0 = setInterval(textureAnimate0, 100);
  candles[0].flameMesh.material.visible = true;
  candles[0].light.visible = true;
}

function flameOn1(){
  clearInterval(Interval1);
	flameInterval1 = setInterval(textureAnimate1, 100);
  candles[1].flameMesh.material.visible = true;
  candles[1].light.visible = true;
}

function flameOn2(){
  clearInterval(Interval2);
	flameInterval2 = setInterval(textureAnimate2, 100);
  candles[2].flameMesh.material.visible = true;
  candles[2].light.visible = true;
}

function flameOn3(){
  clearInterval(Interval3);
	flameInterval3 = setInterval(textureAnimate3, 100);
  candles[3].flameMesh.material.visible = true;
  candles[3].light.visible = true;
}

function flameOn4(){
  clearInterval(Interval4);
	flameInterval4 = setInterval(textureAnimate4, 100);
  candles[4].flameMesh.material.visible = true;
  candles[4].light.visible = true;
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
    	 clearInterval(flameInterval0);
    	 candles[0].flameMesh.material.visible = false;
       candles[0].light.visible = false;
       Interval0 = setInterval(flameOn0, 3000);
    } 
    
    else if (intersects[0].object.name === "b1"||intersects[0].object.name === "f1"){
    	 clearInterval(flameInterval1);
    	 candles[1].flameMesh.material.visible = false;
       candles[1].light.visible = false;
       Interval1 = setInterval(flameOn1, 3000);
    } 
    
  	else if (intersects[0].object.name === "b2"||intersects[0].object.name === "f2"){
    	 clearInterval(flameInterval2);
    	 candles[2].flameMesh.material.visible = false;
       candles[2].light.visible = false;
       Interval2 = setInterval(flameOn2, 3000);
    } 
    
    else if (intersects[0].object.name === "b3"||intersects[0].object.name === "f3"){
    	 clearInterval(flameInterval3);
    	 candles[3].flameMesh.material.visible = false;
       candles[3].light.visible = false;
       Interval3 = setInterval(flameOn3, 3000);
    } 
    
    else if (intersects[0].object.name === "b4"||intersects[0].object.name === "f4"){
    	 clearInterval(flameInterval4);
    	 candles[4].flameMesh.material.visible = false;
       candles[4].light.visible = false;
       Interval4 = setInterval(flameOn4, 3000);
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