import Sidebar from "../Componentes/Sidebar/Sidebar";
import "./Sobre.css"

function Sobre() {
  return (
    <main className="container">
      <Sidebar/>
      <h1>Sobre o TaskFlow</h1>

      <section className="sobre-conteudo">
        <h2>O que é o TaskFlow?</h2>
        <p>
          O TaskFlow é uma aplicação web moderna de gerenciamento de tarefas
          inspirada no Trello, projetada para ajudar você a organizar suas
          demandas diárias, acompanhar o progresso dos projetos e aumentar a sua
          produtividade de forma simples e intuitiva através de um quadro
          Kanban.
        </p>

        <h2>Tecnologias Utilizadas</h2>
        <ul>
          <li>React</li>
          <li>Vite</li>
          <li>Axios</li>
          <li>React Router</li>
        </ul>

        <h2>Desenvolvedor</h2>
        <p>
          Desenvolvido com dedicação por <strong>Felipe Galdino</strong> — Turma{" "}
          <strong>Programação Full stack</strong>.
        </p>
      </section>
    </main>
  );
}

export default Sobre;
