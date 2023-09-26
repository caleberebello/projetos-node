<script>
    let teste = ""

    async function retornaBanco() {
        try{
            const response = await fetch("http://localhost:4003/teste");
            const data = await response.json();
            teste = JSON.stringify(data);
        }
        catch(e) {
            teste = "Erro";
        }
    }
</script>

<button on:click={retornaBanco}>Teste</button>
<p>{teste}</p>