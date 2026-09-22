{
  /*function ListaTarefas({texto, concluida, prioridade}){
    return (
          <li className="tarefa">
            <span>{texto}</span>
            <button className="btn-remover">X</button>
          </li>   
    );
}

export default ListaTarefas;


import styles from './ListaTarefas.module.css';

function ListaTarefas({ texto, concluida = false, prioridade = "media" }) {
  // Classe do li muda conforme o estado concluida

  const classeItem = concluida
    ? styles.tarefa + " " + styles.concluida
    : styles.tarefa;

  // Classe do texto tambem muda

  const classeTexto = concluida
    ? styles.textoTarefaConcluido
    : styles.textoTarefa;

  return (
    <li className={classeItem}>
      <span className={classeTexto}>{texto}</span>
      <button className={styles.btnDeletar}>X</button>
    </li>
  );
}

export default ListaTarefas;*/
}

import styles from "./ListaTarefas.module.css";
import { FaTrashAlt } from "react-icons/fa";

function TarefaItem({
  texto,
  concluida = false,
  prioridade = "media",
  onDeletar,
  onConcluir,
}) {
  console.log(texto);

  const classeItem = [
    styles.tarefa,
    concluida ? styles.concluida : "",
    styles[prioridade],
  ]
    .filter(Boolean)
    .join(" ");

  const classeTexto = concluida
    ? styles.textoTarefaConcluido
    : styles.textoTarefa;

  const classePrioridade = `${styles["badge-prioridade"]} ${styles["badge-" + prioridade]}`;

  return (
    <li className={classeItem} onClick={onConcluir}>
      <span className={classeTexto}>{texto}</span>
      <span className={classePrioridade}>{prioridade}</span>
      <button className={styles.btnDeletar} onClick={e => {e.stopPropagation(); onDeletar();}}>
        <FaTrashAlt size={20} />
      </button>
    </li>
  );
}

export default TarefaItem;