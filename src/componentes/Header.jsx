import styles from './Header.module.css';

function Header({ titulo, subtitulo = "Informe o subtítulo", total = 0, pendentes = 0, concluidas = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>{titulo}</h1>
          <p>{subtitulo}</p>            
        </div>

        <div className={styles.totais}>
          <span id="cont-total">{total} tarefas</span>
          <span className="separador">&middot;</span>
          <span id="cont-pendentes">{pendentes} pendentes</span>
          <span className="separador">&middot;</span>
          <span id="cont-concluidas">{concluidas} concluídas</span>
        </div>
      </div>
    </header>
  );
}

export default Header;