// Sumbar Property - Real Estate Website

document.addEventListener('DOMContentLoaded', function() {
    // Property Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            propertyCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Search Tabs
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Search Button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const location = document.getElementById('location').value;
            const price = document.getElementById('price').value;
            const activeTab = document.querySelector('.search-tab.active');
            const type = activeTab ? activeTab.dataset.type : 'all';

            // Filter based on search
            filterBtns.forEach(b => b.classList.remove('active'));
            
            if (type !== 'all') {
                const targetBtn = document.querySelector(`.filter-btn[data-filter="${type}"]`);
                if (targetBtn) targetBtn.classList.add('active');
            } else {
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
            }

            propertyCards.forEach(card => {
                let show = true;
                
                if (type !== 'all' && card.dataset.type !== type) {
                    show = false;
                }
                
                if (location && card.dataset.location !== location) {
                    show = false;
                }

                card.style.display = show ? 'block' : 'none';
                if (show) card.style.animation = 'fadeIn 0.5s ease';
            });

            // Scroll to listings
            document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
