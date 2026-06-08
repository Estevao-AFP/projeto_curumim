let materialEditando = null;


function gerarIdMaterial(){

    let ultimoId =

        parseInt(
            localStorage.getItem(
                "ultimoIdMaterial"
            )
        ) || 0;

    ultimoId++;

    localStorage.setItem(

        "ultimoIdMaterial",

        ultimoId

    );

    return ultimoId;

}


document.addEventListener("DOMContentLoaded", () => {

    carregarMateriais();

    document.getElementById("materialForm")
        .addEventListener(

            "submit",

            salvarOuAtualizarMaterial

        );

    document.getElementById("btn_cancelar")
        .addEventListener(

            "click",

            limparFormulario

        );

});


function salvarOuAtualizarMaterial(event){

    event.preventDefault();

    let materiais =

        JSON.parse(

            localStorage.getItem(
                "materiais"
            )

        ) || [];


    const descricao =

        document.getElementById(
            "nome_material"
        ).value.trim();


    if(descricao === ""){

        alert(
            "Digite uma descrição."
        );

        return;

    }


    const material = {

        id:

            materialEditando !== null

            ?

            materiais[materialEditando].id

            :

            gerarIdMaterial(),

        descricao:

            descricao

    };


    if(materialEditando !== null){

        materiais = materiais.map(

            (m, index) =>

                index === materialEditando

                ?

                material

                :

                m

        );

        materialEditando = null;

        document.getElementById(
            "btn_salvar"
        ).innerText =

            "Salvar Material";

    }

    else{

        const existe = materiais.some(

            m =>

            m.descricao.toLowerCase()

            ===

            descricao.toLowerCase()

        );


        if(existe){

            alert(
                "Material já cadastrado!"
            );

            return;

        }

        materiais.push(
            material
        );

    }


    localStorage.setItem(

        "materiais",

        JSON.stringify(
            materiais
        )

    );


    limparFormulario();

    atualizarTabela();

}


function carregarMateriais(){

    const materiais =

        JSON.parse(

            localStorage.getItem(
                "materiais"
            )

        ) || [];


    materiais.forEach(

        (material, index) =>

            adicionarMaterialTabela(

                material,

                index

            )

    );

}


function adicionarMaterialTabela(
    material,
    index
){

    const tabela =

        document.querySelector(
            "#materialTable tbody"
        );

    const linha =

        tabela.insertRow();


    linha.innerHTML = `

        <td>

            #${material.id}

        </td>

        <td>

            ${material.descricao}

        </td>

        <td>

            <button
                onclick="editarMaterial(${index})">

                Editar

            </button>

            <button
                onclick="removerMaterial(${index})">

                Excluir

            </button>

        </td>

    `;

}


function editarMaterial(index){

    const materiais =

        JSON.parse(

            localStorage.getItem(
                "materiais"
            )

        ) || [];


    const material =

        materiais[index];


    document.getElementById(
        "nome_material"
    ).value =

        material.descricao;


    materialEditando = index;


    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Atualizar Material";

}


function removerMaterial(index){

    let materiais =

        JSON.parse(

            localStorage.getItem(
                "materiais"
            )

        ) || [];


    materiais.splice(

        index,

        1

    );


    localStorage.setItem(

        "materiais",

        JSON.stringify(
            materiais
        )

    );


    atualizarTabela();

}


function atualizarTabela(){

    const tbody =

        document.querySelector(
            "#materialTable tbody"
        );


    tbody.innerHTML = "";


    carregarMateriais();

}


function limparFormulario(){

    document.getElementById(
        "materialForm"
    ).reset();


    materialEditando = null;


    document.getElementById(
        "btn_salvar"
    ).innerText =

        "Salvar Material";

}