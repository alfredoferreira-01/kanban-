function CardTarefa({ tarefa, onMover, onRemover, onEditar }) {
  const { id, texto, coluna, prioridade, cidade, endereco } = tarefa;

  return (
    <div
      className={`card prioridade-${prioridade}`}
      onDoubleClick={() => onEditar(tarefa)}
    >
      <div className="card-conteudo">
        <span className="tag-prioridade">{prioridade}</span>
        <p>{texto}</p>

        {/* Renderiza apenas a cidade */}
        {(cidade || endereco) && (
          <small className="card-endereco">📍 {cidade || endereco}</small>
        )}
      </div>

      <div className="acoes">
        {coluna === "andamento" && (
          <button onClick={() => onMover(tarefa.id, "afazer")}>←</button>
        )}
        {coluna === "concluido" && (
          <button onClick={() => onMover(tarefa.id, "andamento")}>←</button>
        )}

        <button onClick={() => onRemover(id)} className="btn-excluir">
          ✕
        </button>

        {coluna === "afazer" && (
          <button onClick={() => onMover(tarefa.id, "andamento")}>→</button>
        )}
        {coluna === "andamento" && (
          <button onClick={() => onMover(tarefa.id, "concluido")}>→</button>
        )}
      </div>
    </div>
  );
}

export default CardTarefa;