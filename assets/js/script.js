const toast = document.getElementById('toast');

const showToast = (message) => {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 1600);
};

const channelButtons = document.querySelectorAll('.channel-toggle');
const twitchEmbeds = {
  dukoth: document.getElementById('twitch-embed-dukoth'),
  duke: document.getElementById('twitch-embed-duke'),
};

const setActiveChannel = (channel) => {
  channelButtons.forEach((button) => {
    const isActive = button.dataset.channel === channel;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  Object.entries(twitchEmbeds).forEach(([key, embed]) => {
    if (!embed) return;
    embed.hidden = key !== channel;
  });
};

channelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveChannel(button.dataset.channel);
  });
});

document.querySelectorAll('.copy-link').forEach((button) => {
  button.addEventListener('click', async () => {
    const url = button.dataset.url;
    const label = button.dataset.name;

    try {
      await navigator.clipboard.writeText(url);
      button.textContent = 'link copiado!';
      showToast(`${label} copiado`);
    } catch (error) {
      button.textContent = 'erro ao copiar';
      showToast('Erro ao copiar link');
    }

    setTimeout(() => {
      button.textContent = label;
    }, 1200);
  });
});

const track = document.querySelector(".partners__track");
const group = document.querySelector(".partners__group");

function updateCarousel() {
    if (!track || !group) return;

    const distance = group.getBoundingClientRect().width;

    track.style.setProperty("--scroll-distance", `-${distance}px`);

    const duration = distance / 60;

    track.style.animationDuration = `${duration}s`;
}

updateCarousel();

window.addEventListener("resize", updateCarousel);

const revealElements = document.querySelectorAll(
    ".hero, .live-events, .video-stack-section, .partners, .benefits, .how-it-works, .discord-call, .links, .faq, .socials"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});
const eventButtons = document.querySelectorAll(".event-more-btn");

eventButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".event-card");

        const isOpen = card.classList.toggle("is-open");

        button.setAttribute("aria-expanded", isOpen);

        button.childNodes[0].textContent = isOpen
            ? "Mostrar menos "
            : "Saiba mais ";
    });
});