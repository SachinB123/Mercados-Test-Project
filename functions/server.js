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
// console.log('__filename :: ', __filename);
// console.log('__dirname :: ', fs.readdirSync(__dirname));

/*See why we need LAMBDA_TASK_ROOT for netlify - https://answers.netlify.com/t/hosting-a-file-along-with-my-function/1527/19 */
const fileName = "./functions/sales_data_ABC.csv";
// const resolvedLAMBDAPath = (process.env.LAMBDA_TASK_ROOT)? path.resolve(__dirname, 'sales_data_ABC.csv'):path.resolve(__dirname, 'sales_data_ABC.csv')
const resolvedLAMBDAPath = fs.readFileSync(require.resolve('./sales_data_ABC.csv'));
router.get("/api/getcsvdata", (req, res) => {

    let idArray = [];
    // res.status(200)
    //             .json({
    //                 // message: 'Original CSV data fetch successfull',
    //                 // data: idArray
    //                 lambdaTaskRoot: process.env.LAMBDA_TASK_ROOT,
    //                 dirnameL: path.resolve('sales_data_ABC.csv'),
    //                 fileNameL: __filename,
    //                 allInCurrentDir:fs.readdirSync(__dirname),
    //                 // allInCurrentDir2:fs.readFileSync('sales_data_ABC.csv'),SS
    //                 allInLAMBDAROOT:fs.readdirSync(process.env.LAMBDA_TASK_ROOT),
    //                 allInLAMBDAROOTSRC:fs.readdirSync(process.env.LAMBDA_TASK_ROOT+'/src'),
    //                 allInLAMBDAROOTSRC2:fs.readdirSync('/var/task/src/'),
    //                 // allInTMP1:fs.readdirSync('./tmp'),
    //                 // allInTMP2:fs.readdirSync('./tmp/'),
    //                 allInOpt1:fs.readdirSync('/opt/'),
    //                 allInSrv:fs.readdirSync('/srv/'),
    //                 // allInRoot:fs.readdirSync('/root/'),
    //                 allInDev:fs.readdirSync('/dev/'),
    //                 allInBin:fs.readdirSync('/bin/'),
    //                 allInMedia:fs.readdirSync('/media/')

    //             });
    
    fs.createReadStream(resolvedLAMBDAPath)
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
        const ws = fs.createWriteStream(resolvedLAMBDAPath);

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