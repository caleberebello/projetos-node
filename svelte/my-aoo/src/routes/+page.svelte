<script>
    let teste = "";

    async function retornaBanco() {
        try{
            const response = await fetch("http://localhost:4003/teste");
            const data = await response.json();
            teste = data;
        }
        catch(e) {
            teste = "Erro";
            console.log(e);
        }
    }
</script>

<button on:click={retornaBanco}>Teste</button>
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
        font-size: 20px;
    }
</style>