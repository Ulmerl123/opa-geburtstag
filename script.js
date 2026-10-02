document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initializes the AOS (Animate On Scroll) library with custom settings.
     *
     * This function ensures that elements with `data-aos` attributes
     * animate as they come into the viewport.
     *
     * @returns {void}
     */
    const initializeAOS = () => {
        try {
            AOS.init({
                duration: 1200, // Animation duration in ms
                easing: 'ease-out-cubic', // Easing function
                once: true, // Whether animation should happen only once - useful for intro
                mirror: false, // Whether elements should animate out while scrolling past them
                offset: 100, // Offset (in px) from the original trigger point
            });
            console.log('AOS initialized successfully.');
        } catch (error) {
            console.error('Error initializing AOS:', error);
            // Fallback or graceful degradation can be implemented here if AOS fails
        }
    };

    /**
     * Updates the copyright year in the footer to the current year.
     *
     * This ensures the copyright notice is always up-to-date.
     *
     * @returns {void}
     */
    const updateCopyrightYear = () => {
        try {
            const currentYearElement = document.getElementById('currentYear');
            if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear().toString();
                console.log('Copyright year updated.');
            } else {
                console.warn('Element with id "currentYear" not found. Cannot update copyright year.');
            }
        } catch (error) {
            console.error('Error updating copyright year:', error);
        }
    };

    /**
     * Implements smooth scrolling for anchor links within the page.
     *
     * This provides a more fluid navigation experience when clicking
     * on internal links.
     *
     * @returns {void}
     */
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                    console.log(`Smooth scroll to ${targetId}`);
                } else {
                    console.warn(`Target element ${targetId} not found for smooth scroll.`);
                }
            });
        });
    };

    // --- Execute functions on DOMContentLoaded ---
    initializeAOS();
    updateCopyrightYear();
    setupSmoothScroll(); // Enable smooth scrolling for all anchor links

    // Optional: Add a simple interactive element - e.g., a subtle hover effect on the main message
    const mainMessageElement = document.querySelector('.hero-message h1, .personal-message p');
    if (mainMessageElement) {
        mainMessageElement.addEventListener('mouseover', () => {
            mainMessageElement.style.transform = 'scale(1.01)';
            mainMessageElement.style.transition = 'transform 0.3s ease-in-out';
        });
        mainMessageElement.addEventListener('mouseout', () => {
            mainMessageElement.style.transform = 'scale(1)';
        });
    }

    console.log('script.js loaded and executed.');
});