const http = require('http');
const { Configuration, OpenAIApi } = require("openai");

const hostname = '127.0.0.1';
const port = 3000;

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.NODE_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function getOpenaiResponse() {
const response = await openai.createImage({
  prompt: "A cute baby sea otter",
  n: 1,
  size: "256x256",
});
console.log(response.data.data[0].url)
}

const responsUrl = getOpenaiResponse()

const url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-JcbCcntiHBsIrzfrD6K69WHn/user-26Lj3wkgapyOEWmzRwr7S8PD/img-Si8trO4dg6KD1zzAohCC5zKM.png?st=2023-05-19T18%3A56%3A50Z&se=2023-05-19T20%3A56%3A50Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-18T20%3A53%3A34Z&ske=2023-05-19T20%3A53%3A34Z&sks=b&skv=2021-08-06&sig=cCforlaS8uRwCR2VgyPaGVm6spvZj0Br0TyCPVuBx/I%3D"

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World');
  res.setHeader('Content-Type', 'text/html');
  res.end(`<html><body><h1>This is HTML</h1><img src="${url}"></img></body></html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});