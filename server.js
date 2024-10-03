const http = require('http'); //importação do HTTP
const fs = require('fs'); // importação Files System
const utils = require('./utils'); // importação das funções


const requestListener = function (req, res) {
    if (req.url === "/") {
        res.writeHead(200); //Define o código de status HTTP da resposta como 200 (OK)
        res.end("Gustavo Henrique Franca\n(42) 99999-1234\nCursando Eng. de Software"); // Escreve a resposta HTTP de volta ao usuario  
    }
    else if (req.url === '/sobre') {
        fs.readFile('./sobre.txt', function (err, data) { // Função para leitura do arquivo .txt criado
            res.writeHead(200, {'Content-Type': 'text/txt'}); //Define o código de status HTTP da resposta como 200 (OK)
            res.end(data); // Escreve a resposta HTTP de volta ao usuario
        });

    }
    else if (req.url === '/contato') {
        fs.readFile('./contato.txt', function (err, data) { // Função para leitura do arquivo .txt criado
            res.writeHead(200, {'Content-Type': 'text/txt'}); //Define o código de status HTTP da resposta como 200 (OK)
            res.end(data); // Escreve a resposta HTTP de volta ao usuario
        });

    }
    else if (req.url === '/numero') {
        const randomNum = utils.randomNumber(11); // Chama a função
        console.log('Número gerado:', randomNum); // Log para verificar o valor gerado
        res.writeHead(200); //Define o código de status HTTP da resposta como 200 (OK)
        res.end('Numero gerado aleatoriamente: ' + randomNum); // Escreve a resposta HTTP de volta ao usuario
    }
    // Novo bloco para a saudação personalizada
    else if (req.url.startsWith('/saudacao/')) {
        const nome = req.url.split('/')[2]; // Extrai o nome da URL
        if (nome) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Ola, ${nome.charAt(0).toUpperCase() + nome.slice(1)}!`); // Capitaliza o primeiro caractere do nome
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Por favor, informe um nome na saudação.');
        }
    }
    else { // Para qualquer outro URL, retorna "Página não encontrada"
        res.writeHead(404); //Define o código de status HTTP da resposta como 404 (Página não encontrada)
        res.end("Pagina nao encontrada"); // Escreve a resposta HTTP de volta ao usuario
    }
};

const server = http.createServer(requestListener); // Cria um novo servidor
server.listen(8000, 'localhost', () => { // Vincula o servidor a uma porta e host, e define uma função de callback a ser chamada quando o servidor começar a escutar
    console.log("Servidor está rodando em http://localhost:8000");
});

