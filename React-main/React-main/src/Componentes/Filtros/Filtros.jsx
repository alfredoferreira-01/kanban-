function Filtros({ filtroAtivo, setFiltroAtivo, qtdTodas, qtdPendentes, qtdConcluidas }) {
  return (
    <section id="painel-filtros">
      <div className="filtros">
        <span 
          className={`filtro ${filtroAtivo === "todas" ? "ativo" : ""}`}
          data-filtro="todas"
          onClick={() => setFiltroAtivo("todas")}
          style={{ cursor: "pointer" }}
        >
          Todas (<span>{qtdTodas}</span>)
        </span>
        
        <span 
          className={`filtro ${filtroAtivo === "pendentes" ? "ativo" : ""}`}
          data-filtro="pendentes"
          onClick={() => setFiltroAtivo("pendentes")}
          style={{ cursor: "pointer" }}
        >
          Pendentes (<span>{qtdPendentes}</span>)
        </span>
        
        <span 
          className={`filtro ${filtroAtivo === "concluidas" ? "ativo" : ""}`}
          data-filtro="concluidas"
          onClick={() => setFiltroAtivo("concluidas")}
          style={{ cursor: "pointer" }}
        >
          Concluídas (<span>{qtdConcluidas}</span>)
        </span>
      </div>
    </section>
  );
}

export default Filtros;