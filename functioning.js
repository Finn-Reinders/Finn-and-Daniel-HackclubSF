// Change this import to use a CDN URL
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

document.addEventListener("DOMContentLoaded", function()
{
    // THREE.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
        alpha: true // Makes background transparent
    });
    
    // Size for the renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    
    // Lighting
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(pointLight, ambientLight);
    
    // Add a grid helper to help visualize the scene
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);
    
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    
    scene.add(torus);
    
    function animate() {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // UI elements
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const bracket = document.getElementById('bracket');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // wanneer de pagina geladen is komt de animatie van de navbar en logo
    navbar.style.animation = 'navSlide 2s ease-in-out forwards';
    logo.style.animation = 'logoToNav 3s ease-in-out forwards';
    
    navbar.addEventListener('animationend', function() {
        // hier komen moet de opacity denk ik omhoog van de keyboards
    });
    
    let menuSwitch = false;
    logo.addEventListener('animationend', function() {     
        logo.addEventListener('click', function() {
            menuSwitch = !menuSwitch;
            if (menuSwitch) {
                bracket.classList.add("open");
                menuItems.forEach(item => {
                    item.classList.add("opened");
                });
            }
            else {
                bracket.classList.remove("open");
                menuItems.forEach(item => {
                    item.classList.remove("opened");
                });
            }
            console.log('clicked');
        });
    });
});
