let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/api', (req,res) => {
//     return res.send('hello');
// })

// create database connection
let dbConnector = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asmt'
})
dbConnector.connect();

// get ticket list
app.get('/api/ticket_list', (req, res) => {

    let statusFromBody = req.body.status;

    queryData(statusFromBody, res);

});

// create ticket
app.post('/api/create_ticket', (req, res) => {

    let title = req.body.title;
    let description = req.body.description;
    let contact = req.body.contact;
    let information = req.body.information;


    if (!title) {
        return res.status(400).send({ error: '400 bad request', message: 'Missing field title.' });
    } else if (!description) {
        return res.status(400).send({ error: '400 bad request', message: 'Missing field description.' });
    } else if (!contact) {
        return res.status(400).send({ error: '400 bad request', message: 'Missing field contact.' });
    } else if (!information) {
        return res.status(400).send({ error: '400 bad request', message: 'Missing field information.' });
    } else {
        dbConnector.query('INSERT INTO tickets (title, description, contact, information) VALUES (?, ?, ?, ?)', [title, description, contact, information], (error, result) => {
            if (error) throw error;
            return res.send({ message: 'Create Success' });
        })
    };

});

// update ticket
app.post('/api/update_ticket', (req, res) => {

    let id = req.body.ticket_id;
    let information = req.body.information;
    let status = req.body.status;

    if (!id) {
        return res.status(400).send({ error: '400 bad request', message: 'Missing field ticket_id.' });
    } else if (id) {
        dbConnector.query('UPDATE tickets SET information = ?, status = ? WHERE ticket_id = ?', [information, status, id], (error, result) => {
            if (error) throw error;

            let message = '';
            if (result.changedRows === 0) {
                message = 'Noting changes';
            } else {
                message = 'Update successful';
            }

            return res.send({ message: message, data: result })
        })
    }
});

function queryData(status, res) {

    if (!status) {
        dbConnector.query('SELECT * FROM tickets ORDER BY updated_date DESC, status ASC', (error, result) => {
            if (error) throw error;

            let totalData = 0;
            if (result === undefined || result.length == 0) {
                return res.send({ DataCount: totalData, data: result });
            } else {
                totalData = result.length;
            }
            return res.send({ DataCount: totalData, data: result });
        });
    } else {
        dbConnector.query('SELECT * FROM tickets WHERE status = ? ORDER BY updated_date DESC, status ASC', status, (error, result) => {
            if (error) throw error;
            let totalData = 0;
            if (result === undefined || result.length == 0) {
                return res.send({ DataCount: totalData, data: result });
            } else {
                totalData = result.length;
            }
            return res.send({ DataCount: totalData, data: result })
        });
    }
}


app.listen(2000, () => {
    console.log('Node is running');
})


module.exports = app;