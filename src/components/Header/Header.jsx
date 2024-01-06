import "./Header.css";
import MenuIcon from '@mui/icons-material/Menu';



function Header(props) {
    return (
        <header className="header">
            <a className="title" href="/blog">My Blog Site</a>
            <div className="header-icon" onClick={()=>{props.toggleBar()}}><MenuIcon className="menu" style={{fontSize:"40px"}}/></div>
        </header>
    );
}

export default Header;