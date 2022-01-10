import * as THREE from "https://threejs.org/build/three.module.js";
import { TeapotGeometry } from "./TeapotGeometry.js";

class Teapot{
	constructor(x,z){
  		var torusKnot = new THREE.Mesh(new TeapotGeometry (5),
    		new THREE.MeshPhongMaterial({
      	color: 0x7754ff
    	}));
  		torusKnot.scale.set(1, 1, 1);
  		torusKnot.position.set(x, 5, z);
      
      this.torus = torusKnot;
  }
}

export { Teapot };