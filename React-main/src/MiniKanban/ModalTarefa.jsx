import { useState, useEffect } from "react";
import styles from "./ModalTarefa.module.css";
import axios from "axios";

function ModalTarefa({ aberto, onFechar, onSalvar, tarefa = null, coluna = "afazer" }) {
  const [texto, setTexto] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && aberto) {
        onFechar();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aberto, onFechar]);

 
  useEffect(() => {
    if (tarefa) {
      setTexto(tarefa.texto || "");
      setCidade(tarefa.endereco || tarefa.cidade || "");
      setPrioridade(tarefa.prioridade || "media");
      setCep("");
    } else {
      setTexto("");
      setCep("");
      setCidade("");
      setPrioridade("media");
    }
  }, [tarefa, aberto]);

  async function consultarCidade(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    if (cepLimpo.length < 8) return;

    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!data.erro) {
        setCidade(`${data.localidade} - ${data.uf}`);
      } else {
        setCidade("CEP não encontrado");
      }
    } catch (e) {
      setCidade("Erro ao buscar CEP");
    }
  }

  function handleSalvar(e) {
    e.preventDefault();
    if (!texto.trim()) {
      alert("Por favor, digite o texto da tarefa.");
      return;
    }

    onSalvar({
      id: tarefa?.id,
      texto: texto.trim(),
      cidade: cidade,
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

        <form onSubmit={handleSalvar} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            placeholder="Texto da tarefa"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />

          <input
            type="text"
            maxLength={8}
            placeholder="CEP (opcional)"
            value={cep}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setCep(val);
              consultarCidade(val);
            }}
          />

          {cidade && <p className={styles.cidade}>📍 {cidade}</p>}

          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          <div className={styles.botoes}>
            <button type="button" onClick={onFechar}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTarefa;