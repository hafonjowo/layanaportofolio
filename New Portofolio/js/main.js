/* ==========================================================================
   CodeCraft Portfolio Main Script
   Interactive Pop-ups, Animated Loading Login, Section Transitions & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Sound / Audio Feedback (Web Audio API Synth for subtle modern clicks) ---
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;
  function playBeep(freq = 600, duration = 0.08, type = 'sine') {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  function playEntranceChord() {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 lush chord
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.55);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.55);
        }, idx * 60);
      });
    } catch (e) {}
  }

  // --- 0. Cinematic Entrance Preloader Logic ---
  const preloader = document.getElementById('entrance-preloader');
  const preloaderFill = document.getElementById('preloader-bar-fill');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderStatus = document.getElementById('preloader-status-text');
  const skipBtn = document.getElementById('preloader-skip-btn');
  const appWrapper = document.querySelector('.app-wrapper');

  let preloaderClosed = false;

  function finishPreloader() {
    if (preloaderClosed || !preloader) return;
    preloaderClosed = true;
    if (preloaderFill) preloaderFill.style.width = '100%';
    if (preloaderPercent) preloaderPercent.textContent = '100%';
    if (preloaderStatus) preloaderStatus.textContent = 'SYSTEM ONLINE // READY';

    playEntranceChord();

    // Trigger Slide-Up & Content Pop-Up
    preloader.classList.add('loaded');
    if (appWrapper) {
      appWrapper.classList.remove('entrance-content-pop');
      void appWrapper.offsetWidth; // Force reflow
      appWrapper.classList.add('entrance-content-pop');
    }

    setTimeout(() => {
      document.body.style.overflow = '';
      checkScrollReveals();
      showSectionPopToast('Selamat Datang di Portofolio Layana', '✨');
    }, 450);
  }

  if (preloader) {
    document.body.style.overflow = 'hidden';

    let progress = 0;
    const startTime = performance.now();
    const duration = 5000; // 5.0 seconds cinematic duration

    function updatePreloader(time) {
      if (preloaderClosed) return;
      const elapsed = time - startTime;
      progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      if (preloaderFill) preloaderFill.style.width = `${progress}%`;
      if (preloaderPercent) preloaderPercent.textContent = `${progress}%`;

      if (preloaderStatus) {
        if (progress < 20) {
          preloaderStatus.textContent = "CONNECTING TO LAYANA'S UNIVERSE...";
        } else if (progress < 42) {
          preloaderStatus.textContent = "ORBITING NEON PLANETARY CORE...";
        } else if (progress < 68) {
          preloaderStatus.textContent = "ETCHING VECTOR LOGO GEOMETRY...";
        } else if (progress < 88) {
          preloaderStatus.textContent = "COMPILING 3D EXPERIENCE & UI...";
        } else {
          preloaderStatus.textContent = "INITIALIZATION COMPLETE // WELCOME";
        }
      }

      if (progress < 100) {
        requestAnimationFrame(updatePreloader);
      } else {
        finishPreloader();
      }
    }

    requestAnimationFrame(updatePreloader);

    if (skipBtn) {
      skipBtn.addEventListener('click', finishPreloader);
    }
  }

  // --- 1.1 Internationalization (i18n) Translations ---
  const translations = {
    id: {
      nav_home: "Beranda",
      nav_about: "Tentang",
      nav_education: "Pendidikan",
      nav_skills: "Keahlian",
      nav_projects: "Proyek",
      nav_certificates: "Sertifikat",
      nav_contact: "Kontak",
      hire_me: "Rekrut Saya ↗",

      hero_badge: "UI/UX DESIGNER & DEVELOPER",
      hero_hi: "Halo, Saya",
      hero_role: "UI/UX Designer | Web & App Developer | Multimedia & Digital Marketing Specialist",
      hero_desc: "Mahasiswa Teknologi Rekayasa Perangkat Lunak (Fakultas Vokasi, Universitas Brawijaya) dengan latar belakang kuat di bidang Desain Komunikasi Visual. Terbiasa menggabungkan estetika visual, prinsip desain antarmuka modern, dan pengembangan kode fungsional untuk membangun produk digital yang responsif dan berorientasi pada pengguna.",
      btn_view_work: "Lihat Karya ↗",
      btn_download_cv: "Unduh CV",
      tech_stack_label: "TEKNOLOGI YANG DIGUNAKAN",

      about_badge: "TENTANG SAYA",
      about_title: "Berdedikasi menciptakan<br>solusi digital yang berdampak",
      about_desc: "Dengan pengalaman lebih dari 4 tahun dalam pengembangan web & desain antarmuka, saya membantu bisnis, startup, dan kreator mewujudkan ide menjadi produk nyata melalui kode yang bersih, performa tinggi, dan pengalaman pengguna yang memikat.",
      btn_about_more: "Pelajari Lebih Lanjut",
      stat_exp: "Tahun Pengalaman",
      stat_projects: "Proyek Selesai",
      stat_clients: "Klien Puas",
      stat_satisfaction: "Kepuasan Klien",

      edu_badge: "LATAR BELAKANG AKADEMIK",
      edu_title: "Riwayat Pendidikan",
      edu_subtitle: "Perjalanan akademik dan fondasi keilmuan yang membentuk keahlian teknis saya dalam rekayasa perangkat lunak dan desain visual.",

      edu1_degree: "D4 Teknologi Rekayasa Perangkat Lunak",
      edu1_school: "Fakultas Vokasi, Universitas Brawijaya",
      edu1_year: "2026 — Sekarang",
      edu1_desc: "Mendalami rekayasa perangkat lunak modern, perancangan arsitektur antarmuka digital UI/UX, pengembangan web & mobile application, serta integrasi kode fungsional yang responsif dan berorientasi pengguna.",
      edu1_tag1: "💻 Rekayasa Perangkat Lunak",
      edu1_tag2: "🎨 UI/UX Interface Design",
      edu1_tag3: "📱 Web & App Development",

      edu2_degree: "Desain Komunikasi Visual (DKV)",
      edu2_school: "SMKN 13 Negeri Malang",
      edu2_year: "Lulus 2026",
      edu2_desc: "Membangun fondasi kuat dalam estetika visual, tata letak antarmuka, teori warna, tipografi, pembuatan aset digital, multimedia interaktif, dan strategi visual branding.",
      edu2_tag1: "🏆 Penghargaan Karya Desain Grafis Terbaik UKK 2026",
      edu2_tag2: "🎨 Desain Komunikasi Visual",
      edu2_tag3: "✨ Visual Identity & Branding",

      edu3_degree: "Praktik Fotografi Studio & Produksi Aset Visual",
      edu3_school: "Alviero Studio Foto",
      edu3_year: "Magang Industri",
      edu3_desc: "Praktik fotografi studio, penyuntingan foto profesional, manajemen pencahayaan studio, serta produksi aset visual multimedia berkualitas tinggi untuk kebutuhan komersial dan digital.",
      edu3_tag1: "📸 Fotografi Studio & Lighting",
      edu3_tag2: "🖌️ Penyuntingan Foto Profesional",
      edu3_tag3: "🎬 Produksi Aset Visual Digital",

      skills_badge: "KEAHLIAN SAYA",
      skills_title: "Teknologi yang Dikuasai",
      skills_subtitle: "Kumpulan keahlian teknis dan teknologi modern yang saya gunakan setiap hari dalam mengembangkan solusi digital.",
      tools_title: "Tools & Framework Lainnya",

      projects_badge: "PROYEK UNGGULAN",
      projects_title: "Karya & Proyek Terpilih",
      projects_subtitle: "Koleksi karya pengembangan web dan desain antarmuka nyata yang dibangun dengan fokus pada performa, estetika visual, dan kenyamanan pengguna.",
      projects_empty_badge: "COMING SOON",
      projects_upcoming_title: "Proyek Berikutnya Segera Hadir",
      projects_upcoming_desc: "Karya dan studi kasus pengembangan web berikutnya sedang dalam tahap penyusunan dan pengujian.",
      project_view_detail: "Lihat Detail Proyek →",
      p1_title: "Website Cafe Pingopi",
      p1_desc: "Platform website interaktif Cafe Pingopi yang memadukan katalog menu kopi spesialti & makanan, sistem reservasi meja online, dan integrasi pemesanan responsif.",
      filter_all: "Semua Proyek",
      filter_webapp: "Web App",
      filter_ecommerce: "E-Commerce",
      filter_dashboard: "Dashboard & Data",
      filter_ai: "AI / Creative",

      cert_badge: "KREDENSIAL & PENGHARGAAN",
      cert_title: "Lisensi & Sertifikat Kompetensi",
      cert_subtitle: "Penghargaan resmi dan sertifikasi kompetensi yang memvalidasi keahlian di bidang industri kreatif, kecerdasan buatan (AI), serta desain visual.",
      cert_btn_preview: "Lihat Pop-up ↗",

      cert1_title: "Anak Magang Terbaik — Alviero Studio Foto",
      cert1_issuer: "Alviero Studio Foto · Divisi Editor & Konten Kreator",
      cert1_desc: "Penghargaan atas dedikasi dan kinerja terbaik dalam penyuntingan foto studio profesional, produksi konten visual kreatif, dan manajemen aset multimedia.",

      cert2_title: "Mahasiswa Terverifikasi Student Gemini",
      cert2_issuer: "Google · Pengetahuan & Implementasi AI",
      cert2_desc: "Sertifikasi pemahaman dan penerapan teknologi Artificial Intelligence (AI), prompting cerdas, dan integrasi ekosistem Google Gemini untuk inovasi digital.",

      cert3_title: "Siswa DKV dengan Karya Desain Terbaik",
      cert3_issuer: "SMKN 13 Malang · Uji Kompetensi Keahlian (UKK)",
      cert3_desc: "Penghargaan karya terbaik pada Uji Kompetensi Keahlian (UKK) 2026 program Desain Komunikasi Visual (DKV) dalam pembuatan identitas visual dan karya grafis unggulan.",

      testimonial_quote: '"Layana adalah desainer dan developer luar biasa yang mampu menjembatani estetika visual kreatif dengan kode fungsional yang bersih. Perhatiannya pada detail UI/UX, empati pengguna, dan wawasan digital marketing membuat produk kami menonjol dan melampaui ekspektasi."',
      contact_badge: "KOLABORASI PROYEK",
      contact_title: "Punya ide proyek menarik?",
      contact_desc: "Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang kemitraan strategis. Mari kita wujudkan sesuatu yang luar biasa bersama!",
      btn_get_in_touch: "Hubungi Saya ↗",
      follow_me: "IKUTI SAYA",

      footer_rights: "© 2026 Layana Balin Santoso. Seluruh hak cipta dilindungi.",
      footer_made: "Dibuat dengan ❤️ oleh Layana",

      toast_slide_prefix: "Menampilkan Slide:",
      toast_lang_changed: "Bahasa berhasil diubah ke Bahasa Indonesia"
    },
    en: {
      nav_home: "Home",
      nav_about: "About",
      nav_education: "Education",
      nav_skills: "Skills",
      nav_projects: "Projects",
      nav_certificates: "Certificates",
      nav_contact: "Contact",
      hire_me: "Hire Me ↗",

      hero_badge: "UI/UX DESIGNER & DEVELOPER",
      hero_hi: "Hi, I’m",
      hero_role: "UI/UX Designer | Web & App Developer | Multimedia & Digital Marketing Specialist",
      hero_desc: "Software Engineering Technology student (Faculty of Vocational Studies, Brawijaya University) with a strong background in Visual Communication Design. Experienced in merging visual aesthetics, modern interface principles, and functional code to build responsive, user-centered digital products.",
      btn_view_work: "View My Work ↗",
      btn_download_cv: "Download CV",
      tech_stack_label: "TECHNOLOGIES I WORK WITH",

      about_badge: "ABOUT ME",
      about_title: "I'm passionate about<br>creating digital solutions",
      about_desc: "With 4+ years of experience in web development & UI/UX design, I help businesses, startups, and individuals bring their ideas to life through clean, efficient, highly responsive, and user-friendly code.",
      btn_about_more: "Learn More About Me",
      stat_exp: "Years Experience",
      stat_projects: "Projects Completed",
      stat_clients: "Happy Clients",
      stat_satisfaction: "Client Satisfaction",

      edu_badge: "ACADEMIC BACKGROUND",
      edu_title: "Educational Journey",
      edu_subtitle: "Academic journey and scientific foundations that shaped my technical expertise in software engineering and visual design.",

      edu1_degree: "B.App.Sc in Software Engineering Technology",
      edu1_school: "Faculty of Vocational Studies, Brawijaya University",
      edu1_year: "2026 — Present",
      edu1_desc: "Specializing in modern software engineering, digital UI/UX architecture, responsive web & mobile application development, and user-centered functional code.",
      edu1_tag1: "💻 Software Engineering",
      edu1_tag2: "🎨 UI/UX Interface Design",
      edu1_tag3: "📱 Web & App Development",

      edu2_degree: "Visual Communication Design (VCD)",
      edu2_school: "State Vocational High School 13 Malang",
      edu2_year: "Graduated 2026",
      edu2_desc: "Built a solid foundation in visual aesthetics, layout design, color theory, typography, digital asset creation, interactive multimedia, and branding strategies.",
      edu2_tag1: "🏆 Best Graphic Design Award UKK 2026",
      edu2_tag2: "🎨 Visual Communication Design",
      edu2_tag3: "✨ Visual Identity & Branding",

      edu3_degree: "Studio Photography & Visual Asset Production",
      edu3_school: "Alviero Photo Studio",
      edu3_year: "Industrial Internship",
      edu3_desc: "Professional studio photography practice, high-end commercial photo editing, lighting setup management, and production of multimedia visual assets for digital campaigns.",
      edu3_tag1: "📸 Studio Photography & Lighting",
      edu3_tag2: "🖌️ Professional Photo Retouching",
      edu3_tag3: "🎬 Digital Visual Production",

      skills_badge: "MY SKILLS",
      skills_title: "Technologies I Master",
      skills_subtitle: "Collection of technical skills and modern technologies I use daily to build exceptional digital solutions.",
      tools_title: "Other Tools & Frameworks",

      projects_badge: "FEATURED PROJECTS",
      projects_title: "Selected Projects & Works",
      projects_subtitle: "Collection of real-world web applications and UI/UX design products built with a focus on performance, visual aesthetics, and user experience.",
      projects_empty_badge: "COMING SOON",
      projects_upcoming_title: "Next Project Coming Soon",
      projects_upcoming_desc: "Upcoming web application case studies and client projects are currently being prepared and tested.",
      project_view_detail: "View Project Details →",
      p1_title: "Pingopi Cafe Website",
      p1_desc: "Interactive website platform for Pingopi Cafe featuring specialty coffee menu catalog, online table reservation, and responsive ordering workflow.",
      filter_all: "All Projects",
      filter_webapp: "Web App",
      filter_ecommerce: "E-Commerce",
      filter_dashboard: "Dashboard & Data",
      filter_ai: "AI / Creative",

      cert_badge: "CREDENTIALS & AWARDS",
      cert_title: "Licenses & Certifications",
      cert_subtitle: "Official awards and certifications validating expertise in the creative industry, Artificial Intelligence (AI), and visual design.",
      cert_btn_preview: "View Pop-up ↗",

      cert1_title: "Best Intern Award — Alviero Photo Studio",
      cert1_issuer: "Alviero Photo Studio · Editor & Content Creator Division",
      cert1_desc: "Awarded for exceptional dedication and performance in professional studio photo editing, creative visual content production, and multimedia asset workflow.",

      cert2_title: "Verified Student Gemini — AI Knowledge",
      cert2_issuer: "Google · AI Knowledge & Implementation",
      cert2_desc: "Certification verifying mastery of Artificial Intelligence (AI), advanced prompt engineering, and utilizing Google Gemini ecosystem for digital innovation.",

      cert3_title: "VCD Student with Best Design Work Award",
      cert3_issuer: "State Vocational High School 13 Malang · UKK Competency",
      cert3_desc: "Best graphic design and visual branding award at the 2026 Vocational Competency Examination (UKK) in Visual Communication Design.",

      testimonial_quote: '"Layana is an exceptional designer and developer who seamlessly bridges creative visual aesthetics with clean, functional code. His attention to UI/UX details, user empathy, and digital marketing insight made our product stand out and exceed expectations."',
      contact_badge: "LET'S WORK TOGETHER",
      contact_title: "Have a project in mind?",
      contact_desc: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something extraordinary together!",
      btn_get_in_touch: "Get in Touch ↗",
      follow_me: "FOLLOW ME",

      footer_rights: "© 2026 Layana Balin Santoso. All rights reserved.",
      footer_made: "Made with ❤️ by Layana",

      toast_slide_prefix: "Viewing Slide:",
      toast_lang_changed: "Language switched to English"
    }
  };

  let currentLang = localStorage.getItem('layana_lang') || 'id';

  function setLanguage(lang, triggerToast = true) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('layana_lang', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (translations[lang][key].includes('<br>')) {
          el.innerHTML = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    // Update Language Buttons Active State
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (triggerToast) {
      showSectionPopToast(translations[lang].toast_lang_changed, lang === 'id' ? '🇮🇩' : '🇬🇧');
    }
  }

  // Language button click listener
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      if (selected !== currentLang) {
        playBeep(720, 0.08);
        setLanguage(selected, true);
      }
    });
  });

  // --- 2. Section Pop-up HUD Toast & Slide Navigation ---
  const popToast = document.getElementById('section-pop-toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showSectionPopToast(title, icon = '🚀') {
    if (!popToast || !toastText) return;
    const prefix = (translations[currentLang] && translations[currentLang].toast_slide_prefix) ? translations[currentLang].toast_slide_prefix : 'Menampilkan Slide:';
    
    // Check if title is custom notification or slide name
    if (icon === '🇮🇩' || icon === '🇬🇧') {
      toastText.innerHTML = `${icon} <strong>${title}</strong>`;
    } else {
      toastText.innerHTML = `${icon} ${prefix} <strong>${title}</strong>`;
    }
    
    popToast.classList.add('show');
    playBeep(880, 0.09, 'triangle');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      popToast.classList.remove('show');
    }, 2400);
  }

  // Navigation Links & Section Pop-up Transitions
  const navLinks = document.querySelectorAll('.nav-link, .slide-dot, .btn-slide-jump');
  const sections = document.querySelectorAll('section[id]');
  const slideDots = document.querySelectorAll('.slide-dot');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href') || link.getAttribute('data-target');
      if (!targetId || !targetId.startsWith('#')) return;

      e.preventDefault();
      const targetElem = document.querySelector(targetId);
      if (!targetElem) return;

      const sectionName = targetElem.getAttribute('data-name') || targetId.replace('#', '').toUpperCase();
      showSectionPopToast(sectionName);

      // Trigger pop animation on section
      targetElem.classList.remove('pop-active');
      void targetElem.offsetWidth; // Trigger reflow
      targetElem.classList.add('pop-active');

      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu if open
      const navLinksContainer = document.querySelector('.nav-links');
      if (navLinksContainer && navLinksContainer.classList.contains('mobile-open')) {
        navLinksContainer.classList.remove('mobile-open');
      }
    });
  });

  // --- 2.1 Reveal Elements on Scroll & Interaction ---
  function revealElement(el) {
    if (!el) return;
    el.classList.add('visible');
    if (el.id === 'skills' || (el.querySelector && el.querySelector('#skills'))) {
      animateSkillBars();
    }
  }

  // Active Section & Reveal Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.05
  };

  let activeSectionTracked = 'home';
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Reveal the section itself and any internal reveal elements
        revealElement(entry.target);
        entry.target.querySelectorAll('.pop-reveal').forEach(child => revealElement(child));

        // Update nav links active state
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update slide dots
        slideDots.forEach(dot => {
          if (dot.getAttribute('data-target') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        // Show HUD Pop Toast if scrolled into a new section
        if (id && id !== activeSectionTracked && preloaderClosed) {
          activeSectionTracked = id;
          const sectionName = entry.target.getAttribute('data-name') || id.toUpperCase();
          showSectionPopToast(sectionName);
        }

        // If skills section, trigger skill bars
        if (id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // High-reliability Scroll & Resize Listener for Reveal Animation
  function checkScrollReveals() {
    const popElements = document.querySelectorAll('.pop-reveal:not(.visible)');
    const windowBottom = window.innerHeight * 0.94;
    popElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowBottom) {
        revealElement(el);
      }
    });
  }

  window.addEventListener('scroll', checkScrollReveals, { passive: true });
  window.addEventListener('resize', checkScrollReveals, { passive: true });
  window.addEventListener('load', checkScrollReveals);
  checkScrollReveals();

  // --- 3. Interactive Skill Progress Bars ---
  let skillsAnimated = false;
  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;
    setTimeout(() => {
      const fills = document.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width') || '85%';
        fill.style.width = targetWidth;
      });
    }, 850);
  }

  // --- 4. Project Pop-up Detail Modal ---
  const projectModal = document.getElementById('project-modal');
  const btnCloseProject = document.getElementById('btn-close-project');
  const projectCards = document.querySelectorAll('.project-card');

  const projectDetails = {
    '1': {
      title: 'Website Cafe Pingopi',
      category: 'F&B Digital Menu & Order Platform',
      desc: 'Platform website modern untuk Cafe Pingopi dengan antarmuka estetik dan interaktif. Dirancang untuk memperkuat identitas visual cafe, menyajikan katalog menu kopi spesialti & artisan pastry, sistem reservasi meja online, serta integrasi pemesanan WhatsApp & scan QR meja untuk kemudahan pelanggan.',
      tech: ['HTML5 & Modern CSS3', 'JavaScript ES6+', 'UI/UX Interface Design', 'Responsive Mobile-First', 'Web Performance Optimization'],
      img: 'assets/project-pingopi.svg',
      link: '#',
      github: '#'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-category').textContent = data.category;
    document.getElementById('modal-project-desc').textContent = data.desc;
    document.getElementById('modal-project-img').src = data.img;

    const tagsContainer = document.getElementById('modal-project-tags');
    tagsContainer.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = t;
      tagsContainer.appendChild(span);
    });

    const liveBtn = document.getElementById('modal-project-live');
    const githubBtn = document.getElementById('modal-project-github');
    if (liveBtn) liveBtn.href = data.link;
    if (githubBtn) githubBtn.href = data.github;

    playBeep(720, 0.08);
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (btnCloseProject) btnCloseProject.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // --- 6. Certificate Pop-up Lightbox Modal ---
  const certModal = document.getElementById('cert-modal');
  const btnCloseCert = document.getElementById('btn-close-cert');
  const certCards = document.querySelectorAll('.cert-card');

  const certData = {
    '1': {
      title: 'Penghargaan Anak Magang Terbaik — Divisi Editor & Konten Kreator',
      issuer: 'Alviero Studio Foto',
      date: 'Magang Industri 2026 · Penghargaan Kehormatan',
      id: 'ALVIERO-INTERN-2026-BEST',
      badge: '🎬',
      skills: ['Fotografi Studio', 'Penyuntingan Foto & Video', 'Konten Kreator Digital', 'Color Grading', 'Produksi Aset Visual']
    },
    '2': {
      title: 'Mahasiswa Terverifikasi Student Gemini — Pengetahuan AI',
      issuer: 'Google · Student Gemini AI Program',
      date: 'Terverifikasi 2026 · Kredensial AI',
      id: 'GEMINI-STUDENT-AI-2026',
      badge: '✨',
      skills: ['Artificial Intelligence (AI)', 'Google Gemini Ecosystem', 'Prompt Engineering', 'AI Automation', 'Inovasi Produk Digital']
    },
    '3': {
      title: 'Penghargaan Siswa Desain Komunikasi Visual dengan Karya Terbaik',
      issuer: 'SMKN 13 Malang · Uji Kompetensi Keahlian (UKK)',
      date: 'Lulus 2026 · Karya Desain Grafis Terbaik',
      id: 'UKK-DKV-BESTWORK-2026',
      badge: '🏆',
      skills: ['Desain Komunikasi Visual (DKV)', 'Visual Branding & Identity', 'Tipografi & Layout Modern', 'Adobe Creative Suite', 'UI/UX Visual Design']
    }
  };

  function openCertModal(certId) {
    const data = certData[certId];
    if (!data || !certModal) return;

    document.getElementById('modal-cert-title').textContent = data.title;
    document.getElementById('modal-cert-issuer').textContent = data.issuer;
    document.getElementById('modal-cert-date').textContent = data.date;
    document.getElementById('modal-cert-id').textContent = `ID Kredensial: ${data.id}`;
    document.getElementById('modal-cert-badge').textContent = data.badge;

    const skillsContainer = document.getElementById('modal-cert-skills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(s => {
      const span = document.createElement('span');
      span.className = 'achievement-tag';
      span.textContent = s;
      skillsContainer.appendChild(span);
    });

    playBeep(780, 0.08);
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-cert-id');
      openCertModal(id);
    });
  });

  if (btnCloseCert) btnCloseCert.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // --- 7. Project Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      playBeep(600, 0.05);

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.classList.remove('pop-active');
          void card.offsetWidth;
          card.classList.add('pop-active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 8. Mobile Menu Toggle ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
      playBeep(550, 0.06);
    });
  }

  // Escape key closes preloader or any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (preloader && !preloaderClosed) {
        finishPreloader();
        return;
      }
      closeProjectModal();
      closeCertModal();
    }
  });

  // Initial triggers for page load & language initialization
  setLanguage(currentLang, false);
  setTimeout(checkScrollReveals, 50);
  setTimeout(checkScrollReveals, 250);
});
