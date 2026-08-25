import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e?.preventDefault();

    if (usuario === 'admin' && senha === '1234') {
      onLogin(); 
      navigate('/'); 
      return;
    }

    setErro('Usuário ou senha incorretos');
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;