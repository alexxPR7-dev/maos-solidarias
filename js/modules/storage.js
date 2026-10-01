/* Persistência no navegador com localStorage (valores guardados como JSON/string) */
window.ONG = window.ONG || {};

ONG.storage = (function () {
  var CHAVE_VOLUNTARIOS = 'ong:voluntarios';
  var CHAVE_RASCUNHO = 'ong:rascunho';

  /* get + JSON.parse, com valor padrão se não existir ou se o JSON estiver corrompido */
  function ler(chave, padrao) {
    try {
      var bruto = localStorage.getItem(chave);
      return bruto === null ? padrao : JSON.parse(bruto);
    } catch (erro) {
      return padrao;
    }
  }

  /* JSON.stringify + set; retorna false se o navegador bloquear ou o limite for atingido */
  function salvar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (erro) {
      return false;
    }
  }

  function remover(chave) {
    try { localStorage.removeItem(chave); } catch (erro) { /* ignora */ }
  }

  return {
    CHAVE_VOLUNTARIOS: CHAVE_VOLUNTARIOS,
    CHAVE_RASCUNHO: CHAVE_RASCUNHO,
    ler: ler,
    salvar: salvar,
    remover: remover
  };
})();
