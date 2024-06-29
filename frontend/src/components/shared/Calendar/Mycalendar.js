import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, {useState} from "react";
import Select from 'react-weblineindia-dropdown'
import './MyCalendarStyle.css'

import {registerLocale} from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import axios from "axios";

registerLocale('uk', uk);

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function MyCalendar({categories, masters, appointments, services, sendFinalData}) {
    const [selectedData, setSelectedData] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [currentMaster, setCurrentMaster] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentServices, setCurrentServices] = useState(null);

    const [selectedMaster, setSelectedMaster] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(false);
    const [selectedServices, setSelectedServices] = useState(false);

    const [showCategory, setShowCategory] = useState(null)
    const [showServices, setShowServices] = useState(null);


    let mastersItem = {
        data: masters && masters.data ? masters.data.map(item => ({label: item.name, value: item.code.toString()})) : []
    };
    let categoriesItem = {
        data: categories && categories.data ? categories.data.map(item => ({
            label: item.name,
            value: item.code.toString()
        })) : []
    };
    let servicesItem = {
        data: services && services.data ? services.data.map(item => ({
            label: item.name,
            value: item.code.toString()
        })) : []
    };

    const getFilteredData = async (value, path) =>{
        try {
            const response = await axios.post(`${backendUrl}/${path}`, value);
            return response.data
        } catch(err){
            console.error('Помилка:', err);
            return null;
        }
    }

    const firstMasterSelect = (filteredCategories, filteredServices, value) => {
        getFilteredData(value, "filter/master").then((data) => {
            console.log(data)
            setCurrentMaster(data)

            getFilteredData(value, "filter/master_category").then((data) => {
                filteredCategories = data
                console.log(filteredCategories)

                getFilteredData(value, "filter/master_service").then((data) => {
                    filteredServices = data
                    console.log(data)

                    setShowCategory(filteredCategories.map(el => ({label: el.name, value: el.code.toString()})));
                    setShowServices(filteredServices.map(el => ({label: el.name, value: el.code.toString()})));

                    setSelectedMaster(true)
                })
            })
        })
    }
    const selectedMasterCategory = (value) => {
        getFilteredData(value, "filter/category").then((data) => {
            setCurrentCategory(data)
            console.log(data)

            setShowServices(services.data.filter(el => el.category_code.toString() === value[0].value).map(el => ({
                label: el.name,
                value: el.code.toString()
            })))

            setSelectedCategory(true)
        })
    }
    const selectedMasterCategoryService = (value) => {
        getFilteredData(value, "filter/service").then((data) => {
            setCurrentServices(data)
            console.log(data)
        })

        setSelectedServices(true)
    }

    const handleMasterChange = (value) => {
        let filteredCategories = null;
        let filteredServices = null

        firstMasterSelect(filteredCategories, filteredServices, value)
    }

    const handleCategoryChange = (value) => {
            selectedMasterCategory(value)
    }

    const handleServiceChange = (value) => {
            selectedMasterCategoryService(value)
    }

    //Форматування дати для бд
    const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    //Форматування часу для бд
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`
    }

    const handleSelectedData = (value) => {
        if (currentMaster && currentMaster.length > 0) {
            setSelectedData(value)
            setSelectedTime(null);
            console.log(formatTime(value))
            console.log(formatDate(value));
        } else {
            alert("Спочатку оберіть майстра.");
        }
    }

    const handleSelectedTime = (time) => {
        const updatedDate = new Date(
            selectedData.getFullYear(),
            selectedData.getMonth(),
            selectedData.getDate(),
            time.getHours(),
            time.getMinutes()
        );
            setSelectedTime(time)
            setSelectedData(updatedDate);
    }

    //Перевірка на недостпність по неділях
    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };

    //Визначення максимального та мінімального часу за днем тижня
    const getMinMaxTimes = (date) => {
        let day = date.getDay();
        let minTime, maxTime;

        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const openTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0)
        if (day >= 1 && day <= 5) { // З понеділка до п'ятниці
            minTime = isToday ? now : openTime;
            maxTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0);
        } else if (day === 6) { // Субота
            minTime = isToday ? now : openTime;
            maxTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0, 0);
        }

        if (isToday && now > maxTime) {
            minTime = maxTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        }

        if (isToday && minTime < openTime) {
            minTime = openTime
        }

        return {minTime, maxTime};
    };

    const filterBookedTimes = (time) => {
        if (selectedData == null || currentMaster == null) {
            return false;
        }

        //Фільтруємо appointments за обраним майстром
        const filtered = appointments.data.filter(appointment => appointment.master_code === currentMaster[0].code.toString())

        //Створюємо масив booking з датами
        let bookings = filtered.map(appointment => {
            const [day, month, year] = appointment.date.split('/');
            const [hours, minutes, seconds] = appointment.time.split(':');
            return new Date(year, month - 1, day, hours, minutes, seconds);
        });

        return !bookings.some(booking =>
            booking.getFullYear() === selectedData.getFullYear() &&
            booking.getMonth() === selectedData.getMonth() &&
            booking.getDate() === selectedData.getDate() &&
            booking.getHours() === time.getHours() &&
            booking.getMinutes() === time.getMinutes()
        );
    };

    const {minTime, maxTime} = (selectedData == null) ? getMinMaxTimes(new Date()) : getMinMaxTimes(selectedData);

    const SubmitButton = () => {
        if (selectedData === null || selectedTime === null || selectedServices === false || selectedCategory === false || selectedMaster === false) {
            alert("Ви ввели не всі дані. Перегляньте їх уважніше та заповніть пропуски.")
            return
        }

        const value = {
            date: formatDate(selectedData),
            time: formatTime(selectedData),
            master_code: currentMaster[0].code,
            service_code: currentServices[0].code
        }

        sendFinalData(value);
    }

    return (
        <div className={"calendar-section"}>
            <div className={"info-enter"}>
                <div className={'master-select'}>
                    <h4>Оберіть майстра:</h4>
                    <Select
                        options={mastersItem.data}
                        onChange={(values) => handleMasterChange(values)}
                    />
                </div>

                <div className={'service-select'}>
                    <h4>Оберіть послугу:</h4>
                    <Select
                        options={showCategory !== null ? showCategory : categoriesItem.data}
                        onChange={(values) => {
                            handleCategoryChange(values)
                        }}
                    />
                </div>

                <div className={'procedure-select'}>
                    <h4>Оберіть процедуру:</h4>
                    <Select
                        options={showServices !== null ? showServices : servicesItem.data}
                        onChange={(values) => {
                            handleServiceChange(values)
                        }}
                    />
                </div>

                <div className={"submit-button"}>
                    <button onClick={SubmitButton}>Записатися</button>
                </div>
            </div>
            <section className='calendar'>
                <div className={"dataPicker"}>
                    <DatePicker
                        inline
                        filterDate={isWeekday}
                        selected={selectedData}
                        onChange={handleSelectedData}
                        dateFormat="MM/dd/yyyy"
                        calendarClassName="custom-datepicker data"
                        locale="uk"
                        minDate={new Date()}
                    />
                </div>
                <div className={"timePicker"}>
                    {selectedData && (
                        <DatePicker
                            inline
                            selected={selectedData}
                            onChange={handleSelectedTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeFormat="HH:mm"
                            calendarClassName="custom-datepicker time"
                            locale="uk"
                            minTime={minTime}
                            maxTime={maxTime}
                            filterTime={filterBookedTimes}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

export default MyCalendar;