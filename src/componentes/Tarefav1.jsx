import Header from "./Header";
import ListaTarefas from "./ListaTarefas";
import Contador from "./Contador";
import { useEffect, useState } from "react";
import axios from "axios";

function Tarefav1() {
  const [texto, setTexto] = useState("");
  const [prioridade, setPrioridade] = useState("media"); 
  const [filtro, setFiltro] = useState("todas");

  async function consultarCEP(cep) {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(resposta.data);
      return resposta.data;
    } catch (erro) {
      console.log(erro);
    }
  }

  // State lazy initialization
  const [tarefas, setTarefas] = useState(() => {
    const salvo = localStorage.getItem('tarefas');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch (e) {
        console.error("Erro ao carregar tarefas:", e);
      }
    }
    return [];
  });

  const [proximaId, setProximaId] = useState(() => {
    const salvo = localStorage.getItem('tarefas');
    if (salvo) {
      try {
        const dados = JSON.parse(salvo);
        if (dados.length > 0) {
          return Math.max(...dados.map(t => t.id || 0)) + 1;
        }
      } catch (e) {
        console.error("Erro ao calcular proximaId:", e);
      }
    }
    return 1;
  });

  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  // Cálculos derivados para o Header
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;

  const adicionarTarefa = () => {
    if (texto.trim() === "") {
      return;
    }
    const novaTarefa = {
      id: proximaId,
      texto: texto,
      concluida: false,
      prioridade: prioridade,
    };
    setTarefas([...tarefas, novaTarefa]);
    setProximaId(proximaId + 1);
    setTexto("");
    setPrioridade("media");
  };
  
  function deletarTarefa(id) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  function concluirTarefa(id) {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  }

  // Filtragem correta das tarefas com base no estado 'filtro'
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === "pendentes") return !t.concluida;
    if (filtro === "concluidas") return t.concluida;
    return true; // "todas"
  });

  return (
    <>
      <Contador />
      <Header 
        titulo="TaskFlow - Teste" 
        subtitulo="Gerencie suas tarefas" 
        total={total}
        pendentes={pendentes}
        concluidas={concluidas}
      />
      <main className="container">
        <section id="formulario">
          <div className="campo-linha">
            <input
              id="input-tarefa"
              type="text"
              placeholder="Nova tarefa..."
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
              <option value="alta">🔴 Alta</option>
              <option value="media">🟡 Média</option>
              <option value="baixa">🟢 Baixa</option>
            </select>
            <button id="btn-adicionar" type="button" onClick={adicionarTarefa}>
              Adicionar
            </button>
          </div>
        </section>
        
        <section id="controles">
          <div id="filtros">
            <button 
              className={`btn-filtro ${filtro === "todas" ? "ativo" : ""}`} 
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button 
              className={`btn-filtro ${filtro === "pendentes" ? "ativo" : ""}`} 
              onClick={() => setFiltro("pendentes")}
            >
              Pendentes
            </button>
            <button 
              className={`btn-filtro ${filtro === "concluidas" ? "ativo" : ""}`} 
              onClick={() => setFiltro("concluidas")}
            >
              Concluídas
            </button>
          </div>
        </section>

        <ListaTarefas
          tarefas={tarefasFiltradas}                                     
          onDeletar={deletarTarefa}
          onConcluir={concluirTarefa}
        />
      </main>
      <footer>
        <p>TaskFlow &copy; 2026 &mdash; alfredo ferreira</p>
      </footer>
    </>
  );
}

export default Tarefav1;