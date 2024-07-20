const express = require("express");
const path = require("path");
const app = express();
//const fetch = require("node-fetch");
const axios = require('axios');



//cors
const cors = require('cors')
app.use(cors())


app.use(express.json());
//app.use(express.static(path.join(__dirname,'./dist')))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname,'./dist', 'index.html'));
// });
app.get("/getStores", async (req, res) => {
    try {
        console.log("entre al token zoho");
        const response = await axios.get('https://shop.interconnecta.dev/api/stores', {
            headers: {
                "Content-Type": "application/json",
                "Authtoken": 'f734df3d968cde70abbb1cf79d9dba'
            }
        });

        const responseData = response.data;
        console.log(responseData);
        res.status(200).send({resp: responseData});
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(400).send({error: error.message});
    }
});
app.post("/postStores", async (req, res) => {
    try {
        
        const {body}=req;
        const response = await axios.post('https://shop.interconnecta.dev/api/stores',body, {
            headers: {
                "Content-Type": "application/json",
                "Authtoken": 'f734df3d968cde70abbb1cf79d9dba'
            },
        });

        const responseData = response.data;
        console.log(responseData);
        
       //console.log(req);
        res.status(200).send({resp: responseData});
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(400).send({error: error.message});
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});