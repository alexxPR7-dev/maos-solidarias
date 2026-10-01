/* Máscaras de entrada: CPF, telefone e CEP */
window.ONG = window.ONG || {};

ONG.mascaras = (function () {
  var formatos = {
    cpf: function (v) {
      return v.slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    },
    telefone: function (v) {
      return v.slice(0, 11).replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    },
    cep: function (v) {
      return v.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
    }
  };

  function aplicar(campo) {
    var formatar = formatos[campo.id];
    if (formatar) {
      campo.value = formatar(campo.value.replace(/\D/g, ''));
    }
  }

  return { aplicar: aplicar };
})();
