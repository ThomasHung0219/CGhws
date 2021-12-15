import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main_new.js';

class Candles{
	constructor(x,z,c,b,f,t){
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
	  let torch = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 3, 6), new THREE.MeshPhongMaterial({
    color: 'black',
    side: THREE.DoubleSide
  }));
	  torch.name = t;
	  torch.position.y = 20;
	  candle.add(torch);
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
		this.interval = setInterval (this.textureAnimate.bind(this), 100);	
		this.count = undefined;
		this.flame = true;
  }
  
  textureAnimate() {
	  this.count = (this.count === undefined) ? 1 : this.count;

	  if (this.flameMesh !== undefined) {
		var texture = this.flameMesh.material.map;

		texture.offset.x += 1 / 3;

		if (this.count % 3 === 0) {
		  texture.offset.y -= 1 / 3;
		}

		this.count++;
		
		}
	}
	
	flameOn(){
		clearInterval(this.off);
		this.interval = setInterval(this.textureAnimate.bind(this), 100);
	    this.flameMesh.material.visible = true;
	    this.light.visible = true;
		this.count = true;
	}
	
	flameOff(){
		if(this.count){
			clearInterval(this.interval);
			this.off = setInterval(this.flameOn.bind(this), 3000);
			this.flameMesh.material.visible = false;
			this.light.visible = false;
		}
		this.count = false;
	}
}

export { Candles };