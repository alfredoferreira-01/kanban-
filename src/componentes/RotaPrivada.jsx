import { Navigate } from 'react-router';

function RotaPrivada({ logado, children }) {

if (!logado) {

return <Navigate to='/login' replace={true} />;

}

return children;

}

export default RotaPrivada;