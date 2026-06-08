let organizadorEditando = null;


function gerarIdOrganizador(){

    let ultimoId =

        parseInt(

            localStorage.getItem(
                "ultimoIdOrganizador"
            )

        ) || 0;

    ultimoId++;

    localStorage.setItem(

        "ultimoIdOrganizador",

        ultimoId

    );

    return ultimoId;

}


document.addEventListener("DOMContentLoaded", () => {

    carregarOrganizadores();

    document
        .getElementById("organizadorForm")
        .addEventListener(

            "submit",

            salvarOuAtualizarOrganizador

        );

    document
        .getElementById("btn_cancelar")
        .addEventListener(

            "click",

            limparFormulario

        );

});


function salvarOuAtualizarOrganizador(event){

    event.preventDefault();

    let organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];


    const organizador = {

        id:

            organizadorEditando !== null

            ?

            organizadores[
                organizadorEditando
            ].id

            :

            gerarIdOrganizador(),

        nome:

            document.getElementById(
                "nome_organizador"
            ).value,

        email:

            document.getElementById(
                "email_organizador"
            ).value

    };


    if(organizadorEditando !== null){

        organizadores =

            organizadores.map(

                (org, index) =>

                    index === organizadorEditando

                    ?

                    organizador

                    :

                    org

            );

        organizadorEditando = null;

        document.getElementById(
            "btn_salvar"
        ).innerText =

            "Salvar Organizador";

    }

    else{

        const emailExiste =

            organizadores.some(

                org =>

                org.email.toLowerCase()

                ===

                organizador.email.toLowerCase()

            );


        if(emailExiste){

            alert(
                "Esse email já está cadastrado!"
            );

            return;

        }

        organizadores.push(
            organizador
        );

    }


    localStorage.setItem(

        "organizadores",

        JSON.stringify(
            organizadores
        )

    );


    limparFormulario();

    atualizarTabela();

}


function carregarOrganizadores(){

    const organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];


    organizadores.forEach(

        (org, index) =>

            adicionarOrganizadorTabela(

                org,

                index

            )

    );

}


function adicionarOrganizadorTabela(
    organizador,
    index
){

    const tabela =

        document.querySelector(
            "#organizadorTable tbody"
        );

    const linha =

        tabela.insertRow();


    linha.innerHTML = `

        <td>

            #${organizador.id}

        </td>

        <td>

            ${organizador.nome}

        </td>

        <td>

            ${organizador.email}

        </td>

        <td>

            <button
                onclick="editarOrganizador(${index})">

                Editar

            </button>

            <button
                onclick="removerOrganizador(${index})">

                Excluir

            </button>

        </td>

    `;

}


function editarOrganizador(index){

    const organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];


    const organizador =

        organizadores[index];


    document.getElementById(
        "nome_organizador"
    ).value =

        organizador.nome;


    document.getElementById(
        "email_organizador"
    ).value =

        organizador.email;


    organizadorEditando = index;


    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Atualizar Organizador";

}


function removerOrganizador(index){

    let organizadores =

        JSON.parse(

            localStorage.getItem(
                "organizadores"
            )

        ) || [];


    organizadores.splice(
        index,
        1
    );


    localStorage.setItem(

        "organizadores",

        JSON.stringify(
            organizadores
        )

    );


    atualizarTabela();

}


function atualizarTabela(){

    const tbody =

        document.querySelector(
            "#organizadorTable tbody"
        );


    tbody.innerHTML = "";


    carregarOrganizadores();

}


function limparFormulario(){

    document.getElementById(
        "organizadorForm"
    ).reset();


    organizadorEditando = null;


    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Salvar Organizador";

}