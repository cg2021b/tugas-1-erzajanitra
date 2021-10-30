// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
// import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';

 let scene, camera, renderer;
        
        // set up the environment - 
        // initiallize scene, camera, objects and renderer
        let init = function() {
            // 1. create the scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xababab);
            
            // 2. create an locate the camera       
            camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 
                        1, 1000);
            camera.position.z = 5;
            
            // 3. create an locate the object on the scene           
            // ...
            
            // 4. create the renderer     
            renderer = new THREE.WebGLRenderer();   
            renderer.setSize(window.innerWidth, window.innerHeight);
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target.set(0,0,0)
            controls.update()
            document.body.appendChild(renderer.domElement);
          
        };
      
        
        // main animation loop - calls 50-60 in a second.
        let mainLoop = function() {
            console.log("Hello");
            renderer.render(scene, camera);
            requestAnimationFrame(mainLoop);
        };
        
        ///////////////////////////////////////////////
        init();
        mainLoop();