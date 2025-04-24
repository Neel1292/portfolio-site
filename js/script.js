/* =========== menu icon navbar =========== */ 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

/* =========== scroll section active link =========== */ 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => { 
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*='+id+']')?.classList.add('active');
      })
    }
  })

   /* =========== sticky navbar =========== */ 
  let header = document.querySelector('.header');

  header.classList.toggle('sticky', window.scrollY > 100)

  /* =========== remove menu icon navbar when click navbar link (scroll) =========== */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');


}

/* =========== swipper navbar =========== */ 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/* =========== dark light mode =========== */ 

const darkModeIcon = document.querySelector('#darkMode-icon');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeIcon.classList.add('bx-sun');
}

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

/* =========== scroll reveal =========== */ 
ScrollReveal({ 
  // reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' })
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' })
ScrollReveal().reveal('.header .logo, .home-content h1, .about-img img', { origin: 'left' })
ScrollReveal().reveal('.home-content h3, .home-content p, .profession-container, .about-content', { origin: 'right' })

/* =========== contact form mail sent =========== */ 
document.getElementById("contact-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent page reload

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("number").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  // ✅ Basic Validation
  if (!name || !email || (!phone && phone.length !== 10) || !subject || !message) {
    showPopup("Please fill out all fields.");
    return;
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = ""; 

  let result = await fetch("https://email-send-api-bw5i.onrender.com/send-email",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      subject,
      message,
    })
  })

  console.log(result);
  
  if(!result.ok) {
    showPopup("Please try again later", "danger");
    return
  }
  
  showPopup("Your Response has been recorded", "success")

});

// Function to show the popup
function showPopup(message, type) {
  if(type === "danger") {
    document.getElementById("popup").style.backgroundColor = "#ff3333";
  }
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup").style.display = "block";
  setTimeout(closePopup, 5000);
}

// Function to close the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
