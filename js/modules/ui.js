/* Componentes de interface genéricos: toast e modal (event delegation) */
window.ONG = window.ONG || {};

ONG.ui = (function () {
  function toast(mensagem) {
    document.querySelectorAll('.toast').forEach(function (antigo) { antigo.remove(); });
    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = mensagem;
    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); });
  }

  function iniciarModais(app) {
    app.addEventListener('click', function (evento) {
      var abrir = evento.target.closest('[data-abrir-modal]');
      if (abrir) {
        document.getElementById(abrir.dataset.abrirModal).showModal();
        return;
      }
      var fechar = evento.target.closest('[data-fechar-modal]');
      if (fechar) { fechar.closest('dialog').close(); }
    });
  }

  return { toast: toast, iniciarModais: iniciarModais };
})();
