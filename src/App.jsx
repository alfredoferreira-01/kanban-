import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './componentes/Sidebar';
import RotaPrivada from './componentes/RotaPrivada';
import Sobre from './Pages/Sobre';
import Login from './Pages/Login'; 
import './App.css';
import Tarefav1 from './componentes/Tarefav1';
import Kanban from './Pages/Kanban'; 

function App() {

  const [logado, setLogado] = useState(false);

  return (

    <div className='app-layout'>

      <Sidebar logado={logado} onLogout={() => setLogado(false)} />

      <main className='app-conteudo'>

        <Routes>

          <Route path='/Kanban' element={ <RotaPrivada logado={logado}> <Kanban /> </RotaPrivada> } />
          <Route path='/Tarefa' element={ <RotaPrivada logado={logado}> <Tarefav1 /> </RotaPrivada> } />

          <Route path='/login' element={ <Login onLogin={() => setLogado(true)} />} />

          <Route path='/sobre' element={ <Sobre />} /> 

        </Routes>

      </main>

    </div>

  );
}
export default App;