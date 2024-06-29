import "react-datepicker/dist/react-datepicker.css"
import MyCalendar from "../../shared/Calendar/Mycalendar";

function MakeAppointment({categories, masters, appointments, services, sendFinalData}) {
    return (
        <div className="make-appointment-section">
            <h3>Запишіться на процедури і дозвольте нам подбати про вашу красу та релакс.</h3>
            <p>Виберіть зручний час та насолоджуйтеся моментом для себе!</p>
            <MyCalendar categories={categories} masters={masters} appointments={appointments} services={services} sendFinalData={sendFinalData}/>
        </div>
    )
}

export default MakeAppointment;