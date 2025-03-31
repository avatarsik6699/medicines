import * as path from "path";
import { DataSource } from "typeorm";
import { envsFactoryMapper } from "../envs-factory-mapper";
import * as dotenv from "dotenv";

dotenv.config();

const { database } = envsFactoryMapper();

export default new DataSource({
	type: "postgres",
	host: database.host,
	port: database.port,
	username: database.username,
	password: database.password,
	database: database.name,
	entities: [path.resolve(process.cwd(), "dist", "**/*.entity{.ts,.js}")],
	migrations: [path.resolve(__dirname + "/migrations/**/*{.ts,.js}")],
	synchronize: false,
	logging: false,
});
