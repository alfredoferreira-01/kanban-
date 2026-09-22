
function Formulario(){
    return (
      <section className="container">
        <form className="formulario-tarefa">
          <label for="titulo">Adicione a Tarefa</label>

          <input
            className="input-tarefa"
            name="titulo"
            type="text"
            placeholder="Ex: Estudar Flexbox"
          />

          <label for="prioridade">Prioridade:</label>

          <select id="prioridade" name="prioridade">
            <option value="alta">Alta</option>

            <option value="media">Média</option>

            <option value="baixa">Baixa</option>
          </select>

          <button className="btn-adicionar" type="button">
            Adicionar tarefa
          </button>
        </form>
      </section>
    );
}

export default Formulario;