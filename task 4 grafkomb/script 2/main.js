import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';

// yg belum : fog, skybox,reflective 
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
  //camera
  let sphereCamera 
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 10, 20);
   
  //control
  const controls = new OrbitControls(camera, canvas);
  // controls.enableZoom = false;
	controls.enablePan = false;
	controls.enableDamping = true;
	controls.rotateSpeed = - 0.5;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');
 
  //fog
  const near = 30;
  const far = 45;
  const color = 'lightblue';
  scene.fog = new THREE.Fog(color, near, far);
 
 
  {
    //reflective
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
    sphereCamera = new THREE.CubeCamera(1,500,cubeRenderTarget);
    sphereCamera.position.set(0, 3, 0);
    scene.add(sphereCamera);
    const sphereMirror = new THREE.MeshBasicMaterial({
      envMap: sphereCamera.renderTarget,
    });
    const sphereGeo = new THREE.SphereGeometry(1.5, 32 , 16);
    const mirrorBall = new THREE.Mesh( sphereGeo, sphereMirror);
    mirrorBall.position.y =6;
    mirrorBall.position.x = -3;
    scene.add(mirrorBall);

    function createCube(color, x) {
      const geometry = new THREE.SphereGeometry(1.5);
      const material = new THREE.MeshBasicMaterial({envMap: sphereCamera.renderTarget});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = x;
      cube.position.y = 8;
      return cube;
    }
   
    const cubes = [
      // createCube( 0x44aa88,  -2),
      // createSphere( 0x44aa88,  2)
    ];
  }
  {
    //lighting
    const skyColor = 0xfffff;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity1 =1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity1);
    scene.add(light);

    const color = 0xFFFFFF;
    const intensity = 0.8;
    const lightDir = new THREE.DirectionalLight(color, intensity);
    scene.add(lightDir);
    
  }

  //skybox
    const geometry = new THREE.SphereGeometry( 20, 20, 20 );
				// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale( - 1, 1, 1 );
		const texture = new THREE.TextureLoader().load( '/task 4 grafkomb/textures/sky.jpg' );
		const material = new THREE.MeshBasicMaterial( { map: texture } );
  	const mesh = new THREE.Mesh( geometry, material );
	  scene.add( mesh );    


  function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
    const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
    const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
    const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

    const direction = (new THREE.Vector3())
        .subVectors(camera.position, boxCenter)
        .multiply(new THREE.Vector3(1, 0, 1))
        .normalize();

    camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

    camera.near = boxSize / 100;
    camera.far = boxSize * 100;

    camera.updateProjectionMatrix();

    camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  }

  {
    //loading gltf model
    const gltfLoader = new GLTFLoader();
      gltfLoader.load('/task 4 grafkomb/forest/scene.gltf', (gltf) => {
      const root = gltf.scene;
      scene.add(root);
        
      // compute the box that contains all the stuff
      // from root and below
      const box = new THREE.Box3().setFromObject(root);
      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // set the camera to frame the box
      frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.update();
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    // time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
  
    renderer.render(scene, camera);
    sphereCamera.update( renderer, scene );
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
