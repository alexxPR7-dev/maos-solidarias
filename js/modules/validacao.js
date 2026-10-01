/* Validação de formulários com feedback visual (Constraint Validation API + regras extras) */
window.ONG = window.ONG || {};

ONG.validacao = (function () {
  function cpfValido(valor) {
    var n = valor.replace(/\D/g, '');
    if (n.length !== 11 || /^(\d)\1+$/.test(n)) { return false; }
    for (var t = 9; t < 11; t++) {
      var soma = 0;
      for (var i = 0; i < t; i++) { soma += Number(n[i]) * (t + 1 - i); }
      if (((soma * 10) % 11) % 10 !== Number(n[t])) { return false; }
    }
    return true;
  }

  function idadeMinima(valor, anos) {
    var nasc = new Date(valor + 'T00:00:00');
    var limite = new Date();
    limite.setFullYear(limite.getFullYear() - anos);
    return !isNaN(nasc) && nasc <= limite;
  }

  /* Retorna a mensagem de erro do campo ou '' quando está válido */
  function mensagemDoCampo(campo) {
    var valor = campo.value.trim();
    if (campo.validity.valueMissing) { return 'Este campo é obrigatório.'; }
    if (valor === '') { return ''; }
    if (campo.validity.typeMismatch) { return 'Informe um e-mail válido, como nome@exemplo.com.'; }
    if (campo.validity.patternMismatch) { return campo.title || 'Formato inválido.'; }
    if (campo.validity.rangeUnderflow) { return 'Informe um número maior que zero.'; }
    if (campo.id === 'cpf' && !cpfValido(valor)) { return 'CPF inválido. Confira os dígitos.'; }
    if (campo.id === 'nascimento' && !idadeMinima(valor, 16)) {
      return 'É necessário ter pelo menos 16 anos para ser voluntário.';
    }
    return '';
  }

  /* Altera o DOM: classe de estado, atributos ARIA e mensagem abaixo do campo */
  function mostrarEstado(campo, mensagem) {
    var idErro = 'erro-' + campo.id;
    var elErro = document.getElementById(idErro);
    if (mensagem) {
      if (!elErro) {
        elErro = document.createElement('span');
        elErro.id = idErro;
        elErro.className = 'msg-erro';
        elErro.setAttribute('role', 'alert');
        campo.insertAdjacentElement('afterend', elErro);
      }
      elErro.textContent = mensagem;
      campo.classList.add('campo-erro');
      campo.classList.remove('campo-ok');
      campo.setAttribute('aria-invalid', 'true');
      campo.setAttribute('aria-describedby', idErro);
    } else {
      if (elErro) { elErro.remove(); }
      campo.classList.remove('campo-erro');
      campo.classList.toggle('campo-ok', campo.value.trim() !== '');
      campo.removeAttribute('aria-invalid');
      campo.removeAttribute('aria-describedby');
    }
  }

  function validarCampo(campo) {
    var mensagem = mensagemDoCampo(campo);
    mostrarEstado(campo, mensagem);
    return mensagem === '';
  }

  function validarFormulario(form) {
    var valido = true;
    var primeiroInvalido = null;
    form.querySelectorAll('input, select, textarea').forEach(function (campo) {
      if (!validarCampo(campo)) {
        valido = false;
        if (!primeiroInvalido) { primeiroInvalido = campo; }
      }
    });
    if (primeiroInvalido) { primeiroInvalido.focus(); }
    return valido;
  }

  function limparEstados(form) {
    form.querySelectorAll('.campo-ok, .campo-erro').forEach(function (campo) {
      campo.classList.remove('campo-ok', 'campo-erro');
    });
    form.querySelectorAll('.msg-erro').forEach(function (msg) { msg.remove(); });
  }

  return { validarCampo: validarCampo, validarFormulario: validarFormulario, limparEstados: limparEstados };
})();
