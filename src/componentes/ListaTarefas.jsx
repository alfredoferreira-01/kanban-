import TarefaItem from './TarefaItem';

function ListaTarefas({ tarefas, onDeletar, onConcluir, onMover, colunaAtual }) {
  return (
    <section id='lista-section'>
      {/* Mensagem quando nao ha tarefas */}
      {tarefas.length === 0 && (
        <p className='msg-vazia'>
          Nenhuma tarefa nesta coluna.
        </p>
      )}
      {/* Lista renderizada dinamicamente */}
      {tarefas.length > 0 && (
        <ul id='lista-tarefas'>
          {tarefas.map(tarefa => (
            <TarefaItem
              key={tarefa.id}
              texto={tarefa.texto}
              concluida={tarefa.concluida}
              prioridade={tarefa.prioridade}
              colunaAtual={colunaAtual}
              onDeletar={() => onDeletar && onDeletar(tarefa.id)}
              onConcluir={() => onConcluir && onConcluir(tarefa.id)}
              onMover={(novaColuna) => onMover && onMover(tarefa.id, novaColuna)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ListaTarefas;

