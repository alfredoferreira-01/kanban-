import { useState, useEffect } from "react";
import FormularioTarefa from "./FormularioTarefa";
import Footer from "../Componentes/Footer/Footer";
import "./Minikanban.css";
import Sidebar from "../Componentes/Sidebar/Sidebar";
import api from "../api/api";

function MiniKanban() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // GET - carregar tarefas da API
  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregando(true);
        setErro("");
        const resposta = await api.get("/tarefas");
        setTarefas(resposta.data);
      } catch (e) {
        setErro("Erro ao carregar tarefas. Verifique a conexão.");
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }
    carregarTarefas();
  }, []);

  // POST - criar tarefa
  async function salvarTarefa(dados) {
    if (dados.id === undefined) {
      // CRIAR — POST /tarefas
      try {
        const resposta = await api.post("/tarefas", dados);
        setTarefas([...tarefas, resposta.data]);
      } catch (err) {
        setErro("Erro ao criar tarefa.");
      }
    } else {
      // EDITAR — PUT /tarefas/:id
      try {
        const resposta = await api.put(`/tarefas/${dados.id}`, dados);
        // usar resposta.data garante que o estado reflete o servidor
        setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
      } catch (err) {
        setErro("Erro ao editar tarefa.");
      }
    }
  }

  async function deletarTarefa(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      // só remove do estado após confirmar no servidor
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (err) {
      setErro("Erro ao deletar tarefa.");
    }
  }
  // MOVER — PUT /tarefas/:id com nova coluna
  async function moverTarefa(id, novaColuna) {
    const resposta = await api.put(`/tarefas/${id}`, { coluna: novaColuna });
    setTarefas(tarefas.map((t) => (t.id === id ? resposta.data : t)));
  }

  return (
    <div className="container">
      <Sidebar />
      {carregando && (
        <p style={{ textAlign: "center", color: "#94A3B8" }}>
          Carregando tarefas...
        </p>
      )}

      {erro && <p style={{ textAlign: "center", color: "#EF4444" }}>{erro}</p>}

      {!carregando && !erro && <div className="kanban-quadro"></div>}

      {!carregando && (
        <FormularioTarefa
          tarefas={tarefas}
          setTarefas={setTarefas}
          salvarTarefa={salvarTarefa}
          moverTarefa={moverTarefa}
          removerTarefa={deletarTarefa}
        />
      )}

      <Footer />
    </div>
  );
}

export default MiniKanban;
