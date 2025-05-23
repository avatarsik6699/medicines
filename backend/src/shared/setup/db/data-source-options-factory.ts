import { utils } from "src/shared/utils";
import { DataSourceOptions } from "typeorm";

type Params = {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
};

export async function dataSourceOptionsFactory(params: Params): Promise<DataSourceOptions> {
	const pathResolver = utils.PathResolver.init();

	const [{ paths: entities }, { paths: migrations }] = await Promise.all([
		pathResolver.getPaths({ required: true, patterns: ["**/*.entity{.ts,.js}"] }),
		pathResolver.getPaths({
			required: false,
			patterns: ["**/migrations/*{.ts,.js}"],
		}),
	]);

	return {
		type: "postgres",
		host: params.host,
		port: params.port,
		username: params.username,
		password: params.password,
		database: params.database,
		entities,
		migrations,
		synchronize: false,
		logging: false,
	};
}
