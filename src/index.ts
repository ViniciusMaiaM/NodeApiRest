import { server } from './server/Server';

// Caso a porta localizada no env seja undefined a porta utilizada será a 3333
server.listen(process.env.PORT || 3333, () =>{
  console.log(`O app está rodando na porta ${process.env.PORT || 3333}`);
});
