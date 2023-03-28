import express from 'express';

const server = express();

server.get('/', (req, res) => res.send('Funcionou'));

export {server};
