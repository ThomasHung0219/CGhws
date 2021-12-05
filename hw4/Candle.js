import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main.js';

class Candle{
	constructor(x,z,c,b,f){
  		var candle = new THREE.Object3D();
  		let body = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 20, 6), new THREE.MeshPhongMaterial({
    color: 'white',
    side: THREE.DoubleSide
  }));
    	let light = new THREE.PointLight('white', 0.5);
  		candle.add(body);
  		candle.name = c;
  		body.position.y = 10;
  		body.name = b;
    	let loader = new THREE.TextureLoader();
  		// load a resource
  		let texture = loader.load( 'https://i.imgur.com/M2tr5Tm.png?1');
  		texture.wrapS = THREE.RepeatWrapping;
  		texture.wrapT = THREE.RepeatWrapping;
  		texture.repeat.set(1 / 3, 1 / 3);
  		texture.offset.set(0, 2 / 3);
  		var texMat = new THREE.MeshBasicMaterial({
        map: texture,
        alphaTest: 0.5
      });
      let flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), texMat);
  
  
      candle.add(flameMesh);
      flameMesh.name = f;
      scene.add(candle);
      flameMesh.position.y = 28;
      

      light.position.copy(flameMesh.position);
      
      light.castShadow = true;
      //light.position.y += 25;
      candle.add(light);
      candle.position.set(x,0.2,z);
      //pickables.push(candle);

  		this.candle = candle;
  		this.body = body;
  		this.light = light;
  		this.flameMesh = flameMesh;
      
  }
}

export { Candle };