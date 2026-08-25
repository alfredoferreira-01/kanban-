import { useState } from "react";
import axios from "axios";


function TesteAxios() {
  // Mudamos o nome do estado de 'usuario' para 'endereco' para fazer mais sentido
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);

  async function exemplo() {
    try {
      const resposta = await axios.get(
        "https://viacep.com.br/ws/11000-000/json/",
      );

      console.log(resposta.data);

      
      setEndereco(resposta.data);
      setErro(null);
    } catch (erroCapturado) {
      console.log(erroCapturado.message);
      setErro(erroCapturado.message);
      setEndereco(null);
    }
  }

  return (
    <div>
      <button onClick={exemplo}>Testar Axios</button>

      
      {endereco && (
        <div>
          <p>Logradouro:{endereco.logradouro}</p>
          <p>Bairro: {endereco.bairro}</p>
          <p>
            Cidade: {endereco.localidade} - {endereco.uf}
          </p>
        </div>
      )}

      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
    </div>
  );
}

export default TesteAxios;
