const functions = require("firebase-functions");
const axios = require("axios");
const cors = require('cors')({ origin: true })

const OPENAI_API_KEY = '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';
const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

const corsHandler = cors(corsOptions);

exports.chatGPT = functions.https.onRequest((req, res) => {

    const corsOptions = {
        origin: (origin, callback) => {
          // Allow requests from the specified origin
          if (origin === "https://pullupnyc.com") {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        methods: 'GET, POST, OPTIONS',
        allowedHeaders: 'Content-Type',
        optionsSuccessStatus: 200
      };
      
    corsHandler(req, res, async () => {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }
  
      const prompt = req.body.prompt;
  
      try {
        const response = await axios.post(
          OPENAI_API_URL,
          {
            prompt: `Create a short event description or a press release about an upcoming ${prompt} event.`,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
  
        res.status(200).send({ result: response.data.choices[0].text.trim() });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error in ChatGPT API call");
      }
    });
  });
  