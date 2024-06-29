import "./Footer.css"
import {SERVICES_ITEMS} from '../../data/MainPageData'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className={"footer-section"}>
            <div className="wrapper">
                <div className={"contacts"}>
                    <div className={"logo"}>
                        <img src='./publicImages/logo/logo.png' alt="Ruta"/>
                        <p>Ваша краса починається тут</p>
                    </div>
                    <p className={'text'}>Ми завжди раді вас бачити та готові відповісти на всі ваші запитання.
                        Зв’яжіться з нами будь-яким зручним для вас способом:</p>
                    <div className='info' key={1}>
                        <img src='./publicImages/footer/phoneIcon.png' alt='Телефон'></img>
                        <p><span>Телефон:</span> +1(234)567-890</p>
                    </div>
                    <div className='info' key={2}>
                        <img src='./publicImages/footer/mail.png' alt='Телефон'></img>
                        <p><span>Пошта:</span> support@example.com</p>
                    </div>
                    <div className='info' key={3}>
                        <img src='./publicImages/footer/mapIcon.png' alt='Телефон'></img>
                        <p><span>Адреса:</span> м. Київ, вул. Квіткова...</p>
                    </div>
                </div>
                <div className={"services"}>
                    <h3>Послуги:</h3>
                    <hr/>

                    <ul>
                        {SERVICES_ITEMS.map((el, index) => (
                            <li key={index}><Link to='*'>{el.title}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className={"general"}>
                    <h3>Робочі дні</h3>
                    <hr></hr>
                    <p>Понеділок - П’ятниця: З 8:00 по 20:00</p>
                    <p>Субота: З 8:00 по 17:00</p>
                    <p>Неділя: Вихідний</p>
                    <h3>Соціальні мережі</h3>
                    <hr></hr>
                    <h3></h3>
                    <div className={"images"}>
                        <Link to={"*"}><img src={'./publicImages/social/facebook.png'} alt={'facebook'}></img></Link>
                        <Link to={"*"}><img src={'./publicImages/social/instagram.png'} alt={'instagram'}></img></Link>
                        <Link to={"*"}><img src={'./publicImages/social/TikTok.png'} alt={'TikTok'}></img></Link>
                        <Link to={"*"}><img src={'./publicImages/social/youtube.png'} alt={'youtube'}></img></Link>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='right'>
                <h3>Privacy Policy & Terms of Service</h3>
                <p>&#169;Copyright Ruta 2024. All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;