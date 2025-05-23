import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('canvas');

// Scene needs to be defined BEFORE you use it
const scene = new THREE.Scene();
scene.background = new THREE.Color('#121212');

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(1, 1, 1);
scene.add(light);

// Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Clock for animations
const clock = new THREE.Clock();
let mixer;

// Model loading
const monkeyUrl = new URL('./Models/Exports/2exportyboard.glb', import.meta.url);
const assetLoader = new GLTFLoader();

assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    model.scale.set(7.5, 7.5, 7.5);
    model.position.set(0, -1, 0);
    model.rotation.set(0, Math.PI, 0);
    
    // Animation setup - properly nested in the callback
    if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        
        clips.forEach(function(clip) {
            const originalDuration = clip.duration;
            const targetDuration = 200/60;
            const timeScale = originalDuration / targetDuration;
            const action = mixer.clipAction(clip);
            action.timeScale = timeScale;
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
        });
    }
}, 
// Add progress and error handlers
undefined, 
function(error) {
    console.error('An error happened while loading the model:', error);
});

// Add simple shape
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshBasicMaterial({ color: '#000000', wireframe: true, emissive: '#FFFFFF'});
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update animations
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  
  dodecahedron.rotation.x += 0.001;
  dodecahedron.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();