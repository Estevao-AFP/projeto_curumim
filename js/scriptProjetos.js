let projetoEditando = null;


function gerarIdProjeto() {

    let ultimoId =

        parseInt(

            localStorage.getItem(
                "ultimoIdProjeto"
            )

        ) || 0;

    ultimoId++;

    localStorage.setItem(

        "ultimoIdProjeto",

        ultimoId

    );

    return ultimoId;

}


document.addEventListener("DOMContentLoaded", () => {

    carregarOrganizadoresSelect();

    carregarProjetos();

    document
        .getElementById("projetoForm")
        .addEventListener(

            "submit",

            salvarOuAtualizarProjeto

        );

    document
        .getElementById("btn_cancelar")
        .addEventListener(

            "click",

            limparFormulario

        );

});

function carregarOrganizadoresSelect() {

    const organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];

    const select =

        document.getElementById(
            "organizadores"
        );

    select.innerHTML = "";

    if (organizadores.length === 0) {

        select.innerHTML = `

            <option disabled>

                Nenhum organizador cadastrado

            </option>

        `;

        return;

    }

    organizadores.forEach(org => {

        select.innerHTML += `

            <option value="${org.id}">

                ${org.nome}

            </option>

        `;

    });

}


function salvarOuAtualizarProjeto(event) {

    event.preventDefault();

    let projetos =

        JSON.parse(
            localStorage.getItem(
                "projetos"
            )
        ) || [];


    const projeto = {

        id:

            projetoEditando !== null

                ?

                projetos[projetoEditando].id

                :

                gerarIdProjeto(),

        nome:

            document.getElementById(
                "nome_projeto"
            ).value,

        descricao:

            document.getElementById(
                "desc_projeto"
            ).value,

        inicio:

            document.getElementById(
                "dt_inicio"
            ).value,

        termino:

            document.getElementById(
                "dt_termino"
            ).value,

        faixaEtaria:

            document.getElementById(
                "faixa_etariaDe"
            ).value +

            " - " +

            document.getElementById(
                "faixa_etariaA"
            ).value,

        status:

            document.getElementById(
                "status"
            ).value,

        organizadores:

            $("#organizadores").val()

    };


    if (projetoEditando !== null) {

        projetos = projetos.map(

            (p, index) =>

                index === projetoEditando

                    ?

                    projeto

                    :

                    p

        );

        projetoEditando = null;

        document.getElementById(
            "btn_salvar"
        ).innerText =

            "Salvar Projeto";

    }

    else {

        projetos.push(
            projeto
        );

    }


    localStorage.setItem(

        "projetos",

        JSON.stringify(
            projetos
        )

    );


    limparFormulario();

    atualizarTabela();

}


function carregarProjetos() {

    const projetos =

        JSON.parse(

            localStorage.getItem(
                "projetos"
            )

        ) || [];

    projetos.forEach(

        (projeto, index) =>

            adicionarProjetoTabela(

                projeto,

                index

            )

    );

}


function adicionarProjetoTabela(
    projeto,
    index
) {

    const tabela =

        document.querySelector(
            "#projetoTable tbody"
        );

    const linha =

        tabela.insertRow();


    linha.innerHTML = `

        <td>

            #${projeto.id}

        </td>

        <td>

            ${projeto.nome}

        </td>

        <td>

            ${projeto.descricao}

        </td>

        <td>

            ${projeto.inicio}

        </td>

        <td>

            ${projeto.termino}

        </td>

        <td>

            ${projeto.faixaEtaria}

        </td>

        <td>

            ${projeto.status}

        </td>

        <td>

           ${buscarNomesOrganizadores(
            projeto.organizadores
            )}

        </td>

        <td>

            <button
                onclick="editarProjeto(${index})">

                Editar

            </button>

            <button
                onclick="removerProjeto(${index})">

                Excluir

            </button>

        </td>

    `;

}

function buscarNomesOrganizadores(ids){

    const organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];

    return ids.map(id => {

        const org = organizadores.find(

            o => o.id == id

        );

        return org

            ? org.nome

            : "Removido";

    }).join(", ");

}


function editarProjeto(index) {

    const projetos =

        JSON.parse(

            localStorage.getItem(
                "projetos"
            )

        ) || [];

    const projeto =

        projetos[index];


    document.getElementById(
        "nome_projeto"
    ).value =

        projeto.nome;


    document.getElementById(
        "desc_projeto"
    ).value =

        projeto.descricao;


    document.getElementById(
        "dt_inicio"
    ).value =

        projeto.inicio;


    document.getElementById(
        "dt_termino"
    ).value =

        projeto.termino;


    const faixa =

        projeto.faixaEtaria.split(
            " - "
        );


    document.getElementById(
        "faixa_etariaDe"
    ).value =

        faixa[0];


    document.getElementById(
        "faixa_etariaA"
    ).value =

        faixa[1];


    document.getElementById(
        "status"
    ).value =

        projeto.status;


    $("#organizadores")

        .val(
            projeto.organizadores
        )

        .trigger(
            "change"
        );


    projetoEditando = index;


    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Atualizar Projeto";

}


function removerProjeto(index) {

    let projetos =

        JSON.parse(

            localStorage.getItem(
                "projetos"
            )

        ) || [];

    projetos.splice(
        index,
        1
    );

    localStorage.setItem(

        "projetos",

        JSON.stringify(
            projetos
        )

    );

    atualizarTabela();

}


function atualizarTabela() {

    const tbody =

        document.querySelector(
            "#projetoTable tbody"
        );

    tbody.innerHTML = "";

    carregarProjetos();

}


function limparFormulario() {

    document.getElementById(
        "projetoForm"
    ).reset();

    $("#organizadores")

        .val(null)

        .trigger(
            "change"
        );

    projetoEditando = null;

    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Salvar Projeto";

}