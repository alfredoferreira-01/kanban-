import "./App.css";
import Filtros from "./Componentes/Filtros/Filtros";
import Footer from "./Componentes/Footer/Footer";
import Contador from "./Componentes/Formulario/Contador";
import { useEffect, useState } from "react";
import ListaTarefas from "./Componentes/Formulario/ListaTarefas";
import Header from "./Componentes/Header/Header";
import Sidebar from "./Componentes/Sidebar/Sidebar";

function Tarefasv1() {
  const [tarefas, setTarefas] = useState([]);
  const [proximoId, setProximoId] = useState(1);
  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [filtroAtivo, setFiltroAtivo] = useState("todas");

  const [carregado, setCarregado] = useState(false);

  function adicionarTarefa() {
    if (texto.trim() === "") return;

    const nova = {
      id: proximoId,
      titulo: texto.trim(),
      concluida: false,
      prioridade: prioridade,
    };

    setTarefas([...tarefas, nova]);
    setProximoId(proximoId + 1);
    setTexto("");
    setPrioridade("media");
  }

  //SALVAR NO LOCAL STOREGE USANDO USEREFFECT

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("taskflow_tarefas");
    if (tarefasSalvas) {
      const dados = JSON.parse(tarefasSalvas);
      setTarefas(dados);
      if (dados.length > 0) {
        setProximoId(dados[dados.length - 1].id + 1);
        //const maiorId = Math.max(...dados.map((t) => t.id));
        //setProximoId(maiorId + 1);
      }
    }
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;
    // if (tarefas.length > 0) {
    localStorage.setItem("taskflow_tarefas", JSON.stringify(tarefas));
    //}
  }, [carregado, tarefas]);

  useEffect(() => {
    const pendentes = tarefas.filter((t) => !t.concluida).length;

    if (pendentes > 0) {
      document.title = `(${pendentes}) Taskflow`;
    } else {
      document.title = "TaskFlow";
    }
  }, [tarefas]);

  function deletarTarefa(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  }

  // Lógica de filtragem das tarefas
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtivo === "pendentes") return !tarefa.concluida;
    if (filtroAtivo === "concluidas") return tarefa.concluida;
    return true;
  });

  // Quantidades para os contadores
  const qtdTodas = tarefas.length;
  const qtdPendentes = tarefas.filter((t) => !t.concluida).length;
  const qtdConcluidas = tarefas.filter((t) => t.concluida).length;

  return (
    <div id="app">
      <Sidebar/>
      <Contador />
      <Header titulo="TaskFlow" subtitulo="Gerencie suas tarefas" />
      <main>
        <Filtros
          filtroAtivo={filtroAtivo}
          setFiltroAtivo={setFiltroAtivo}
          qtdTodas={qtdTodas}
          qtdPendentes={qtdPendentes}
          qtdConcluidas={qtdConcluidas}
        />
        <section className="container">
          <form
            className="formulario-tarefa"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="titulo">Adicione a Tarefa</label>

            <input
              type="text"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarTarefa()}
              placeholder="Nova tarefa..."
            />

            <label htmlFor="prioridade">Prioridade:</label>

            <select
              id="prioridade"
              name="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>

            <button
              className="btn-adicionar"
              type="button"
              onClick={adicionarTarefa}
            >
              Adicionar tarefa
            </button>
          </form>
        </section>
        <section id="bloco-tarefas">
          {/* Passamos as tarefas filtradas para a lista */}
          <ListaTarefas
            tarefas={tarefasFiltradas}
            onDeletar={deletarTarefa}
            onConcluir={concluirTarefa}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Tarefasv1;
