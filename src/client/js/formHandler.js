function handleSubmit(event) {

    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;

    if (formText === ''){
        alert('Not a valida data');
        return;
    }

    console.log(`formText: ${formText}`);
    Client.checkForName(formText);

    console.log("::: Form Submitted :::")
    
    fetch('http://localhost:8080/meaningcloud?name=' + formText)
    .then(res => res.json())
    .then(function(res){
        /*
        console.log(`subjectivity: ${res.general_subjectivity}`);
        console.log(`confidence: ${res.general_confidence}`);
        console.log(`score_tag: ${res.general_score_tag}`);
        */
        const testo = `general<br/> 
                       subjectivity: ${res.general_subjectivity}<br>
                       confidence: ${res.general_confidence}<br>
                       score_tag: ${res.general_score_tag}<br>
                       <br>
                       sample sentence:<br>
                       confidence: ${res.dataSentences_confidence}<br>
                       score_tag: ${res.dataSentences_score_tag}<br>
                       text: ${res.dataSentences_text}
                       `;
        /*
        general_confidence : 'confidence1', 
        general_score_tag : 'score_tag1',
        dataSentences_confidence: 'detail confidence',
        dataSentences_score_tag: 'detail tag',
        dataSentences_text: 'text',
        */
        document.getElementById('results').innerHTML = testo;
    });
    
}


export { handleSubmit }
