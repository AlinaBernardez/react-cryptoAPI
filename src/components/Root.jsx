import { Link, Outlet } from 'react-router-dom';
import styles from './Home.module.css';

function Root() {
    return(
        <>
        <nav className={styles.navBar}>
            <Link to={'/'}>Home</Link>
            <Link to={'/favorites'}>Favorites</Link>
        </nav>
        <Outlet />
        </>
    )
}

export default Root