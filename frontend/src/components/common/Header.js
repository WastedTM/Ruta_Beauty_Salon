import {Link} from "react-router-dom";
import "./Header.css"

function Header() {

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src='./publicImages/logo/logo.png' alt="Ruta"/>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><Link to={"/"}>Головна</Link></li>
                        <li><Link to={"/*"}>Послуги</Link></li>
                        <li><Link to={"/*"}>Про нас</Link></li>
                        <li><Link to={"/*"}>Контакти</Link></li>
                    </ul>
                </nav>
                <div className="booking">
                    <Link to="/*">
                        <button className={'booking-btn'}>Бронювання Запису</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;