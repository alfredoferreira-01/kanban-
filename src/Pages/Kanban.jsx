import Header from "../componentes/Header";
import ListaTarefas from "../componentes/ListaTarefas";
import Contador from "../componentes/Contador";
import { useEffect, useState } from "react";

const API_URL = "https://6a96d26c0e3240db906169de.mockapi.io/api/tarefa";

function Kanban() {
  const [tarefas, setTarefas] = useState([]);
  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [carregando, setCarregando] = useState(true);

  // 1. Buscar tarefas da API ao montar o componente
  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao buscar tarefas");
        const dados = await resposta.json();
        setTarefas(dados);
      } catch (erro) {
        console.error("Erro ao carregar do servidor:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  const total = tarefas.length;
  const concluidas = tarefas.filter(
    (t) => t.coluna === "teste" || t.concluida
  ).length;
  const pendentes = total - concluidas;

  // 2. Adicionar tarefa na API (POST)
  const adicionarTarefa = async (e) => {
    if (e) e.preventDefault();
    if (texto.trim() === "") return;

    const novaTarefa = {
      texto: texto.trim(),
      concluida: false,
      prioridade: prioridade,
      coluna: "afazer",
    };

    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTarefa),
      });

      if (!resposta.ok) throw new Error("Erro ao criar tarefa");

      const tarefaCriada = await resposta.json();
      setTarefas((prev) => [...prev, tarefaCriada]);
      setTexto("");
      setPrioridade("media");
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  };

  // 3. Deletar tarefa na API (DELETE)
  async function deletarTarefa(id) {
    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) throw new Error("Erro ao deletar tarefa");

      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (erro) {
      console.error("Erro ao deletar tarefa:", erro);
    }
  }

  // 4. Mover tarefa de coluna na API (PUT)
  async function moverTarefa(id, novaColuna) {
    const tarefaAtual = tarefas.find((t) => t.id === id);
    if (!tarefaAtual) return;

    const dadosAtualizados = {
      ...tarefaAtual,
      coluna: novaColuna,
      concluida: novaColuna === "teste" ? true : tarefaAtual.concluida,
    };

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!resposta.ok) throw new Error("Erro ao atualizar tarefa");

      setTarefas((prev) =>
        prev.map((t) => (t.id === id ? dadosAtualizados : t))
      );
    } catch (erro) {
      console.error("Erro ao mover tarefa:", erro);
    }
  }

  // 5. Concluir tarefa na API (PUT)
  async function concluirTarefa(id) {
    const tarefaAtual = tarefas.find((t) => t.id === id);
    if (!tarefaAtual) return;

    const dadosAtualizados = {
      ...tarefaAtual,
      concluida: !tarefaAtual.concluida,
    };

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!resposta.ok) throw new Error("Erro ao alternar conclusão");

      setTarefas((prev) =>
        prev.map((t) => (t.id === id ? dadosAtualizados : t))
      );
    } catch (erro) {
      console.error("Erro ao concluir tarefa:", erro);
    }
  }

  return (
    <>
      <Contador />
      <Header
        titulo="TaskFlow - Kanban"
        subtitulo="Gerencie e acompanhe o progresso do seu fluxo de trabalho"
        total={total}
        pendentes={pendentes}
        concluidas={concluidas}
      />
      <main className="container-kanban">
        <section id="formulario">
          <form className="campo-linha" onSubmit={adicionarTarefa}>
            <input
              id="input-tarefa"
              type="text"
              placeholder="Digite o título da nova tarefa..."
              required
              autoComplete="off"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <select
              id="sel-prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="baixa">🟢 Baixa</option>
              <option value="media">🟡 Média</option>
              <option value="alta">🔴 Alta</option>
            </select>
            <button id="btn-adicionar" type="submit">
              + Adicionar Tarefa
            </button>
          </form>
        </section>

        {carregando ? (
          <p style={{ textAlign: "center", margin: "20px" }}>
            Carregando tarefas...
          </p>
        ) : (
          <div className="kanban-quadro">
            {/* Coluna 1: A Fazer */}
            <div className="coluna coluna-afazer">
              <div className="coluna-header">
                <h2>📌 A Fazer</h2>
                <span className="coluna-badge">
                  {tarefas.filter((t) => t.coluna === "afazer").length}
                </span>
              </div>
              <ListaTarefas
                tarefas={tarefas.filter((t) => t.coluna === "afazer")}
                onDeletar={deletarTarefa}
                onConcluir={concluirTarefa}
                onMover={moverTarefa}
                colunaAtual="afazer"
              />
            </div>

            {/* Coluna 2: Em Andamento */}
            <div className="coluna coluna-andamento">
              <div className="coluna-header">
                <h2>⚡ Em Andamento</h2>
                <span className="coluna-badge">
                  {tarefas.filter((t) => t.coluna === "andamento").length}
                </span>
              </div>
              <ListaTarefas
                tarefas={tarefas.filter((t) => t.coluna === "andamento")}
                onDeletar={deletarTarefa}
                onConcluir={concluirTarefa}
                onMover={moverTarefa}
                colunaAtual="andamento"
              />
            </div>

            {/* Coluna 3: Concluídas / Em Teste */}
            <div className="coluna coluna-teste">
              <div className="coluna-header">
                <h2>✅ Concluídas</h2>
                <span className="coluna-badge">
                  {tarefas.filter((t) => t.coluna === "teste").length}
                </span>
              </div>
              <ListaTarefas
                tarefas={tarefas.filter((t) => t.coluna === "teste")}
                onDeletar={deletarTarefa}
                onConcluir={concluirTarefa}
                onMover={moverTarefa}
                colunaAtual="teste"
              />
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>TaskFlow &copy; 2026 &mdash; ALFREDO FERREIRA </p>
      </footer>
    </>
  );
}

export default Kanban;