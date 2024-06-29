const path = require("node:path");
const sqlite3 = require('sqlite3').verbose();
const config = require('./dbConfig')

const getRequest = (sql, reject, resolve) => {
    config.all(sql, [], (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    });
}

const getDataFromMasters = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Masters';
        getRequest(sql, reject, resolve)
    });
};

const getDataFromServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select code, name, category_code, price from Services';
        getRequest(sql, reject, resolve)
    });
};

const getDataFromCategory = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select code, name, master_code, description, image_path from Category';
        getRequest(sql, reject, resolve)
    });
};

const getDataFromAppointment = () => {
    return new Promise((resolve, reject) => {
        const sql = 'select code, date, time, master_code, service_code from appointment';
        getRequest(sql, reject, resolve)
    });
};

const addDataToAppointment = (date, time, master_code, service_code) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Appointment (date, time, master_code, service_code) VALUES (?, ?, ?, ?)';
        config.run(sql, [date, time, master_code, service_code], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

const getFilteredData = (code, sql) => {
    return new Promise((resolve, reject) => {
        config.all(sql, [code], (err, rows) => {
            if (err) {
                console.error('Помилка при виконанні запиту:', err);
                reject({ error: 'Помилка сервера' });
                return;
            }

            resolve(rows);
        });
    });
}

module.exports = {
    getDataFromMasters,
    getDataFromServices,
    getDataFromCategory,
    getDataFromAppointment,
    addDataToAppointment,
    getFilteredData
}