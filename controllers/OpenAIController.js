const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { OpenAI } = require('openai');
// Set up your OpenAI API key
const apiKey = process.env.VITE_OPENAI_API_KEY;

const getContentOpenAI = async (req, res) => {
    const { prompt } = req.body;
    const openai = new OpenAI({ apiKey });
    try {
        if (!prompt || prompt.length < 3) {
            return errorResponseMessage(res, "Prompt must be at least 3 characters long");
        }
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        return successResponseMessage(res, 'Successfully Get Content!', completion.choices[0]);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { getContentOpenAI }
