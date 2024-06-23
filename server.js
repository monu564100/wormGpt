const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = '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';
const OPENAI_ORG_ID = 'org-ASIvCByiZsOJWQqYQCxuKOeN';
const OPENAI_PROJECT_ID = 'your_project_id';

app.post('/api/chatgpt', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
            n: 1,
            stop: null,
            temperature: 0
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Organization': OPENAI_ORG_ID,
                'OpenAI-Project': OPENAI_PROJECT_ID
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error in backend:', error);
        res.status(500).json({ error: 'Error fetching results' });
    }
});

app.post('/api/dalle', async (req, res) => {
    try {
        const { prompt, imageSize } = req.body;
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            n: 1,
            size: imageSize
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Organization': OPENAI_ORG_ID,
                'OpenAI-Project': OPENAI_PROJECT_ID
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error in backend:', error);
        res.status(500).json({ error: 'Error fetching results' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
