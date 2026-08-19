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
