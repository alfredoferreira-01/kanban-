import { Routes, Route } from "react-router-dom";
import Sobre from "./Pages/Sobre";
import Login from "./Pages/Login";
import MiniKanban from "./MiniKanban/MiniKanban";
import Tarefasv1 from "./Tarefasv1";
import RotaPrivada from './Componentes/RotaPrivada/RotaPrivada';

function App() {

  return (
    <div className="app-layout">
      <main className="app-conteudo">
        <Routes>
          <Route
            path="/"
            element={
              <RotaPrivada>
                {" "}
                <MiniKanban />{" "}
              </RotaPrivada>
            }
          />
          <Route
            path="/ListaTarefas"
            element={
              <RotaPrivada>
                {" "}
                <Tarefasv1 />{" "}
              </RotaPrivada>
            }
          />
          <Route
            path="/Sobre"
            element={
              <RotaPrivada>
                <Sobre />
              </RotaPrivada>
            }
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
