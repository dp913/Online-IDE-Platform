const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const { promisify } = require('util');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/execute', async (req, res) => {
    const { language, code } = req.body;

    console.log(language, code);

    try {
        if (language === 'python') {
            const {result, error} = await executePythonCode(code);
            res.json({ result });
        } else if (language === 'javascript') {
            const {result, error} = await executeJavaScriptCode(code);
            res.json({ result });
        } else {
            throw new Error('Unsupported language');
        }

    } catch (error) {
        console.error('Error:', error);
        res.json({ error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function executePythonCode(code) {
    // Implement Python code execution logic
    // ...
    const filePath = 'temp_py/temp.py';
    await promisify(require('fs').writeFile)(filePath, code);

    // Execute the Python file
    const execAsync = promisify(exec);
    const { stdout, stderr } = await execAsync(`python ${filePath}`);

    // Remove the temporary Python file
    await promisify(require('fs').unlink)(filePath);

    return { result: stdout, error: stderr };

}

async function executeJavaScriptCode(code) {
    // Implement JavaScript code execution logic
    // ...
    // Save the code to a temporary Python file
    const filePath = 'temp_js/temp.js';
    await promisify(require('fs').writeFile)(filePath, code);

    // Execute the Python file
    const execAsync = promisify(exec);
    const { stdout, stderr } = await execAsync(`node ${filePath}`);

    // Remove the temporary Python file
    await promisify(require('fs').unlink)(filePath);

    return { result: stdout, error: stderr };

}
