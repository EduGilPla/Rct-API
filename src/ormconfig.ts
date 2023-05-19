import { User } from "./auth/user/user.model";
import { DataSource } from "typeorm";
import { Motherboard } from "./products/motherboard/motherboard.model";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  database: "rct",
  username: "postgres",
  password: "123",
  entities: [User,Motherboard],
  migrations: ['./migrations/**.js']
})