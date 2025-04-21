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
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('crt-theme');
    const isCrt = document.body.classList.contains('crt-theme');
    localStorage.setItem('theme', isCrt ? 'crt' : 'default');
});

// Load theme from localStorage
if (localStorage.getItem('theme') === 'crt') {
    document.body.classList.add('crt-theme');
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
    // Flip on card click
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // Flip on "View Details" click
    const viewDetailsBtn = card.querySelector('.view-details');
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click from firing
            card.classList.toggle('flipped');
        });
    }

    // Back button to unflip
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

// Contact form submission (demo simulation)
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const loadingSpinner = document.getElementById('loadingSpinner');
const formMessage = document.getElementById('formMessage');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Explicitly prevent any default form submission

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

    // Simulate form submission (demo only)
    btnText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    submitBtn.disabled = true;

    setTimeout(() => {
        btnText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
        submitBtn.disabled = false;

        formMessage.textContent = 'Demo: Message not sent (this is a portfolio demo).';
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
    }, 1500);
});
