// home.js - Script JS
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.hero .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(`Button clicked: ${btn.textContent}`);
        });
    });
});
