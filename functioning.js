import * as THREE from 'https://cdn.skypack.dev/three@0.150.0';

document.addEventListener("DOMContentLoaded", function() 
{
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
