import {Link} from "react-router-dom";

function Hero() {
    return (
        <div className='hero-section'>
            <div className='hero-wrapper'>
                <div className='hero-text'>
                    <h1>Перукарня & Салон краси </h1>
                    <p>Блискуча ти - блискучий світ!</p>
                    <Link to="*">
                        <div>
                            <p>Переглянути роботи</p>
                            <img src='./publicImages/hero/instagram.png' alt='instragram icon'></img>
                        </div>
                    </Link>
                </div>
                <div className='hero-img'>
                    <img src='./publicImages/hero/hero.png' alt="Beauty Image"></img>
                </div>
            </div>
        </div>
    )
}

export default Hero;