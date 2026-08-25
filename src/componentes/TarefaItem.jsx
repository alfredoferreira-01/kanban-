import styles from './TarefaItem.module.css';

function TarefaItem({
  texto,
  concluida = false,
  prioridade = 'media',
  onDeletar,
  onConcluir,
  onMover,
  colunaAtual
}) {
  const classeItem = `${styles.tarefa} ${concluida ? styles.concluida : ''} ${styles[prioridade] || ''}`;
  const classeTexto = `${styles.textoTarefa} ${concluida ? styles['texto-tarefa'] : ''}`;
  const classePrioridade = `${styles['badge-prioridade']} ${styles['badge-' + prioridade] || ''}`;

  const colunas = ['afazer', 'andamento', 'teste'];
  const indiceAtual = colunas.indexOf(colunaAtual);

  const moverAnterior = (e) => {
    e.stopPropagation();
    if (onMover && indiceAtual > 0) {
      onMover(colunas[indiceAtual - 1]);
    }
  };

  const moverProximo = (e) => {
    e.stopPropagation();
    if (onMover && indiceAtual >= 0 && indiceAtual < colunas.length - 1) {
      onMover(colunas[indiceAtual + 1]);
    }
  };

  return (
    <li className={classeItem} onDoubleClick={onConcluir}>
      <span className={classeTexto} onClick={onConcluir} title="Clique duplo para alternar conclusão">
        {texto}
      </span>
      <span className={classePrioridade}>{prioridade}</span>
      <div className={styles.acoes}>
        {onMover && indiceAtual > 0 && (
          <button
            type="button"
            className={styles.btnMover}
            onClick={moverAnterior}
            title="Mover para coluna anterior"
          >
            ←
          </button>
        )}
        {onMover && indiceAtual < colunas.length - 1 && (
          <button
            type="button"
            className={styles.btnMover}
            onClick={moverProximo}
            title="Mover para próxima coluna"
          >
            →
          </button>
        )}
        {onDeletar && (
          <button
            type="button"
            className={styles.btnDeletar}
            onClick={(e) => {
              e.stopPropagation();
              onDeletar();
            }}
            title="Excluir tarefa"
          >
            ✕
          </button>
        )}
      </div>
    </li>
  );
}

export default TarefaItem;

