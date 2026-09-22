import CardTarefa from "./CardTarefa";

function ColunaKanban({
  titulo,
  chaveColuna,
  tarefas,
  onMover,
  onRemover,
  onEditar,
  onAbrirCriar,
  filtroPrioridade,
}) {
  const tarefasDaColuna = tarefas.filter((t) => {
    const pertenceAColuna = t.coluna === chaveColuna;
    const atendeFiltro =
      filtroPrioridade === "todas" || t.prioridade === filtroPrioridade;
    return pertenceAColuna && atendeFiltro;
  });

  return (
    <div className="coluna">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          {titulo} <span className="contador">({tarefasDaColuna.length})</span>
        </h2>
        <button
          onClick={() => onAbrirCriar(chaveColuna)}
          style={{ cursor: "pointer", padding: "4px 8px", borderRadius: "4px" }}
        >
          +
        </button>
      </div>

      <div className="cards-list">
        {tarefasDaColuna.map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            tarefa={tarefa}
            onMover={onMover}
            onRemover={onRemover}
            onEditar={onEditar}
          />
        ))}
      </div>
    </div>
  );
}

export default ColunaKanban;
