
document.addEventListener("DOMContentLoaded", function() 
{
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const logoText = document.querySelector('.logo-text'); 
    const bracket = document.getElementById('bracket');
    const menuItems = document.querySelectorAll('.menu-item');
    
    navbar.style.animation = 'navSlide 2s ease-in-out forwards';
    logo.style.animation = 'logoToNav 3s ease-in-out forwards';
    
    navbar.addEventListener('animationend', function() {
    });
    
    let menuSwitch = false;
    
    logo.addEventListener('animationend', function() {     
        logoText.addEventListener('click', toggleMenu);
        bracket.addEventListener('click', toggleMenu);
        
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (menuSwitch) {
                    toggleMenu();
                }
            });
        });
        
        function toggleMenu() {
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
        }
    });
});
