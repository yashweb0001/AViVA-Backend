// Form Submission Logic
document.getElementById('inquiryForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Elements ko safely fetch karna (null error se bachne ke liye)
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const classInput = document.getElementById('studentClass');
    const messageInput = document.getElementById('message');
    const responseElement = document.getElementById('formResponse');

    const name = nameInput ? nameInput.value : '';
    const phone = phoneInput ? phoneInput.value : '';
    const studentClass = classInput ? classInput.value : '';
    const message = messageInput ? messageInput.value : '';

    responseElement.textContent = 'Sending...';
    responseElement.style.color = 'blue';

    try {
        // Render Backend Live URL Connected
        const res = await fetch('https://aviva-backend.onrender.com/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, studentClass, message })
        });

        const data = await res.json();

        if (data.success) {
            responseElement.textContent = 'Inquiry submitted successfully! Opening WhatsApp...';
            responseElement.style.color = 'green';

            // WhatsApp redirect link with form data
            const adminPhone = "919415801326";
            const textMessage = `*New Admission Inquiry!*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Class:* ${encodeURIComponent(studentClass)}%0A*Message:* ${encodeURIComponent(message)}`;
            const waUrl = `https://wa.me/${adminPhone}?text=${textMessage}`;

            setTimeout(() => {
                window.open(waUrl, '_blank');
                document.getElementById('inquiryForm').reset();
            }, 1000);

        } else {
            responseElement.textContent = 'Server Error! Please try again.';
            responseElement.style.color = 'red';
        }
    } catch (error) {
        responseElement.textContent = 'Network Error! Could not connect to the server.';
        responseElement.style.color = 'red';
    }
});

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = 'flex';
}

function closeContactModal(e) {
    if (e.target.id === 'contactModal' || e.target.classList.contains('modal-close')) {
        const modal = document.getElementById('contactModal');
        if (modal) modal.style.display = 'none';
    }
}

// Image Slider Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide) => slide.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

if (slides.length > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 4000);
}