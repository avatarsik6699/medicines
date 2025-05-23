import { dataSourceOptionsFactory } from "./data-source-options-factory";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { EnvironmentVariables } from "../env-config/configuration";
import { DataSource } from "typeorm";

const data = dotenv.parse<EnvironmentVariables>(fs.readFileSync(`.env`));

const setupDataSource = async () => {
	return new DataSource(
		await dataSourceOptionsFactory({
			host: data.DATABASE_HOST,
			port: parseInt(data.DATABASE_PORT, 10),
			username: data.DATABASE_USERNAME,
			password: data.DATABASE_PASSWORD,
			database: data.DATABASE_NAME,
		})
	);
};

export default setupDataSource();
