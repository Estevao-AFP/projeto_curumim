let ultimoIdRecurso =
    parseInt(
        localStorage.getItem(
            "ultimoIdRecurso"
        )
    ) || 0;

let ultimoIdAlocacao =
    parseInt(
        localStorage.getItem(
            "ultimoIdAlocacao"
        )
    ) || 0;

let recursoEditando = null;

document.addEventListener(

    "DOMContentLoaded",

    () => {

        carregarSelects();

        carregarTabela();

        const form = document.getElementById(
            "formMateriais"
        );

        if(form){

            form.addEventListener(

                "submit",

                salvarMateriais

            );

        }

    }

);

function gerarIdRecurso(){

    ultimoIdRecurso++;

    localStorage.setItem(

        "ultimoIdRecurso",

        ultimoIdRecurso

    );

    return ultimoIdRecurso;

}

function gerarIdAlocacao(){

    ultimoIdAlocacao++;

    localStorage.setItem(

        "ultimoIdAlocacao",

        ultimoIdAlocacao

    );

    return ultimoIdAlocacao;

}

function carregarSelects(){

    const projetos =

        JSON.parse(
            localStorage.getItem(
                "projetos"
            )
        ) || [];

    const materiais =

        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];

    preencherProjetos(
        projetos
    );

    preencherMateriais(
        materiais
    );

}

function preencherProjetos(lista){

    const select =

        document.getElementById(
            "projetoMaterial"
        );

    if(!select) return;

    select.innerHTML =

    `<option value="">
        Selecione
    </option>`;

    lista.forEach(projeto => {

        select.innerHTML += `

        <option value="${projeto.id}">
            ${projeto.nome}
        </option>

        `;

    });

}

function preencherMateriais(lista){

    const select =

        document.getElementById(
            "materiais"
        );

    if(!select) return;

    select.innerHTML =

    `<option value="">
        Selecione
    </option>`;

    lista.forEach(material => {

        select.innerHTML += `

        <option value="${material.id}">
            ${material.descricao}
        </option>

        `;

    });

}

function salvarMateriais(event){

    event.preventDefault();

    let alocacoes =

        JSON.parse(
            localStorage.getItem(
                "alocacoes"
            )
        ) || [];

    const projetoId =

        parseInt(

            document.getElementById(
                "projetoMaterial"
            ).value

        );

    const materialId =

        parseInt(

            document.getElementById(
                "materiais"
            ).value

        );

    if(!projetoId || !materialId){

        alert(
            "Selecione projeto e material"
        );

        return;

    }

    const materiais =

        JSON.parse(
            localStorage.getItem(
                "materiais"
            )
        ) || [];

    const material =

        materiais.find(

            m =>

            m.id === materialId

        );

    const recurso = {

        id:

            recursoEditando ||

            gerarIdRecurso(),

        materialId:

            materialId,

        materialNome:

            material?.descricao ||

            "Material",

        quantidadeAtual:

            document.getElementById(
                "quantidade_atual"
            ).value,

        quantidadeNecessaria:

            document.getElementById(
                "quantidade_necessaria"
            ).value

    };

    let alocacao =

        alocacoes.find(

            a =>

            a.projetoId === projetoId

        );

    if(!alocacao){

        const projetos =

            JSON.parse(
                localStorage.getItem(
                    "projetos"
                )
            ) || [];

        const projeto =

            projetos.find(

                p =>

                p.id === projetoId

            );

        if(!projeto){

            alert(
                "Projeto não encontrado"
            );

            return;

        }

        alocacao = {

            id:

                gerarIdAlocacao(),

            projetoId:

                projeto.id,

            projetoNome:

                projeto.nome,

            recursos: []

        };

        alocacoes.push(
            alocacao
        );

    }

    if(recursoEditando){

        alocacao.recursos =

            alocacao.recursos.map(

                r =>

                r.id === recursoEditando

                ?

                recurso

                :

                r

            );

        recursoEditando = null;

    }

    else{

        alocacao.recursos.push(
            recurso
        );

    }

    localStorage.setItem(

        "alocacoes",

        JSON.stringify(
            alocacoes
        )

    );

    document
        .getElementById(
            "formMateriais"
        )
        .reset();

    carregarTabela();

}

function carregarTabela(){

    const tbody =

        document.querySelector(
            "#alocacaoTable tbody"
        );

    if(!tbody) return;

    tbody.innerHTML = "";

    const alocacoes =

        JSON.parse(
            localStorage.getItem(
                "alocacoes"
            )
        ) || [];

    alocacoes.forEach(a => {

        const linha =

            document.createElement(
                "tr"
            );

        linha.innerHTML = `

        <td>

            ${a.projetoNome}

        </td>

        <td>

        ${a.recursos.map(

            r => `

            <div>

            ${r.materialNome}

            (${r.quantidadeNecessaria}/${r.quantidadeAtual})

            <br>

            <button
            onclick="editarRecurso(
            ${a.projetoId},
            ${r.id}
            )">

            Editar

            </button>

            <button
            onclick="removerRecurso(
            ${a.projetoId},
            ${r.id}
            )">

            Excluir

            </button>

            </div>

            <hr>

            `

        ).join("")}

        </td>

        <td>

        <button
        onclick="removerAlocacao(
        ${a.projetoId}
        )">

        Excluir Alocação

        </button>

        </td>

        `;

        tbody.appendChild(
            linha
        );

    });

}

function editarRecurso(
    projetoId,
    recursoId
){

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

    if(!alocacao) return;

    const recurso =

        alocacao.recursos.find(

            r =>

            r.id === recursoId

        );

    if(!recurso) return;

    document.getElementById(
        "projetoMaterial"
    ).value = projetoId;

    document.getElementById(
        "materiais"
    ).value = recurso.materialId;

    document.getElementById(
        "quantidade_atual"
    ).value = recurso.quantidadeAtual;

    document.getElementById(
        "quantidade_necessaria"
    ).value = recurso.quantidadeNecessaria;

    recursoEditando = recurso.id;

}

function removerRecurso(
    projetoId,
    recursoId
){

    let alocacoes =

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

    if(!alocacao) return;

    alocacao.recursos =

        alocacao.recursos.filter(

            r =>

            r.id !== recursoId

        );

    if(
        alocacao.recursos.length === 0
    ){

        alocacoes =

            alocacoes.filter(

                a =>

                a.projetoId !== projetoId

            );

    }

    localStorage.setItem(

        "alocacoes",

        JSON.stringify(
            alocacoes
        )

    );

    carregarTabela();

}

function removerAlocacao(
    projetoId
){

    let alocacoes =

        JSON.parse(
            localStorage.getItem(
                "alocacoes"
            )
        ) || [];

    alocacoes =

        alocacoes.filter(

            a =>

            a.projetoId !== projetoId

        );

    localStorage.setItem(

        "alocacoes",

        JSON.stringify(
            alocacoes
        )

    );

    carregarTabela();

}