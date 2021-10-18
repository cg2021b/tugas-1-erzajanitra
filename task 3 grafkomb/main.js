

let scene, camera, renderer, light,plane;

//score
let scores=0, match=1, unmatch=-1;
let scoreElement = document.getElementById("score");

//cube management
let randomInRange = function(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
};
const colors=[0xe6e6fa, 0xffc0cb,0x649ed2,0x7ca070];   

const createGeometry = () => {
    const random_color= colors[Math.floor(randomInRange(0,4))];
    const material= new THREE.MeshPhongMaterial({color: random_color, shininess: 0.5});
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x=randomInRange(-30,30)
    cube.position.z=randomInRange(-10,30)
  
    scene.add(cube);
};

let selectedCubes=[];
let cubesColor=[];
//remove cube yg warnanya sama
const removeCube =()=>{
    let cube1 =selectedCubes[0].material.color.getHex();
    let cube2 =selectedCubes[1].material.color.getHex();

    if(cube1==cube2){
        selectedCubes.forEach(object => {
            console.log('match')
            object.geometry.dispose();
            object.material.dispose();
            scene.remove(object);
            renderer.renderLists.dispose();

        });
        scores+=match;
     
    }
    else if (cube1!=cube2){
        scores+= unmatch;
        console.log('unmatch')
    }
    if(scores<0) scores=0 //supaya UI scores ga minus
    scoreElement.innerHTML=scores;
    cubesColor=[];
    selectedCubes=[];
}
function hoverPieces(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    // mouse.z = 1;
    rayCast.setFromCamera(mouse, camera);
    rayCast.setFromCamera(mouse, camera);
    const intersects = rayCast.intersectObjects(scene.children);
    if(intersects){
        for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.transparent = true;
        intersects[i].object.material.opacity = 0.8;
        }
    }
    else{
         resetMaterials()
         console.log('unhovered')
        }
}
function resetMaterials(e) {
    for (let i = 0; i < scene.children.length; i++) {
      if (scene.children[i].material) {
        scene.children[i].material.opacity = scene.children[i].userData.currentSquare == selectedCubes ? 0.5 : 1.0;
      }
    }
}

//event listener : mouse click
let onMouseClick = function(e) {
   
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    // mouse.z = 1;
    rayCast.setFromCamera(mouse, camera);
    let intersects=rayCast.intersectObjects(scene.children,false)
    if (intersects[0]) {
        let cube1=intersects[0].object;
        if(selectedCubes.length>0){
            if(cube1.uuid===selectedCubes[0].uuid){
                cube1.material.emissive.setHex(0x0000);
                selectedCubes=[];
                cubesColor=[];
                return;
            }
        }
        selectedCubes.push(cube1);
        cubesColor.push(cube1.material.color.getHex());
        if(selectedCubes.length>1){
            removeCube();
        }
     
 } }

    let lighting = function(){
        const skyColor = 0xe5dad7;  
        const groundColor = 0x423835;  
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
        const dLight = new THREE.DirectionalLight( 0000, 1, 100 );
        dLight.position.set( 0, 0.5, 0 ); //default; dLight shining from top
        dLight.castShadow = true; // default false
        scene.add( dLight );
    }  
    //UI
      
    let floorplane=function(){
        plane = new THREE.Mesh(
        new THREE.PlaneGeometry(70,70, 10,10),
        new THREE.MeshPhongMaterial({color: 0xe7f4f4, wireframe:false, shininess:0.8}));
        plane.rotation.x -= Math.PI / 2; // Rotate the floor 90 degrees
        plane.position.y=-3
        scene.add(plane);
    }   
    
    // set up the environment - 
    // initiallize scene, camera, objects and renderer
    let init = function() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x7f5e55);
        camera = new THREE.PerspectiveCamera(75, 
                        window.innerWidth / window.innerHeight, 
                        1, 1000);
        camera.position.set(0, 10, 52);
        
        lighting()
        floorplane()
        for(let i = 0; i <30; i++) {
            createGeometry();
        } 

        rayCast = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = mouse.y = -1;
        // hoverPieces()
        // 4. create the renderer   
        renderer = new THREE.WebGLRenderer();   
        renderer.setSize(window.innerWidth, window.innerHeight);
	    const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0,0,0)
        controls.update()
        document.body.appendChild(renderer.domElement);
        document.addEventListener('click', onMouseClick,false);
    };
   
    
    // main animation loop - calls 50-60 times per second.
    let speed=0.002,addSpeed=0
    let mainLoop = function() {
        if(scene.children.length>=40){
            //berhenti tambah cube kalau jumlah cube sudah mencapai 40
            addSpeed=0
            speed=0
            scoreElement.innerHTML=scores
        }
        else addSpeed+=speed 
        if(addSpeed>0.02){
            createGeometry()
            addSpeed=0
            speed+=0.002
        }
        const clock= new THREE.Clock();
        const elapsedTime = clock.getElapsedTime()
        
        if(selectedCubes.length>0)
            selectedCubes[0].material.emissive.setHex(elapsedTime % 0.5 >= 0.25 ? original[0]: 0000)
        
        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
        
    }
    
    ///////////////////////////////////////////////
    init();
    mainLoop();
