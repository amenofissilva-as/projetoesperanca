// Controle do menu responsivo em telas menores.
const botaoMenu = document.querySelector("#menu-toggle");
const navegacao = document.querySelector("#navegacao-principal");

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.innerHTML = aberto ? "✕ <span>Fechar menu</span>" : "☰ <span>Menu</span>";
  });

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navegacao.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.innerHTML = "☰ <span>Menu</span>";
    });
  });
}

// Aplica formatação visual aos campos e mantém os padrões compatíveis com as validações HTML.
    const cpf = document.querySelector("#cpf");
    const telefone = document.querySelector("#telefone");
    const cep = document.querySelector("#cep");

    function apenasNumeros(valor) {
      return valor.replace(/\D/g, "");
    }

    cpf.addEventListener("input", () => {
      let v = apenasNumeros(cpf.value).slice(0, 11);
      if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
      else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
      else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
      cpf.value = v;
    });

    telefone.addEventListener("input", () => {
      let v = apenasNumeros(telefone.value).slice(0, 11);
      if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      else if (v.length) v = "(" + v;
      telefone.value = v;
    });

    cep.addEventListener("input", () => {
      let v = apenasNumeros(cep.value).slice(0, 8);
      if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
      cep.value = v;
    });

    const form = document.querySelector("#form-cadastro");
    const mensagem = document.querySelector("#mensagem-formulario");
    const opcoesParticipacao = [...document.querySelectorAll('input[name="participacao"]')];

    form.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const selecionouParticipacao = opcoesParticipacao.some((opcao) => opcao.checked);
      if (!selecionouParticipacao) {
        mensagem.textContent = "Selecione pelo menos uma forma de participação antes de enviar.";
        mensagem.classList.remove("alerta-sucesso");
        mensagem.classList.add("alerta-erro", "visivel");
        opcoesParticipacao[0].focus();
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      mensagem.textContent = "Validação concluída! Este é um envio demonstrativo: nenhum dado foi transmitido ou armazenado. Para receber cadastros reais, é necessário conectar o formulário a um servidor seguro.";
      mensagem.classList.remove("alerta-erro");
      mensagem.classList.add("alerta-sucesso", "visivel");
      mensagem.scrollIntoView({ behavior: "smooth", block: "center" });
      mostrarToast("Validação demonstrativa concluída. Nenhum dado foi enviado ou armazenado.");
    });

    form.addEventListener("reset", () => {
      mensagem.textContent = "";
      mensagem.classList.remove("visivel", "alerta-erro", "alerta-sucesso");
    });

    // Modal institucional e toast de demonstração para as capturas da atividade.
    const modalInstituto = document.querySelector("#modal-instituto");
    const abrirModal = document.querySelector("#abrir-modal");
    const fecharModal = document.querySelector("#fechar-modal");
    const toastFeedback = document.querySelector("#toast-feedback");
    const testarToast = document.querySelector("#testar-toast");
    let temporizadorToast;

    function mostrarToast(texto) {
      if (!toastFeedback) return;
      toastFeedback.textContent = texto;
      toastFeedback.classList.add("visivel");
      window.clearTimeout(temporizadorToast);
      temporizadorToast = window.setTimeout(() => {
        toastFeedback.classList.remove("visivel");
      }, 4000);
    }

    if (abrirModal && modalInstituto && typeof modalInstituto.showModal === "function") {
      abrirModal.addEventListener("click", () => modalInstituto.showModal());
    }
    if (fecharModal && modalInstituto) {
      fecharModal.addEventListener("click", () => modalInstituto.close());
    }
    if (modalInstituto) {
      modalInstituto.addEventListener("click", (evento) => {
        if (evento.target === modalInstituto) modalInstituto.close();
      });
    }
    if (testarToast) {
      testarToast.addEventListener("click", () => {
        mostrarToast("Exemplo de feedback: sua interação foi reconhecida. Esta é uma notificação demonstrativa.");
      });
    }

    document.querySelector("#ano").textContent = new Date().getFullYear();
