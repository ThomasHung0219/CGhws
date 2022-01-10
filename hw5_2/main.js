import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "./TeapotGeometry.js";
import { Teapot } from "./Teapot.js";

const vertexShader = `
varying vec2 vUv;
 void main() {
 gl_Position = projectionMatrix* modelViewMatrix * vec4( position, 1.0);
 vUv = uv;
 }`;
 
const fragmentShader = `
uniform sampler2D mytex;
 varying vec2 vUv;
 
 void main() {
   vec4 color = texture2D (mytex, vUv);
   if (color.r == 1.0 && color.g == 1.0)
   	  discard;
   else
   
      gl_FragColor = color;//texture2D (mytex, vUv);
   
 }`;


var scene, renderer, camera;
var pointLight;
var angle = 0;
var sceneRTT, torus, renderTarget;
var quad;
var teapots = [];


function init() {
	var width = window.innerWidth;
  var height = window.innerHeight;
	renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  camera.position.y = 200;
  camera.position.z = 240;

  let controls = new OrbitControls(camera, renderer.domElement);
  
	
  
  var ambientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambientLight);

  window.addEventListener('resize', onWindowResize, false);

  /////////////////////////////////////////////////////////

  sceneRTT = new THREE.Scene();
  pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(0, 300, 200);
  sceneRTT.add(pointLight);

  renderTarget = new THREE.WebGLRenderTarget(
    1024, 1024, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat
    }
  );
	
  var count = 0;
  for(var i=-90; i<=101;i+=20)
  {
      for(var j=-90; j<101;j+=20)
      {
          teapots.push(new Teapot(i,j));
          sceneRTT.add(teapots[count].torus);
          count++;
      }
    	
   }
  

	let plane = new THREE.PlaneBufferGeometry(300, 300);
  
    let rttmaterial = new THREE.ShaderMaterial({
    uniforms: {
      mytex: {
        type: "t",
        value: renderTarget.texture
      }
    },
    vertexShader,
    fragmentShader
  });


  quad = new THREE.Mesh(plane,
		rttmaterial);
    
	scene.add(quad);
  quad.position.set(0, 0, 0);
  //scene.add (new THREE.AxesHelper (50));
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {

	requestAnimationFrame(animate);
  angle += 0.005;
  
  for(var i=0; i<teapots.length; i++){
    	teapots[i].torus.rotation.y = 1.3*angle;
  }
    

  // render torusKnot to texture
  renderer.setRenderTarget (renderTarget);
  renderer.setClearColor(0xffffff);
  renderer.render(sceneRTT, camera);

  // render texture to quad
  renderer.setRenderTarget(null);
  renderer.setClearColor(0x888888);
  renderer.render(scene, camera);
  quad.lookAt (camera.position);
}

export {init, animate};