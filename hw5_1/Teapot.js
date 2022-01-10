import * as THREE from "https://threejs.org/build/three.module.js";
import { TeapotGeometry } from "./TeapotGeometry.js";
//import {fragmentShader} from './myFragmentShader.glsl';
//import {vertexShader} from './myVertexShader.glsl';

const vertexShader = `
uniform vec3 lightpos;  // world coordinate
varying vec3 eyelightdir;
varying vec3 eyenormal;   
varying vec4 eyepos;
    
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  eyepos = modelViewMatrix * vec4 (position, 1.0);
  vec4 eyelightpos= viewMatrix * vec4 (lightpos, 1.0);
  eyelightdir =  eyelightpos.xyz - eyepos.xyz;
  eyenormal = normalMatrix * normal;
}`;

const fragmentShader = `
varying vec3 eyelightdir;
varying vec3 eyenormal;
varying vec4 eyepos;
    
void main() {
    float intensity = dot (normalize (eyenormal), normalize (eyelightdir));         
	if (intensity > 0.8)
        intensity = 0.8;
    else if (intensity > 0.4)
        intensity = 0.4;
    else
        intensity = 0.0;
    vec3 diffuse = intensity*vec3 (1,1,1);
    
    vec3 h = normalize(-normalize (eyepos.xyz) + normalize (eyelightdir));
    float shininess = 40.;    
    vec3 specular = pow (dot (eyenormal, h), shininess) *vec3 (1,0,0);
    //gl_FragColor = vec4(diffuse + specular, 1.0);
    gl_FragColor = vec4 (diffuse + vec3(0,0,0.13), 1.0);
    }`;
	


class Teapot{
	constructor(x,z){
  	var meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
        lightpos: {type: 'v3', value: new THREE.Vector3()}
        },
        vertexShader,
        fragmentShader
    });

    
    //var geometry = new THREE.TorusKnotGeometry(20, 5, 100, 16);
    var geometry = new TeapotGeometry (5);
    var mesh = new THREE.Mesh(geometry, meshMaterial);
    
    
    mesh.position.set (x, 5, z);
    
    //mesh.rotation.y = Math.PI/2;
    
    this.mesh = mesh;
    
  }
}

export { Teapot };