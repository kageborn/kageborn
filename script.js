document.addEventListener('DOMContentLoaded', () => {
  // Atualizar o ano do copyright automaticamente
document.getElementById("current-year").textContent = new Date().getFullYear();/* ============================================================================================= */
  /** MÓDULO DE DATA
   * Converte Snowflake ID em Data e anima a contagem
   */
  const ZerasEngine = {
    guildID: "1390120239588577482",
    inviteCode: "GYGVBqGEwP",

    async syncAll() {
      try {
        const response = await fetch(
          `https://discord.com/api/v9/invites/${this.inviteCode}?with_counts=true`,
        );
        const data = await response.json();

        // 1. Sincroniza Membros (Online e Total) [cite: 153]
        this.updateCounter("stat-total", data.approximate_member_count || 5000);
        this.updateCounter("stat-online", data.approximate_presence_count || 0);
        // Adicione o complemento como uma string no final
        this.updateCounter(
          "discord-count",
          data.approximate_presence_count || 0,
          " Membros Online agora",
        );

        // 2. Sincroniza Data de Criação via ID (Snowflake)
        this.syncCreationDate();
      } catch (error) {
        console.error("Zera's Craft: Erro de sincronização.");
      }
    },

    // Converte o ID do Discord para Data Real
    syncCreationDate() {
      const id = BigInt(this.guildID);
      // Constante de tempo do Discord (Epoch)
      const timestamp = Number((id >> 22n) + 1420070400000n);
      const date = new Date(timestamp);

      const targetDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };

      this.animateDate("stat-date", targetDate);
    },

    // Animação de Data dd/mm/aaaa a 60fps [cite: 153]
    animateDate(id, target) {
      const el = document.getElementById(id);
      if (!el) return;

      let current = { day: 0, month: 0, year: 2000 };
      const duration = 2000; // 2 segundos
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);

        // Lógica de interpolação linear [cite: 106]
        current.day = Math.floor(progress * target.day);
        current.month = Math.floor(progress * target.month);
        current.year = Math.floor(2000 + progress * (target.year - 2000));

        // Formatação com zeros à esquerda (Partial Update) [cite: 190]
        const d = String(current.day).padStart(2, "0");
        const m = String(current.month).padStart(2, "0");
        const y = current.year;

        el.innerText = `${d}/${m}/${y}`;

        if (progress < 1) requestAnimationFrame(step);
        else
          el.innerText = `${String(target.day).padStart(2, "0")}/${String(target.month).padStart(2, "0")}/${target.year}`;
      };

      requestAnimationFrame(step);
    },

    // 1. Prepara o alvo e define o valor final com o complemento
    updateCounter(id, target, suffix = "") {
      const el = document.getElementById(id);
      if (el) {
        // Define o valor final no atributo para a lógica de animação [cite: 191]
        el.setAttribute("data-target", target);
        this.animateNumber(el, suffix);
      }
    },

    // 2. Executa a animação suave via requestAnimationFrame
    animateNumber(el, suffix) {
      const target = +el.getAttribute("data-target");

      const update = () => {
        // Remove caracteres não numéricos para calcular o progresso [cite: 191]
        const current = +el.innerText.replace(/\D/g, "") || 0;
        const increment = Math.ceil(target / 100);

        if (current < target) {
          const nextValue = Math.min(target, current + increment);
          // Atualização parcial: número formatado + complemento [cite: 191]
          el.innerText = `${nextValue.toLocaleString()}${suffix}`;
          requestAnimationFrame(update);
        } else {
          // Garante que o valor final exato seja exibido com o sufixo [cite: 191]
          el.innerText = `${target.toLocaleString()}${suffix}`;
        }
      };

      requestAnimationFrame(update);
    },
  };

  window.addEventListener("DOMContentLoaded", () => ZerasEngine.syncAll());


  // 1. Efeito Inteligente de Brilho do Cursor
  const bgGlow = document.getElementById('bgGlow');
  if (bgGlow) {
    document.addEventListener('mousemove', (e) => {
      bgGlow.style.left = `${e.clientX}px`;
      bgGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Navbar Scrolled Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');

      // Trava o scroll da página quando o menu tá aberto
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Fecha menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Animação de Surgimento (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 5. Efeito Parallax Tilt nos Cards
  const cards = document.querySelectorAll('[data-tilt]');

  // Desativa tilt no mobile para melhor performance/usabilidade
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - y) / centerY) * 8; // Máx 8 graus
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }
});