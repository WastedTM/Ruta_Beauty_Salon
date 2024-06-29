import React from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MainPage from "./components/pages/MainPage/MainPage";
import Notfound from "./components/pages/NotFound/Notfound";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: {},
            appointments: {},
            masters: {},
            categories: {}
        }
        this.sendFinalData = this.sendFinalData.bind(this);
    }

    componentDidMount() {
        this.getServices()
        this.getAppointments()
        this.getMasters()
        this.getCategories()
    }

    getServices = async () => {
        await axios.get(`${backendUrl}/data/services_info`)
            .then((response) => {
                this.setState({services: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getCategories = async () => {
        await axios.get(`${backendUrl}/data/category_info`)
            .then((response) => {
                this.setState({categories: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getAppointments = async () => {
        await axios.get(`${backendUrl}/data/appointment_info`)
            .then((response) => {
                this.setState({appointments: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getMasters = async () => {
        await axios.get(`${backendUrl}/data/masters_info`)
            .then((response) => {
                this.setState({masters: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    sendFinalData = async (value) => {
        const dataToSend = {
            date: value.date,
            time: value.time,
            master_code: value.master_code,
            service_code: value.service_code
        };

        try {
            await axios.post(`${backendUrl}/add/column/appointment`, dataToSend);
            console.log('Дані відправлені успішно:', dataToSend);
            window.alert('Дані успішно виведено. Сторінка буде оновлена.');
            window.location.reload();
        } catch (error) {
            console.error('Помилка при відправленні даних на сервер:', error);
        }

        console.log(value)
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<MainPage categories={this.state.categories} masters={this.state.masters} appointments = {this.state.appointments} services = {this.state.services} sendFinalData={this.sendFinalData}/>}></Route>
                        <Route path="*" element={<Notfound/>}></Route>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        );
    }

}

export default App;
