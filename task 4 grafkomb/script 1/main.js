import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
// yg belum : fog, skybox,reflective 
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});
 
  //camera
  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.set(0, 10, 20);
  const sphereCamera = new THREE.CubeCamera(1, 1000, 500);
  sphereCamera.position.set(0, 3, 0);
  //control
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0,0,0)
  controls.update()

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
  
    //reflective
    // let sphereMaterial = new THREE.MeshBasicMaterial();
    // let sphereGeo =  new THREE.SphereGeometry(50);
    // let sphereMaterial = new THREE.MeshBasicMaterial( {envMap: sphereCamera.renderTarget} );
    // let mirrorSphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    // mirrorSphere.position.set(5, 0, 0);
    // scene.add(mirrorSphere);
    // scene.add(sphereCamera);
    
  }
  
  {
    	
    // scene.fog = new THREE.FogExp2(0xfff, 0.5);
    //shadow
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity1 = 0.1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity1);
    // scene.add(light);

    const color = 0xFFFFFF;
    const intensity = 0.3;
    const lightDir = new THREE.DirectionalLight(color, intensity);
    lightDir.position.set(5, 10, 2);
    scene.add(lightDir);
    scene.add(lightDir.target);
    lightDir.shadow.mapSize.width = 512; // default
    lightDir.shadow.mapSize.height = 512; // default
    lightDir.shadow.camera.near = 0.5; // default
    lightDir.shadow.camera.far = 500; // default
  }

  

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
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/task 4 grafkomb/neko/scene.gltf', (gltf) => {
    const root = gltf.scene;
    scene.add(root);
    
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
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    // sphereCamera.update( renderer, scene );
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
