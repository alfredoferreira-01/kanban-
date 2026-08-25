import "./App.css";

function App() {
  // Função que retorna uma Promise (boa prática para reutilização)
  const criarMinhaPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const operacaoDeuCerto = true;

        if (operacaoDeuCerto) {
          resolve("Dados chegaram!");
        } else {
          reject("Algo deu errado");
        }
      }, 5000); 
    });
  };

  
  async function buscarUsuario(id) {
    try {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id
      );
      const usuario = await resposta.json();
      console.log("Nome do usuário:", usuario.name);
    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro);
    } finally {
      console.log("Busca finalizada");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Estudando Promises no React</h1>

      <button
        style={{ marginRight: "10px", padding: "10px" }}
        onClick={() => {
          console.log("Promise acionada pelo botão...");
          criarMinhaPromise()
            .then((mensagem) => {
              console.log("Sucesso:", mensagem);
            })
            .catch((erro) => {
              console.error("Erro:", erro);
            });
        }}
      >
        Testar Promise (.then/.catch)
      </button>

      
      <button
        style={{ padding: "10px" }}
        onClick={() => {
          buscarUsuario(1); 
        }}
      >
        Buscar Usuário (Async/Await)
      </button>
    </div>
  );
}
export default App;     
