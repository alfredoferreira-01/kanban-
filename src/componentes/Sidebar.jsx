import { NavLink } from 'react-router';
import styles from './Sidebar.module.css';

function Sidebar({ logado, onLogout }) {

const linkClass = ({ isActive }) =>

isActive ? styles.link + ' ' + styles.ativo : styles.link;

return (

<aside className={styles.sidebar}>

<div className={styles.logo}><h1>TaskFlow</h1></div>

<nav className={styles.nav}>


{logado && <NavLink to='/kanban' className={linkClass}>Kanban</NavLink>}
{logado && <NavLink to='/Tarefa' className={linkClass}>Tarefa</NavLink>}

<NavLink to='/sobre' className={linkClass}>Sobre</NavLink>
<NavLink to='/Login' className={linkClass}>Login</NavLink>

</nav>



{logado && (<button className={styles.btnLogout} onClick={onLogout}>Sair</button>)}

</aside>

);

}

export default Sidebar;