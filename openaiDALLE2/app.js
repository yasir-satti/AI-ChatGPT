const http = require('http');
const { Configuration, OpenAIApi } = require("openai");

const hostname = '127.0.0.1';
const port = 3000;

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.NODE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

let responsUrl

const prompt = require('prompt-sync')();

const openaiPrompt = prompt('Please input prompt: ');
const numberOfImages = 1;
const imageResolution = "256x256"

async function getOpenaiResponse() {
const response = await openai.createImage({
  prompt: openaiPrompt,
  n: numberOfImages,
  size: imageResolution,
});
responsUrl = response.data.data[0].url
}

getOpenaiResponse()

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World');
  res.setHeader('Content-Type', 'text/html');
  res.end(`<html><body><h1>This is HTML</h1><p>Prompt: ${openaiPrompt}<br><p>Number of images: ${numberOfImages}<br><p>Image resolution: ${imageResolution}<br><br><img src="${responsUrl}"></img></body></html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});