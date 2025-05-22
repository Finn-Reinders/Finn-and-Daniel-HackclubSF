import * as THREE from 'three';

const canvas = document.getElementById('canvas');

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#121212');

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

//obj
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true, emissive: '#FFFFFF'});

const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

//lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(1, 1, 1);
scene.add(light);

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animation
function animate()
{
  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.001;
  dodecahedron.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();