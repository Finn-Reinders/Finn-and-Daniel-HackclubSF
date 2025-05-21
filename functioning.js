import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const monkeyUrl = new URL('./Models/Exports/2exportyboard.glb', import.meta.url);


document.addEventListener("DOMContentLoaded", function()
{


    { // Torus animation
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);   

    const light = new THREE.AmbientLight(0x404040);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
    scene.add(light);
    scene.add(torus);

    const clock = new THREE.Clock();
    let mixer;

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        if(mixer)
            mixer.update(clock.getDelta());
        renderer.render(scene, camera);
    }
    

    const assetLoader = new GLTFLoader();
    
    assetLoader.load(monkeyUrl.href, function(gltf) {
        const model = gltf.scene;
        scene.add(model);

        model.scale.set(7.5, 7.5, 7.5);
        model.position.set(0, -1, 0);
        model.rotation.set(0, Math.PI, 0);
        
        // Create mixer INSIDE the callback where model is defined
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
    // Progress callback
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Error callback
    function(error) {
        console.error('Error loading model:', error);
    });
    animate();
    }

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