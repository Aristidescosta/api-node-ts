import { server } from "./server/index";

server.listen(process.env.PORT || 8081, () => console.log(`App rodando na porta ${process.env.PORT || 8081}`));