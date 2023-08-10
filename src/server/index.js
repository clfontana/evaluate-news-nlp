const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const FormData = require('form-data');
const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });
const application_key = process.env.API_KEY;

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

//console.log(`Your API key is ${process.env.API_KEY}`);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});


// onnly for test
app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

/**
 * @description post data to retrieve info from meaningcloud api
 * @param {*} req 
 * @param {*} res 
 */
const postData = async (req, res) => {
    console.log('meaningcloud -> name: ' + req.query.name);

    let content = '';
    let formBody = [];

    let encodedKey   = '';
    let encodedValue = '';
    /*
    let urlEncoded = new URLSearchParams();
    urlEncoded.append('key', application_key);
    urlEncoded.append('lang', "auto");
    urlEncoded.append('url', req.query.name);
    */
    
    formBody.push(encodeURIComponent('key')  + '='  + encodeURIComponent(application_key));
    formBody.push(encodeURIComponent('lang') + '='  + encodeURIComponent("auto"));
    formBody.push(encodeURIComponent('url')  + '='  + encodeURIComponent(req.query.name));
    formBody = formBody.join("&");
    
    console.log(application_key);
    console.log(req.query.name);    
    
    const response = await fetch("http://api.meaningcloud.com/sentiment-2.1", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //headers: { 'content-type' : 'application/json' },
        body: formBody,
        redirect: 'follow'
    });
    
    try{
        
        const data = await response.json();

        const content = { 
            general_subjectivity : data.subjectivity, 
            general_confidence : data.confidence, 
            general_score_tag : data.score_tag,
            dataSentences_confidence: '',
            dataSentences_score_tag: '',
            dataSentences_text: ''
        }

        const dataSentences = data.sentence_list;
        if (dataSentences && dataSentences.length > 0){
            content.dataSentences_confidence = dataSentences[0].confidence;
            content.dataSentences_score_tag = dataSentences[0].score_tag;
            content.dataSentences_text = dataSentences[0].text;
        }
        
        res.send(content);

    }catch(error) {
        console.log('error', error);
    }
}

app.get('/meaningcloud', postData);