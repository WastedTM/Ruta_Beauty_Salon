const express = require('express');
const dbOperation = require('../dbFiles/dbOperation')
const cors = require('cors');
const bodyParser = require('body-parser');
const {getFilteredMaster, getFilteredData} = require("../dbFiles/dbOperation");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://beauty-salon-ruta-4b36b7b4a7c2.herokuapp.com',
    optionsSuccessStatus: 200
};

app.get('/data/masters_info', async (req, res) => {
    console.log('GET /data/masters_info called');
    try {
        const data = await dbOperation.getDataFromMasters();
        console.log('Data from database:', data);
        res.json({
            message: 'success',
            data: data
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/data/services_info', async (req, res) => {
    try {
        const data = await dbOperation.getDataFromServices();
        console.log('Data from database:', data); // Виведення отриманих даних в консоль
        res.json({
            message: 'success',
            data: data
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/data/appointment_info', async (req, res) => {
    try {
        const data = await dbOperation.getDataFromAppointment();
        console.log('Data from database:', data); // Виведення отриманих даних в консоль
        res.json({
            message: 'success',
            data: data
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/data/category_info', async (req, res) => {
    try {
        const data = await dbOperation.getDataFromCategory();
        console.log('Data from database:', data); // Виведення отриманих даних в консоль
        res.json({
            message: 'success',
            data: data
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post("/add/column/appointment", async (req, res) => {
    const { date, time, master_code, service_code } = req.body;

    try {
        const result  = await  dbOperation.addDataToAppointment(date, time, master_code, service_code);
        res.status(201).json({ id: result.id, message: 'Дані успішно збережено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при збереженні даних' });
    }
});

app.post("/filter/master", (req, res) => {
    const code = req.body[0].value;
    const sql = `SELECT * FROM Masters WHERE code = ?`;

    getFilteredData(code, sql)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Відправка помилки на фронтенд
        });
})

app.post("/filter/category", (req, res) => {
    const code = req.body[0].value;
    const sql = `SELECT * FROM Category WHERE code = ?`;

    getFilteredData(code, sql)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Відправка помилки на фронтенд
        });
})

app.post("/filter/service", (req, res) => {
    const code = req.body[0].value;
    const sql = `SELECT * FROM Services WHERE code = ?`;

    getFilteredData(code, sql)
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err); // Відправка помилки на фронтенд
        });
})

app.post("/filter/master_category", (req, res) => {
    const code = req.body[0].value;
    const sql = `select * from Category where master_code = ?`;

    getFilteredData(code, sql).then((rows) =>{
        res.json(rows)
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

app.post("/filter/master_service", (req, res) => {
    const code = req.body[0].value;
    const sql = `select * from Services where master_code = ?`;

    getFilteredData(code, sql).then((rows) =>{
        res.json(rows)
    }).catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});