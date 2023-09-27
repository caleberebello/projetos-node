<script>
    let plataforma = "Ambiente de Testes";
    let teste = "";
    let novoDado = "";
    
    async function retornaBanco() {
        try{
            const response = await fetch("http://localhost:4003/teste/retornar");
            const data = await response.json();
            teste = data;
        }
        catch(e) {
            teste = "Erro";
            console.log(e);
        }
    }

    async function adicionaBanco() {
        try {
            const data = new FormData();
            data.append({nome, idade, id}, JSON.stringify(novoDado));
            await fetch("http://localhost:4003/teste/criar", {
                method: 'POST',
                body: data
            })
            .then(response=>response.json())
            .then(data=>{
                alert(data);
                retornaBanco();
            });
        } catch(e) {
            console.log(e);
        }
    }
</script>

<h2>{plataforma}</h2>

<form action="http://localhost:4003/teste/criar" on:submit={adicionaBanco}>
    <label for="nome">
        <p>Nome:</p>
    </label>
    <input type="text" id="nome" name="nome">
    <label for="idade">
        <p>Idade:</p>
    </label>
    <input type="number" id="idade" name="idade">
    <label for="id">
        <p>ID:</p>
    </label>
    <input type="number" id="id" name="id">
    <input type="submit" value="Nova Entrada">
</form>

<br>

<button on:click={retornaBanco}>Mostrar Dados</button>
{#each teste as testes (testes.id)}
    <div class="card">
        <h2>Nome: {testes.nome}</h2>
        <p>Idade: {testes.idade}</p>
    </div>
{/each}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

    .card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    }

    h2,p {
        font-family: 'Poppins', sans-serif;
    }

</style>