import Header from "../componentes/Header";
import ListaTarefas from "../componentes/ListaTarefas";
import Contador from "../componentes/Contador";
import { useEffect, useState } from "react";

function Kanban() {
  const [tarefas, setTarefas] = useState(() => {
    const salvo = localStorage.getItem("tarefas");
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao ler localStorage:", e);
      }
    }
    return [];
  });

  const [proximaId, setProximaId] = useState(() => {
    const salvo = localStorage.getItem("tarefas");
    if (salvo) {
      try {
        const dados = JSON.parse(salvo);
        if (dados.length > 0) {
          return Math.max(...dados.map((t) => t.id || 0)) + 1;
        }
      } catch (e) {
        console.error("Erro ao ler proximaId:", e);
      }
    }
    return 1;
  });

  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const total = tarefas.length;
  const concluidas = tarefas.filter(
    (t) => t.coluna === "teste" || t.concluida,
  ).length;
  const pendentes = total - concluidas;

  const adicionarTarefa = (e) => {
    if (e) e.preventDefault();
    if (texto.trim() === "") {
      return;
    }
    const novaTarefa = {
      id: proximaId,
      texto: texto.trim(),
      concluida: false,
      prioridade: prioridade,
      coluna: "afazer",
    };
    setTarefas((prev) => [...prev, novaTarefa]);
    setProximaId((prev) => prev + 1);
    setTexto("");
    setPrioridade("media");
  };

  function deletarTarefa(id) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function moverTarefa(id, novaColuna) {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              coluna: novaColuna,
              concluida: novaColuna === "teste" ? true : t.concluida,
            }
          : t,
      ),
    );
  }

  function concluirTarefa(id) {
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
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
      </main>
      <footer>
        <p>TaskFlow &copy; 2026 &mdash; ALFREDO FERREIRA </p>
      </footer>
    </>
  );
}

export default Kanban;