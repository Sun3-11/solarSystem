
//import * as THREE from './vendor_mode/three';
//import * as THREE from "../../node_modules/three/build/three.module.js"

//import { OrbitControls } from './vendor_mode/three/examples/jsm/controls/OrbitControls';


//import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";


//setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


//controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(90, 10, 10);


//stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.03, 25, 25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.Color(0x1F0825);
scene.background = spaceTexture;

//creat sun and planet


const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./img/sun.jfif')
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
           // map : textureLoader.load(ring.texture),
            map: textureLoader.load('./img/saturn ring.png'),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position ;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, './img/mercury.png', 28);
const venus = createPlanete(5.8, './img/venus.jpg', 44);
const earth = createPlanete(6, './img/earth.jpg', 62);
const mars = createPlanete(4, './img/mars.jpg', 78);
const jupiter = createPlanete(12, './img/jupiter.jpg', 100);
const saturn = createPlanete(10, './img/saturn.jfif', 138, {
    innerRadius: 10,
    outerRadius: 20,
    //saturn ring,
   texture: textureLoader.load('./img/saturn ring.png')
});

const uranus = createPlanete(7, './img/uranus.jpg', 176)/*, {
    innerRadius: 7,
    outerRadius: 12,
    // uranus ring
    
    //texture: new THREE.TextureLoader().load('img/uranus.png')
});*/
const neptune = createPlanete(7, './img/neptune.jpg', 200);
const pluto = createPlanete(2.8, './img/pluto.jpg', 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);




var cameraPivot = new THREE.Object3D();
sun.add(cameraPivot);
cameraPivot.add(camera);


// Scroll Animation
function moveCamera() {
  //const t = document.body.getBoundingClientRect().top;
  const t = document.body.getBoundingClientRect().bottom;
  console.log(moveCamera)
  camera.position.z = t * -0.1;
  console.log(camera.position.z) 
  
  camera.position.x = t * -0.0002;

 // camera.position.x = t * 0.2;
  camera.position.y = t * -0.0002;

  //camera.rotation.y = t * 0.02;
}

document.body.onscroll = moveCamera;

moveCamera();




// Animation Loop
function animate(){
  requestAnimationFrame( animate)
   cameraPivot.rotation.y += 0.001;
  cameraPivot.rotation.z += 0.001;
  cameraPivot.rotation.x -= 0.001;
 //sun.rotateY (0.004);

 //cameraPivot.rotation.y += 0.001;
//Self-rotation
sun.rotateY(0.004);
mercury.mesh.rotateY(0.004);
venus.mesh.rotateY(0.002);
earth.mesh.rotateY(0.02);
mars.mesh.rotateY(0.018);
jupiter.mesh.rotateY(0.04);
saturn.mesh.rotateY(0.038);
uranus.mesh.rotateY(0.03);
neptune.mesh.rotateY(0.032);
pluto.mesh.rotateY(0.008);

//Around-sun-rotation
mercury.obj.rotateY(0.04);
venus.obj.rotateY(0.015);
earth.obj.rotateY(0.01);
mars.obj.rotateY(0.008);
jupiter.obj.rotateY(0.002);
saturn.obj.rotateY(0.0009);
uranus.obj.rotateY(0.0004);
neptune.obj.rotateY(0.0001);
pluto.obj.rotateY(0.00007);



  controls.update();
 
  renderer.render(scene, camera);
}
animate();



window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

