document.addEventListener("DOMContentLoaded", () => {
    const cep = document.getElementById("cep");
    const nome = document.getElementById("nome");
    const cadastrar = document.getElementById("cadastrar");
    let cepValue = '';
    let data = null;
    let nomeSave = null;

    const armazenado = localStorage.getItem("armazem");
    let armazem = armazenado ? JSON.parse(armazenado) : [];

    cep.addEventListener("input", () => {
        cepValue = cep.value.replace(/\D/g, '');

        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
                .then(response => response.json())
                .then(responseData => {
                    if (responseData.erro) {
                        alert("CEP não encontrado");
                        data = null;
                    } else {
                        console.log("feito")
                        data = responseData;
                        document.getElementById('logradouro').value = data.logradouro;
                        document.getElementById('num').value = data.num;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('localidade').value = data.localidade;
                    }
                })
                .catch(error => {
                    console.error('Erro ao consultar o CEP:', error);
                    alert('Erro ao consultar o CEP');
                    data = null;
                });
        }
    });

    nome.addEventListener("input", () => {
        nomeSave = nome.value;
    })

    cadastrar.addEventListener("click", () => {
        if (data) {
            armazem.push(nomeSave + ",\n" +
                cepValue + ",\n" +
                (data.logradouro || "Logradouro não encontrado") + ",\n" +
                (data.num || "Número não encontrado") + ",\n" +
                (data.bairro || "Bairro não encontrado") + ",\n" +
                (data.localidade || "Cidade não encontrada") + ",\n" +
                (document.getElementById('uf').value || "UF não encontrada")
            );
            alert("Dados salvos!")
            localStorage.setItem("armazem", JSON.stringify(armazem));
            listar()
            console.log("cadastro")
        }
    });


    const saida = document.getElementById('saida');

    const del = document.getElementById('bttn');

    function listar(){
        saida.innerHTML = "";

        armazem.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            saida.appendChild(li);
            let botao = document.createElement('button');
            botao.setAttribute("id","bttn")
            botao.title = "Deletar"
            console.log(botao)
            li.appendChild(botao);
        });
        console.log("listo")
    }

    del.addEventListener("click", () => {
        let nod = del.getRootNode(del);
        nod.removeChild();
        
    })


});
