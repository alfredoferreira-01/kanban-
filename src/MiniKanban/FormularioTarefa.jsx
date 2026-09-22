import { useState, useEffect } from "react";
import ColunaKanban from "./ColunaKanban";
import Header from "../Componentes/Header/Header";
import ModalTarefa from "./ModalTarefa";

const COLUNAS = [
  { id: "afazer", titulo: "A Fazer" },
  { id: "andamento", titulo: "Andamento" },
  { id: "concluido", titulo: "Concluído" },
];

function FormularioTarefa({
  tarefas,
  setTarefas,
  salvarTarefa,
  moverTarefa,
  removerTarefa,
}) {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [colunaAtiva, setColunaAtiva] = useState("afazer");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

  useEffect(() => {
    const pendentes = tarefas.filter(
      (t) => t.coluna === "afazer" || t.coluna === "andamento",
    ).length;
    if (pendentes > 0) {
      document.title = `(${pendentes}) TaskFlow - Mini Kanban`;
    } else {
      document.title = "TaskFlow - Mini Kanban";
    }
  }, [tarefas]);

  function handleRemoverTarefa(id) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir esta tarefa?",
    );
    if (confirmacao) {
      removerTarefa(id);
    }
  }

  function abrirModalCriar(coluna) {
    setTarefaEditando(null);
    setColunaAtiva(coluna);
    setModalAberto(true);
  }

  function abrirModalEditar(tarefa) {
    setTarefaEditando(tarefa);
    setModalAberto(true);
  }

  async function handleSalvarTarefa(dados) {
    await salvarTarefa(dados);
  }

  return (
    <div>
      <Header titulo="TaskFlow - Mini Kanban" />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 20px 10px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label htmlFor="filtro-prioridade" style={{ color: "#01050a" }}>
          Prioridade:
        </label>
        <select
          id="filtro-prioridade"
          value={filtroPrioridade}
          onChange={(e) => setFiltroPrioridade(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            background: "#0d1b2a",
            color: "#e2e8f0",
            border: "1px solid #334155",
          }}
        >
          <option value="todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>
      </div>

      <div className="kanban-board">
        {COLUNAS.map((col) => (
          <ColunaKanban
            key={col.id}
            titulo={col.titulo}
            chaveColuna={col.id}
            tarefas={tarefas}
            onMover={moverTarefa}
            onRemover={handleRemoverTarefa}
            onEditar={abrirModalEditar}
            onAbrirCriar={abrirModalCriar}
            filtroPrioridade={filtroPrioridade}
          />
        ))}
      </div>

      <ModalTarefa
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvar={handleSalvarTarefa}
        tarefa={tarefaEditando}
        coluna={colunaAtiva}
      />
    </div>
  );
}

export default FormularioTarefa;
