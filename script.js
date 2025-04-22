// Ensure the script runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded'); // Debug: Confirm DOM is loaded

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('svg path'); // Select the path directly

    if (themeToggle) {
        console.log('Theme toggle button found'); // Debug: Confirm button exists

        themeToggle.addEventListener('click', () => {
            try {
                console.log('Theme toggle clicked'); // Debug: Confirm click event

                // Toggle the light-theme class
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                console.log('Light theme active:', isLight); // Debug: Confirm class toggle

                // Save theme preference
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('theme', isLight ? 'light' : 'dark');
                    console.log('Theme saved to localStorage:', isLight ? 'light' : 'dark');
                }

                // Update icon
                if (themeIcon) {
                    themeIcon.setAttribute('d', isLight ?
                        'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' : // Moon icon
                        'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' // Sun icon
                    );
                    console.log('Icon updated to:', isLight ? 'moon' : 'sun');
                }
            } catch (error) {
                console.error('Error in theme toggle:', error);
            }
        });
    } else {
        console.error('Theme toggle button not found');
    }

    // Load theme from localStorage if available
    if (typeof localStorage !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        console.log('Saved theme:', savedTheme); // Debug: Confirm saved theme
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.setAttribute('d', 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z');
            }
        } else {
            // Default to dark theme
            document.body.classList.remove('light-theme');
            if (themeIcon) {
                themeIcon.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
            }
        }
    }

    // Fade-in animation for sections
    const sections = document.querySelectorAll('.section-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // Skill progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = `${progress}%`;
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillsObserver.observe(document.getElementById('skills'));

    // Project card flip effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        const viewDetailsBtn = card.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('flipped');
            });
        }

        const backBtn = card.querySelector('.project-back button');
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('flipped');
        });
    });

    // Real-time form validation
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };
    const errors = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        message: document.getElementById('messageError')
    };

    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', () => {
            if (key === 'email') {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value);
                inputs.email.classList.toggle('error', !isValid && inputs.email.value !== '');
                errors.email.classList.toggle('hidden', isValid || inputs.email.value === '');
            } else {
                inputs[key].classList.toggle('error', inputs[key].value.trim() === '');
                errors[key].classList.toggle('hidden', inputs[key].value.trim() !== '');
            }
        });
    });

    // Contact form submission with mailto
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name = inputs.name.value.trim();
        const email = inputs.email.value.trim();
        const message = inputs.message.value.trim();

        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.classList.remove('hidden', 'text-green-600');
            formMessage.classList.add('text-red-600');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formMessage.textContent = 'Please enter a valid email.';
            formMessage.classList.remove('hidden', 'text-green-600');
            formMessage.classList.add('text-red-600');
            return;
        }

        // Simulate processing
        btnText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        submitBtn.disabled = true;

        setTimeout(() => {
            // Construct mailto link
            const subject = encodeURIComponent(`Message from ${name} via ishantrokka.com.np`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:test@gmail.com?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            btnText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
            submitBtn.disabled = false;

            formMessage.textContent = 'Opening your email client...';
            formMessage.classList.remove('hidden', 'text-red-600');
            formMessage.classList.add('text-green-600');

            inputs.name.value = '';
            inputs.email.value = '';
            inputs.message.value = '';
            Object.values(errors).forEach(error => error.classList.add('hidden'));
            Object.values(inputs).forEach(input => input.classList.remove('error'));

            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 3000);
        }, 1000);
    });
});
