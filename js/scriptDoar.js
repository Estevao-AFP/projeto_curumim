document.addEventListener("DOMContentLoaded", () => {

    carregarProjetosDoacao();

    configurarAlternanciaCampos();

    const selectProjeto =
        document.getElementById("projeto");

    if(selectProjeto){

        selectProjeto.addEventListener(

            "change",

            carregarMateriaisProjeto

        );

    }

});

function carregarProjetosDoacao(){

    const projetos =

        JSON.parse(
            localStorage.getItem(
                "projetos"
            )
        ) || [];

    const selectProjeto =

        document.getElementById(
            "projeto"
        );

    if(!selectProjeto) return;

    selectProjeto.innerHTML =

        `<option value="">
            Escolha um projeto
        </option>`;

    projetos.forEach(projeto => {

        selectProjeto.innerHTML += `

            <option value="${projeto.id}">
                ${projeto.nome}
            </option>

        `;

    });

}

function carregarMateriaisProjeto(){

    const projetoId = parseInt(

        document.getElementById(
            "projeto"
        ).value

    );

    const selectMaterial =

        document.getElementById(
            "material"
        );

    if(!selectMaterial) return;

    selectMaterial.innerHTML =

        `<option value="">
            Escolha um material
        </option>`;

    if(!projetoId) return;

    const alocacoes =

        JSON.parse(
            localStorage.getItem(
                "alocacoes"
            )
        ) || [];

    const alocacao =

        alocacoes.find(

            a =>

            a.projetoId === projetoId

        );

    if(!alocacao){

        selectMaterial.innerHTML =

        `<option value="">
            Nenhum material alocado
        </option>`;

        return;

    }

    alocacao.recursos.forEach(recurso => {

        selectMaterial.innerHTML += `

            <option value="${recurso.materialId}">

                ${recurso.materialNome}

                (${recurso.quantidadeAtual}/${recurso.quantidadeNecessaria})

            </option>

        `;

    });

}

function configurarAlternanciaCampos(){

    const botoesTipo =
        document.querySelectorAll(
            ".tipo-btn"
        );

    const campoMaterial =
        document.getElementById(
            "campoMaterial"
        );

    const areaValor =
        document.getElementById(
            "areaValor"
        );

    const areaPagamento =
        document.getElementById(
            "areaPagamento"
        );

    const resumoDoacao =
        document.getElementById(
            "resumoDoacao"
        );

    const areaBotao =
        document.getElementById(
            "areaBotao"
        );

    const instrucoesMaterial =
        document.getElementById(
            "instrucoesMaterial"
        );

    botoesTipo.forEach(botao => {

        botao.addEventListener(

            "click",

            function(){

                botoesTipo.forEach(

                    b =>

                    b.classList.remove(
                        "active"
                    )

                );

                this.classList.add(
                    "active"
                );

                const tipo =
                    this.dataset.tipo;

                if(tipo === "material"){

                    campoMaterial.classList.remove(
                        "escondido"
                    );

                    instrucoesMaterial.classList.remove(
                        "escondido"
                    );

                    areaValor.classList.add(
                        "escondido"
                    );

                    areaPagamento.classList.add(
                        "escondido"
                    );

                    resumoDoacao.classList.add(
                        "escondido"
                    );

                    areaBotao.classList.add(
                        "escondido"
                    );

                }

                else{

                    campoMaterial.classList.add(
                        "escondido"
                    );

                    instrucoesMaterial.classList.add(
                        "escondido"
                    );

                    areaValor.classList.remove(
                        "escondido"
                    );

                    areaPagamento.classList.remove(
                        "escondido"
                    );

                    resumoDoacao.classList.remove(
                        "escondido"
                    );

                    areaBotao.classList.remove(
                        "escondido"
                    );

                }

            }

        );

    });

}