document.addEventListener('DOMContentLoaded', () => {
  // Menu Mobile Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // FAQ Toggle
  const faqTitles = document.querySelectorAll('.faq-item h3');
  faqTitles.forEach(title => {
    title.addEventListener('click', () => {
      const faqItem = title.parentElement;
      faqItem.classList.toggle('active');
    });
  });

  // Animações de Scroll com Delay Incremental (mais natural)
  const animatedElements = document.querySelectorAll(
    '.section, .services, .testimonials, .partners, .faq, .contact, .location, .newsletter'
  );

  function checkVisibility() {
    const triggerPoint = window.innerHeight * 0.9;

    animatedElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint && !el.classList.contains('visible')) {
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transitionDelay = (index * 0.15) + 's';
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();

  // IntersectionObserver para animações pausadas e iniciadas naturalmente
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
  });

  // Carrossel com transição suave e pausas ao focar (hover)
  const slides = document.querySelector('.slides');
  const totalSlides = slides.children.length;
  let currentIndex = 0;
  let slideInterval;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  function startSlideShow() {
    slideInterval = setInterval(showNextSlide, 4000);
  }

  function pauseSlideShow() {
    clearInterval(slideInterval);
  }

  startSlideShow();

  // Pausa o slideshow ao passar o mouse, retoma ao tirar
  slides.parentElement.addEventListener('mouseenter', pauseSlideShow);
  slides.parentElement.addEventListener('mouseleave', startSlideShow);
});

document.getElementById('form-whatsapp').addEventListener('submit', function(e) {
  e.preventDefault(); // impede o envio padrão

  const nome = document.getElementById('input-nome').value.trim();
  const interesse = document.getElementById('input-interesse').value.trim();
  const mensagem = document.getElementById('input-mensagem').value.trim();

  const numero = '54991194860'; // Seu número com DDI e DDD

  const texto = `Olá, tudo bom? Meu nome é ${nome}, meu interesse é saber sobre: ${interesse}. Mensagem: ${mensagem}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank'); // abre em nova aba
});


// Preenche interesse e rola até o formulário quando clicar em "Comprar"
document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    const produto = this.getAttribute('data-produto');
    const interesseInput = document.getElementById('input-interesse');
    interesseInput.value = produto;
    interesseInput.focus();

    // Scroll suave para a seção contato
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
  });
});

// Envia a mensagem via WhatsApp com os dados do formulário
document.getElementById('form-whatsapp').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('input-nome').value.trim();
  const interesse = document.getElementById('input-interesse').value.trim();
  const mensagem = document.getElementById('input-mensagem').value.trim();

  const numero = '54991194860'; // Seu número com DDI e DDD

  const texto = `Olá! Meu nome é ${nome}, tenho interesse no produto: ${interesse}. Mensagem: ${mensagem}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
});

