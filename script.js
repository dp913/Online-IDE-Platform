async function executeCode() {
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;
    console.log(selectedLanguage);
    const code = document.getElementById('codeInput').value;

    const requestBody = { language: selectedLanguage, code };
    console.log('Request:', { method: 'POST', url: `http://your-server-url/execute`, body: requestBody });
    console.log('Request JSON:', requestBody);


    try {
        const response = await fetch(`http://192.168.124.215:3000/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ language: selectedLanguage, code }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayOutput(data.result || data.error.stderr);
        
    } catch (error) {
        console.error('Error:', error);
        displayOutput('Error occurred while executing the code.');
    }
}

function displayOutput(output) {
    document.getElementById('output').innerHTML = `<pre>${output}</pre>`;
}
