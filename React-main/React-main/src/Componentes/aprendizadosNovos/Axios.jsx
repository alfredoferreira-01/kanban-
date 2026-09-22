{
  /*import axios from "axios";

function Axios() {

        async function exemplo() {
          try {
            const resposta = await axios.get(
              "https://jsonplaceholder.typicode.com/users/1",
            );
            console.log(resposta);
            console.log(resposta.data.email);         
            console.log(resposta.data.name); 
            console.log(resposta.status); 

          } catch (erro) {
            console.log(erro.message);
          }
        }

  return (
    <div>
      <button onClick={exemplo}>Botão Axios</button>
      
    </div>
  );
}

export default Axios;*/
}

import { useState } from "react";
import axios from "axios";

function Axios() {
  
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  async function exemplo() {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(resposta.data);
      setEndereco(resposta.data.logradouro);
    } catch (erro) {
      console.error("Erro ao carregar:", erro);
      setEndereco("Erro ao carregar");
    }
  }
  return (
    <div>
    
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o cep"
      />
      <button onClick={exemplo}>Buscar CEP</button>
      <br />
      <input type="text" value={endereco} placeholder="Endereço" readOnly />
    </div>
  );
}

export default Axios;