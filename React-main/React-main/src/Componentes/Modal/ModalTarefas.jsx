import { useState, useEffect } from "react";
import styles from "./ModalTarefa.module.css";
import axios from "axios";

function ModalTarefa({
  aberto,
  onFechar,
  onSalvar,
  tarefa = null,
  coluna = "afazer",
}) {
  const [texto, setTexto] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  // Preenche ou limpa os campos ao abrir/fechar
  useEffect(() => {
    if (aberto) {
      if (tarefa) {
        setTexto(tarefa.texto || "");
        setCidade(tarefa.cidade || tarefa.endereco || "");
        setPrioridade(tarefa.prioridade || "media");
        setCep("");
      } else {
        setTexto("");
        setCep("");
        setCidade("");
        setPrioridade("media");
      }
    }
  }, [tarefa, aberto]);

  async function consultarCidade(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    if (cepLimpo.length < 8) return;

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );

      if (!data.erro) {
        setCidade(data.localidade + " - " + data.uf);
      } else {
        setCidade("CEP não encontrado");
      }
    } catch (e) {
      console.error("Erro ao buscar CEP:", e);
    }
  }


  const apenasNumerosCEP = (e) => {
    const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(valor);
    consultarCidade(valor);
  };

  function handleSalvar() {
    if (texto.trim() === "") {
      alert("Por favor, preencha o texto da tarefa.");
      return;
    }

    onSalvar({
      id: tarefa?.id, // undefined = criar | número = editar
      texto,
      cidade,
      prioridade,
      coluna: tarefa?.coluna || coluna,
    });

    onFechar();
  }

  if (!aberto) return null;

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2>{tarefa ? "Editar tarefa" : "Nova tarefa"}</h2>

        <input
          placeholder="Texto da tarefa"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <input
          type="text"
          placeholder="CEP (8 dígitos)"
          value={cep}
          onChange={apenasNumerosCEP}
          maxLength={8}
        />

        {cidade && <p className={styles.cidade}>📍 {cidade}</p>}

        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Média</option>
          <option value="baixa">Baixa</option>
        </select>

        <div className={styles.botoes}>
          <button onClick={onFechar}>Cancelar</button>
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalTarefa;
