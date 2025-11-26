import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "./entity/livro";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",      
  password: "root",          
  database: "biblioteca",
  synchronize: true,
  logging: false,
  entities: [Livro],
});
