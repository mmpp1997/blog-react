import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    return (
        <header className="header">
            <a className="title" href="/blog">My Blog Site</a>
            <MenuIcon color="success"/>
        </header>
    );
}

export default Header;