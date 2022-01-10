import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "./TeapotGeometry.js";
import { Teapot } from "./Teapot.js";
import { KeyboardState } from "./KeyboardState.js";

var scene, renderer, camera;
var pointLight;
var keyboard = new KeyboardState();
var turn = true;
var angle = 0;
var teapots = [];

function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x888888);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 160;
    camera.position.z = 200;

	let controls = new OrbitControls(camera, renderer.domElement);
    

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);

    pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 10));

		var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
		
    var count = 0;
    for(var i=-90; i<=101;i+=20)
    {
    	for(var j=-90; j<101;j+=20)
      {
      	teapots.push(new Teapot(i,j));
      	scene.add(teapots[count].mesh);
      	count++;
      }
    	
    }
    	
    
    
    
    
    
}

function animate() {
    keyboard.update();
    
    if (keyboard.down("Z")) turn = !turn;    
    if (turn) angle += 0.01;
    
    pointLight.position.set(70 * Math.cos(angle), 70, 70 * Math.sin(angle));   
    
    for(var i=0; i<teapots.length; i++){
    	teapots[i].mesh.material.uniforms.lightpos.value.copy (pointLight.position);
    	teapots[i].mesh.rotation.y = 1.3*angle;
    }
    
 
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.render(scene, camera);
}

export {init, animate};