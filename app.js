(() => {
  const tabs = document.querySelectorAll('[data-tab]');
  const forms = document.querySelectorAll('[data-form]');
  const title = document.querySelector('[data-title]');
  const subtitle = document.querySelector('[data-subtitle]');
  const toast = document.querySelector('[data-toast]');

  const copy = {
    login: {
      title: 'Bienvenido de nuevo',
      subtitle: 'Inicia sesión para continuar',
    },
    signup: {
      title: 'Crea tu cuenta',
      subtitle: 'Regístrate para empezar',
    },
  };

  function switchTo(target) {
    tabs.forEach((t) => {
      const active = t.dataset.tab === target;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    forms.forEach((f) => {
      f.hidden = f.dataset.form !== target;
    });
    if (copy[target]) {
      title.textContent = copy[target].title;
      subtitle.textContent = copy[target].subtitle;
    }
    hideToast();
  }

  tabs.forEach((t) => t.addEventListener('click', () => switchTo(t.dataset.tab)));

  document.querySelectorAll('[data-nav-tab]').forEach((b) => {
    b.addEventListener('click', () => {
      switchTo(b.dataset.navTab);
      document.querySelector('.auth-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  document.querySelectorAll('[data-switch-to]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      switchTo(a.dataset.switchTo);
    });
  });

  document.querySelectorAll('[data-toggle-pass]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.togglePass);
      if (!target) return;
      const showing = target.type === 'text';
      target.type = showing ? 'password' : 'text';
      btn.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
  }
  function hideToast() {
    if (!toast) return;
    toast.hidden = true;
    toast.textContent = '';
  }

  document.querySelectorAll('[data-google]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.google;
      showToast(
        mode === 'login'
          ? 'Conectando con Google…'
          : 'Creando cuenta con Google…'
      );
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        showToast('Revisa los datos e inténtalo de nuevo.');
        form.reportValidity();
        return;
      }
      const type = form.dataset.form;
      const message =
        type === 'login'
          ? 'Sesión iniciada. ¡Bienvenido de vuelta!'
          : 'Cuenta creada. ¡Te damos la bienvenida!';
      showToast(message);
    });
  });
})();
