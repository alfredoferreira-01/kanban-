import MiniKanban from "./MiniKanban/MiniKanban";


function App() {
  //ESSE DA ERRO
  const minhaPremise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const operacaoDeuCerto = true;

      if (operacaoDeuCerto) {
        resolve("Dados chegaram!");
      } else {
        reject("Algo deu errado!");
      }
    }, 4000);
  });

  //ESSE NÃO DA ERRO
  function execPromise() {
    const minhaPremise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado!");
        }
      }, 4000);
    });
    minhaPremise
      .then((mensagem) => {
        console.log("Sucesso:", mensagem);
      })
      .catch((erro) => {
        console.error("erro: ", erro);
      });
    console.log("Promisso criado, aguardando resultado...");
  }

  //CONSUMO DA API COM FETCH
  async function buscarUsuario(id) {
    try {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id,
      );
      console.log(resposta);
      const usuario = await resposta.json();

      console.log("Nome: ", usuario.name);
      return usuario;
    } catch (erro) {
      console.log("erro;", erro.message);
      return null;
    } finally {
      console.log("Finalizado");
    }
  }
  buscarUsuario(1);

  return (
    <div>
      <button
        onClick={() => {
          minhaPremise
            .then((mensagem) => {
              console.log("Sucesso:", mensagem);
            })
            .catch((erro) => {
              console.error("erro: ", erro);
            });
          console.log("Promisso criado, aguardando resultado...");
        }}
      >
        Testa promise
      </button>

      <button onClick={execPromise}>segundo botão</button>
      <button onClick={buscarUsuario}>Teste API</button>

      <MiniKanban />
    </div>
  );
}
export default App;
