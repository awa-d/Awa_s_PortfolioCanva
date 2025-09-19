// Complete Portfolio JavaScript - Single File Solution
// This replaces both base.js and portfolio.js

console.log('Portfolio JavaScript loaded');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing portfolio');
    
    // ============== NAVIGATION ==============
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        console.log('Navigation elements found');
        
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('open');
            this.classList.toggle('active');
            console.log('Navigation toggled');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // ============== BACK TO TOP BUTTON ==============
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        console.log('Back to top button found');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============== LIGHTBOX SETUP ==============
    let lightbox = document.querySelector('.lightbox');
    
    // Add lightbox styles
    if (!document.querySelector('#lightbox-styles')) {
        const lightboxStyles = document.createElement('style');
        lightboxStyles.id = 'lightbox-styles';
        lightboxStyles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .lightbox.active {
                display: flex !important;
                animation: fadeIn 0.3s ease;
            }
            
            .lightbox-content {
                background: white;
                border-radius: 12px;
                max-width: 95vw;
                max-height: 95vh;
                overflow: hidden;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(255, 0, 0, 0.8);
                transform: scale(1.1);
            }
            
            .lightbox-media {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f8f9fa;
                min-height: 400px;
            }
            
            .lightbox-media iframe {
                width: 90vw;
                height: 80vh;
                max-width: 1200px;
                border: none;
                border-radius: 8px;
            }
            
            .lightbox-media video {
                max-width: 90vw;
                max-height: 80vh;
                border-radius: 8px;
            }
            
            .lightbox-media img {
                max-width: 90vw;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 8px;
            }
            
            .lightbox-info {
                padding: 24px;
                border-top: 1px solid #e9ecef;
                background: white;
            }
            
            .lightbox-title {
                margin: 0 0 12px 0;
                font-size: 1.25rem;
                font-weight: 600;
                color: #333;
            }
            
            .lightbox-description {
                margin: 0 0 16px 0;
                color: #666;
                line-height: 1.5;
            }
            
            .lightbox-download {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: #007bff;
                text-decoration: none;
                font-weight: 500;
                padding: 8px 16px;
                border: 1px solid #007bff;
                border-radius: 6px;
                transition: all 0.3s ease;
            }
            
            .lightbox-download:hover {
                background: #007bff;
                color: white;
                transform: translateY(-1px);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .lightbox-media iframe {
                    width: 95vw;
                    height: 70vh;
                }
                
                .lightbox-content {
                    max-width: 98vw;
                    max-height: 98vh;
                }
                
                .lightbox-info {
                    padding: 16px;
                }
                
                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(lightboxStyles);
        console.log('Lightbox styles added');
    }
    
    // Function to open lightbox
    function openLightbox(content) {
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            document.body.appendChild(lightbox);
        }
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">×</button>
                ${content}
            </div>
        `;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add close event listener
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        console.log('Lightbox opened');
    }
    
    // Function to close lightbox
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            
            // Clear content after animation
            setTimeout(() => {
                if (!lightbox.classList.contains('active')) {
                    lightbox.innerHTML = '';
                }
            }, 300);
        }
        console.log('Lightbox closed');
    }
    
    // Close lightbox when clicking outside content
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('lightbox') && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Close lightbox with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // ============== PORTFOLIO FILTERS ==============
    const filterButtons = document.querySelectorAll('#filters .chip');
    const galleryItems = document.querySelectorAll('#gallery .item');
    
    console.log(`Found ${filterButtons.length} filter buttons and ${galleryItems.length} gallery items`);
    
    // Add filter event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            console.log('Filter clicked:', filter);
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const itemType = item.dataset.type;
                const shouldShow = filter === 'all' || itemType === filter;
                
                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ============== BUTTON EVENT HANDLERS ==============
    
    // Count buttons for debugging
    const pdfButtons = document.querySelectorAll('.open-pdf');
    const videoButtons = document.querySelectorAll('.open-video');
    const imgButtons = document.querySelectorAll('.open-img');
    
    console.log(`Found buttons: PDF(${pdfButtons.length}), Video(${videoButtons.length}), Image(${imgButtons.length})`);
    
    // Main click event handler
    document.addEventListener('click', function(e) {
        console.log('Click detected on element:', e.target.className);
        
        // Handle PDF buttons
        if (e.target.classList.contains('open-pdf')) {
            e.preventDefault();
            console.log('PDF button clicked!');
            
            const src = e.target.dataset.src;
            const card = e.target.closest('.card');
            
            if (!src) {
                console.error('No PDF source found');
                alert('PDF source not found!');
                return;
            }
            
            let title = 'PDF Document';
            let description = 'Click the download link if the PDF doesn\'t load properly.';
            
            if (card) {
                const titleEl = card.querySelector('h3');
                const descEl = card.querySelector('.muted');
                if (titleEl) title = titleEl.textContent.trim();
                if (descEl) description = descEl.textContent.trim();
            }
            
            console.log('Opening PDF:', src);
            
            const pdfContent = `
                <div class="lightbox-media">
                    <iframe src="${src}" title="${title}">
                        <p>Your browser doesn't support PDF viewing.</p>
                    </iframe>
                </div>
                <div class="lightbox-info">
                    <h3 class="lightbox-title">${title}</h3>
                    <p class="lightbox-description">${description}</p>
                    <a href="${src}" download class="lightbox-download">
                        📥 Download PDF
                    </a>
                </div>
            `;
            
            openLightbox(pdfContent);
            return;
        }
        
        // Handle Video buttons
        if (e.target.classList.contains('open-video')) {
            e.preventDefault();
            console.log('Video button clicked!');
            
            const src = e.target.dataset.src;
            const card = e.target.closest('.card');
            
            if (!src) {
                console.error('No video source found');
                alert('Video source not found!');
                return;
            }
            
            let title = 'Video';
            let description = 'Video content';
            
            if (card) {
                const titleEl = card.querySelector('h3');
                const descEl = card.querySelector('.muted');
                if (titleEl) title = titleEl.textContent.trim();
                if (descEl) description = descEl.textContent.trim();
            }
            
            console.log('Opening video:', src);
            
            const videoContent = `
                <div class="lightbox-media">
                    <video controls preload="metadata" autoplay>
                        <source src="${src}" type="video/mp4">
                        <p>Your browser doesn't support video playback.</p>
                    </video>
                </div>
                <div class="lightbox-info">
                    <h3 class="lightbox-title">${title}</h3>
                    <p class="lightbox-description">${description}</p>
                </div>
            `;
            
            openLightbox(videoContent);
            return;
        }
        
        // Handle Image buttons
        if (e.target.classList.contains('open-img')) {
            e.preventDefault();
            console.log('Image button clicked!');
            
            const src = e.target.dataset.src;
            const card = e.target.closest('.card');
            
            if (!src) {
                console.error('No image source found');
                alert('Image source not found!');
                return;
            }
            
            let title = 'Image';
            let description = 'Image content';
            
            if (card) {
                const titleEl = card.querySelector('h3');
                const descEl = card.querySelector('.muted');
                if (titleEl) title = titleEl.textContent.trim();
                if (descEl) description = descEl.textContent.trim();
            }
            
            console.log('Opening image:', src);
            
            const imageContent = `
                <div class="lightbox-media">
                    <img src="${src}" alt="${title}" loading="lazy">
                </div>
                <div class="lightbox-info">
                    <h3 class="lightbox-title">${title}</h3>
                    <p class="lightbox-description">${description}</p>
                </div>
            `;
            
            openLightbox(imageContent);
            return;
        }
    });
    
    // ============== ADDITIONAL ENHANCEMENTS ==============
    
    // Add loading animation to gallery items
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects to cards
    galleryItems.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // ============== DEBUG FUNCTIONS ==============
    
    // Test function you can call from browser console
    window.portfolioDebug = function() {
        console.log('=== Portfolio Debug Info ===');
        console.log('PDF buttons:', document.querySelectorAll('.open-pdf').length);
        console.log('Video buttons:', document.querySelectorAll('.open-video').length);
        console.log('Image buttons:', document.querySelectorAll('.open-img').length);
        console.log('Filter buttons:', document.querySelectorAll('#filters .chip').length);
        console.log('Gallery items:', document.querySelectorAll('#gallery .item').length);
        console.log('Lightbox element:', document.querySelector('.lightbox') ? 'Found' : 'Not found');
        
        // Test first PDF button
        const firstPdf = document.querySelector('.open-pdf');
        if (firstPdf) {
            console.log('First PDF button src:', firstPdf.dataset.src);
        }
        
        return 'Debug info logged above';
    };
    
    console.log('Portfolio initialization complete! Run portfolioDebug() in console for debug info.');
});

// Additional utility functions
window.testPDFButton = function() {
    const button = document.querySelector('.open-pdf');
    if (button) {
        console.log('Testing first PDF button...');
        button.click();
    } else {
        console.log('No PDF button found!');
    }
};

window.testFilter = function(filterName = 'pdf') {
    const filterButton = document.querySelector(`[data-filter="${filterName}"]`);
    if (filterButton) {
        console.log(`Testing ${filterName} filter...`);
        filterButton.click();
    } else {
        console.log(`No filter button found for: ${filterName}`);
    }
};