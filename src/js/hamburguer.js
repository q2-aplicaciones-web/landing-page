

document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButtons = [...document.getElementsByClassName("mobile-menu-button")];
    console.log('Mobile menu buttons:', mobileMenuButtons);
    const headerNav = document.getElementById("header-nav");

    console.log('Mobile menu buttons found:', mobileMenuButtons.length);
    mobileMenuButtons.forEach((element) => {
        element.addEventListener("click", () => {
            console.log('Mobile menu button clicked');
            headerNav.toggleAttribute("isMobile");
            
            // Update the hamburger icon inside the button if it exists
            mobileMenuButtons.forEach(btn => {
                // Toggle icon between menu (☰) and close (✕)
                const isOpen = headerNav.hasAttribute("isMobile");
                if (btn.querySelector('svg')) {
                    // Keep the SVG but change visibility based on menu state
                    if (isOpen && btn.parentElement.className === 'user-buttons') {
                        // Hide the menu button in header when menu is open
                        btn.style.opacity = '0';
                    } else {
                        btn.style.opacity = '1';
                    }
                }
            });
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            headerNav.removeAttribute("isMobile");
            
            // Reset any styles we applied to hamburger buttons
            mobileMenuButtons.forEach(btn => {
                btn.style.opacity = '1';
            });
        }
    });
    
    console.log("DOM loaded, checking mobile menu buttons");
    if (mobileMenuButtons.length === 0) {
        console.error("No mobile menu buttons found! Check your HTML classes.");
    }
});