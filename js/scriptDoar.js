document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o carregamento dos selects com os dados do localStorage
    carregarSelectsDoacao();

    // Configuração para alternar a exibição dos campos baseado no Tipo de Doação
    configurarAlternanciaCampos();
});

function carregarSelectsDoacao() {
    // Busca os dados das chaves do localStorage (ou array vazio se não existirem)
    const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
    const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

    preencherSelectProjetos(projetos);
    preencherSelectMateriais(materiais);
}

function preencherSelectProjetos(lista) {
    const selectProjeto = document.getElementById("projeto");
    if (!selectProjeto) return;

    // Reseta o select mantendo apenas a opção padrão limpa
    selectProjeto.innerHTML = '<option value="">Escolha um projeto</option>';

    // Preenche dinamicamente com os dados salvos
    lista.forEach(projeto => {
        const option = document.createElement("option");
        option.value = projeto.id;
        option.textContent = projeto.nome;
        selectProjeto.appendChild(option);
    });
}

function preencherSelectMateriais(lista) {
    const selectMaterial = document.getElementById("material");
    if (!selectMaterial) return;

    // Reseta o select mantendo apenas a opção padrão limpa
    selectMaterial.innerHTML = '<option value="">Escolha um recurso / material</option>';

    // Preenche dinamicamente com os dados salvos
    lista.forEach(material => {
        const option = document.createElement("option");
        option.value = material.id;
        option.textContent = material.descricao;
        selectMaterial.appendChild(option);
    });
}

// Função utilitária opcional para garantir o comportamento visual da sua tela de doações
function configurarAlternanciaCampos() {
    const botoesTipo = document.querySelectorAll(".tipo-btn");
    const campoMaterial = document.getElementById("campoMaterial");
    const areaValor = document.getElementById("areaValor");
    const areaPagamento = document.getElementById("areaPagamento");
    const resumoDoacao = document.getElementById("resumoDoacao");
    const areaBotao = document.getElementById("areaBotao");
    const instrucoesMaterial = document.getElementById("instrucoesMaterial");

    botoesTipo.forEach(botao => {
        botao.addEventListener("click", function() {
            // Remove active de todos do grupo e adiciona no clicado
            botoesTipo.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const tipo = this.getAttribute("data-tipo");

            if (tipo === "material") {
                campoMaterial.classList.remove("escondido");
                instrucoesMaterial.classList.remove("escondido");
                
                // Oculta coisas de doação financeira se necessário
                if(areaValor) areaValor.classList.add("escondido");
                if(areaPagamento) areaPagamento.classList.add("escondido");
                if(resumoDoacao) resumoDoacao.classList.add("escondido");
                if(areaBotao) areaBotao.classList.add("escondido");
            } else {
                campoMaterial.classList.add("escondido");
                instrucoesMaterial.classList.add("escondido");
                
                if(areaValor) areaValor.classList.remove("escondido");
                if(areaPagamento) areaPagamento.classList.remove("escondido");
                if(resumoDoacao) resumoDoacao.classList.remove("escondido");
                if(areaBotao) areaBotao.classList.remove("escondido");
            }
        });
    });
}