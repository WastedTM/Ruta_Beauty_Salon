import Hero from "../../sections/Hero/Hero";
import Advantages from "../../sections/Advateges/Advantages";
import MySlider from "../../shared/slider/MySlider";
import Services from "../../sections/Services/Services";
import "./MainPage.css"
import Masters from "../../sections/Masters/Masters";
import {MAIN_PAGE_SLIDER_ITEMS} from '../../../data/MainPageData'
import MakeAppointment from "../../sections/MakeAppointment/MakeAppointment";

function MainPage({categories, masters, appointments, services, sendFinalData}) {
    return (
        <div className={"main-page"}>
            <Hero/>
            <Advantages/>
            <MySlider items={MAIN_PAGE_SLIDER_ITEMS}/>
            <Services/>
            <Masters/>
            <MakeAppointment categories={categories} masters={masters} appointments={appointments} services={services} sendFinalData={sendFinalData}/>
        </div>
    )
}

export default MainPage;