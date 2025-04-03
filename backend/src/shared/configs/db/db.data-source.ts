import * as dotenv from "dotenv";
import { utils } from "src/shared/utils";
import { DataSource } from "typeorm";
import { envsFactoryMapper } from "../envs-factory-mapper";

dotenv.config();

const { database } = envsFactoryMapper();

export async function dataSourceFactory() {
	const pathResolver = utils.PathResolver.init();

	const [{ paths: entities }, { paths: migrations }] = await Promise.all([
		pathResolver.getPaths({ required: true, patterns: ["**/*.entity{.ts,.js}"] }),
		pathResolver.getPaths({
			required: true,
			patterns: ["shared/configs/db/migrations/*{.ts,.js}"],
		}),
	]);

	return new DataSource({
		type: "postgres",
		host: database.host,
		port: database.port,
		username: database.username,
		password: database.password,
		database: database.name,
		entities,
		migrations,
		synchronize: false,
		logging: false,
	});
}
