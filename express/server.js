const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const app = express();
const cors = require("cors");
// app.use(cors()); // only on local
const apiRoute = "/.netlify/functions/server"; // only on for netlify

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.get("/api/getcsvdata", (req, res) => {

    let idArray = [];
    fs.createReadStream(path.resolve(__dirname, '../backend-asset', 'sales_data_ABC.csv'))
        .pipe(csv.parse({
            headers: true
        }))
        .on('error', error => console.error(error))
        .on('data', row => {
            console.log(row);
            idArray.push(row); //Add it to the array
        })
        .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`);

            res
                .status(200)
                .json({
                    message: 'Original CSV data fetch successfull',
                    data: idArray
                });
        });
});

router.post("/api/setcsvdata", (req, res) => {
    if (req['body'].hasOwnProperty('updatedData')) {

        const csvStream = csv.format({
            headers: true
        });
        const ws = fs.createWriteStream(path.resolve(__dirname, '../backend-asset', 'sales_data_ABC.csv'));

        csvStream.pipe(ws).on("finish", () => {
            console.log("End of writing");
            res
            .status(200)
            .json({
                message: 'CSV data update successfull',
                // data:idArray
            });
        });

        req['body']['updatedData'].forEach(elem => {
            const {
                id,
                ...updatedObject
            } = elem;
            csvStream.write(updatedObject);
        });

        csvStream.end();
    }
});

app.use(apiRoute, router);

module.exports = app;
module.exports.handler = serverless(app); // only on for netlify