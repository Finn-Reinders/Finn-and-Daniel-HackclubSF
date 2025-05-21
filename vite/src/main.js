import * as THREE from 'three';

const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#121212');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#FFFFFF', wireframe: true, emmissive: 0x00ff00 });

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
