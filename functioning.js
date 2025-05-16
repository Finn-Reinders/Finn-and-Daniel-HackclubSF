document.addEventListener("DOMContentLoaded", function() 
{
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const bracket = document.getElementById('bracket');

    // wanneer de pagina geladen is komt de animatie van de navbar en logo
    navbar.style.animation = 'navSlide 2s ease-in-out forwards';
    logo.style.animation = 'logoToNav 3s ease-in-out forwards';

    navbar.addEventListener('animationend', function() {
        // hier komen moet de opacity denk ik omhoog van de keyboards
    });

    let menuSwitch = false;
    logo.addEventListener('animationend', function() {
        logo.addEventListener('mouseenter', function() {
            logo.style.transform = 'scale(1.1)';
        });

        logo.addEventListener('click', function() {
            menuSwitch = !menuSwitch;
            if (menuSwitch) {
            bracket.classList.add("open");
            }
            else {
                bracket.classList.remove("open");
            }
            console.log('clicked');
        });
    });
});