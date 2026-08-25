import { useState } from 'react';

function Contador() {
  const [valor, setValor] = useState(0);

  return (
    <div className="counter-box" style={{ display: 'none' }}>
      <p className="counter">Valor: {valor}</p>
      <button onClick={() => setValor(valor + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;