import { User } from "./auth/user/user.model";
import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  database: "rct",
  username: "postgres",
  password: "123",
  entities: [User],
  migrations: ['./migrations/**.js']
})