// Blog Page Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const insightCards = document.querySelectorAll('.insight-card');

    if (filterTags.length > 0 && insightCards.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tag
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter insight cards
                insightCards.forEach(card => {
                    const cardType = card.getAttribute('data-type');
                    
                    if (filterValue === 'all') {
                        card.style.display = 'flex';
                        // Add fade-in animation
                        card.style.animation = 'cardFadeIn 0.5s ease';
                    } else if (cardType === filterValue) {
                        card.style.display = 'flex';
                        card.style.animation = 'cardfadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });

                console.log('Filter applied:', filterValue);
            });
        });

        // Add CSS for fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cardfadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        console.log('Blog filter initialized');
    }
});