import ShowItem from "../../shared/ShowItem/ShowItem";
import {SERVICES_ITEMS} from '../../../data/MainPageData'

function Services() {
    return (
        <div className={"services-container"}>
            <div className={"wrapper"}>
                <h3 className={"header"}>Послуги</h3>
                <p className={"description"}>У Ruta ми пропонуємо широкий спектр послуг для вашої краси та комфорту:</p>
                <div className={"services-wrapper"}>
                    {SERVICES_ITEMS.map((item, key) => (
                        ShowItem(item, key)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Services;