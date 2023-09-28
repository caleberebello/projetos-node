<script>
    let plataforma = "Ambiente de Testes";
    let teste = "";
    const banco = {
        kill: '',
        age: ''
    }
    
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
            await fetch("http://localhost:4003/teste/criar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: kill,
                    idade: age
                })
            })
            .then(response => response.json())
            .then(result => console.log(result))
        } catch(e) {
            console.log(e);
        }
    }
</script>

<h2>{plataforma}</h2>

<section>
    <form>
        <div>
            <label for="kill">
                <p>Nome:</p>
            </label>
            <input type="text" id="kill" bind:value={banco.kill}>
        </div>
        <div>
            <label for="age">
                <p>Idade:</p>
            </label>
            <input type="number" id="age" bind:value={banco.age}>
        </div>
        <button on:click="{adicionaBanco}">Nova Entrada</button>
    </form>
</section>

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

    label{font-weight:bolder;display:block;margin-bottom:4px}

</style>