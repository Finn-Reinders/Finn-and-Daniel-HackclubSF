// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add a simple background color
scene.background = new THREE.Color(0xeeeeee);

// Create a simple cube (placeholder for your model)
const geometry = new THREE.BoxGeometry(1, 1, 1);  // Dimensions of the cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a simple sphere (another placeholder)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);  // Radius and segments
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });  // Red color
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, 0);  // Position it next to the cube
scene.add(sphere);

// Create a simple plane (placeholder for ground or background)
const planeGeometry = new THREE.PlaneGeometry(5, 5);  // Size of the plane
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });  // Blue color
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;  // Rotate the plane to lie flat
scene.add(plane);

// Move the camera back a bit
camera.position.z = 5;

// Animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);

  // Optional: rotate the objects for effect
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.x += 0.02;
  sphere.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
