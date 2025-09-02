   
        // API Configuration
        const API_URL = 'https://proboostmyanmar.com/api/v2';
        const API_KEY = '4L2u9KHlHVq96kazTNvUGLmXWdZtdSf0O9FakfpgwZQD7eyPBzaQEEVbrfjH';
        
        // DOM Elements
        const servicesContainer = document.getElementById('servicesContainer');
        const searchInput = document.getElementById('searchInput');
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        // State
        let allServices = [];
        let filteredServices = [];
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            fetchServices();
            setupEventListeners();
        });
        
        // Fetch services from API
        async function fetchServices() {
            try {
                const response = await fetch(`${API_URL}?key=${API_KEY}&action=services`);
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    allServices = data;
                    displayServices(allServices);
                } else {
                    throw new Error('Invalid API response format');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                showError('Failed to load services. Please try again later.');
            }
        }
        
        // Display services in the grid
        function displayServices(services) {
            // Clear the container
            servicesContainer.innerHTML = '';
            
            if (services.length === 0) {
                servicesContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <p>No services found matching your search.</p>
                    </div>
                `;
                return;
            }
            
            // Add services to the grid
            services.forEach((service, index) => {
                const serviceCard = document.createElement('div');
                serviceCard.className = 'service-card';
                serviceCard.style.animationDelay = `${index * 0.1}s`;
                
                serviceCard.innerHTML = `
                    <h3 class="service-name">${service.name}</h3>
                    <span class="service-category">${service.category || 'General'}</span>
                    <div class="service-price">$${service.rate}</div>
                    <div class="service-minmax">Min: ${service.min} - Max: ${service.max}</div>
                    <span class="service-id">Service ID: ${service.service}</span>
                    <p class="service-description">${service.description || 'No description available.'}</p>
                    <button class="order-button" data-service-id="${service.service}">Order Now</button>
                `;
                
                servicesContainer.appendChild(serviceCard);
            });
            
            // Add event listeners to order buttons
            document.querySelectorAll('.order-button').forEach(button => {
                button.addEventListener('click', function() {
                    const serviceId = this.getAttribute('data-service-id');
                    const service = allServices.find(s => s.service == serviceId);
                    
                    if (service) {
                        // Store service data in localStorage
                        localStorage.setItem('selectedService', JSON.stringify(service));
                        
                        // Redirect to order page
                        window.location.href = 'order.html';
                    }
                });
            });
        }
        
        // Filter services based on search input
        function filterServices() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                filteredServices = [...allServices];
            } else {
                filteredServices = allServices.filter(service => 
                    service.name.toLowerCase().includes(searchTerm) || 
                    (service.description && service.description.toLowerCase().includes(searchTerm)) ||
                    (service.category && service.category.toLowerCase().includes(searchTerm)) ||
                    (service.service && service.service.toString().includes(searchTerm))
                );
            }
            
            displayServices(filteredServices);
        }
        
        // Show error message
        function showError(message) {
            servicesContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <p>${message}</p>
                    <button class="order-button" onclick="fetchServices()" style="margin-top: 20px;">
                        Try Again
                    </button>
                </div>
            `;
        }
        
        // Set up event listeners
        function setupEventListeners() {
            // Search functionality
            searchInput.addEventListener('input', filterServices);
            
            // Menu toggle functionality
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Change icon based on menu state
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    
