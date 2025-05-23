import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Configuration } from "../env-config/configuration";
import { dataSourceOptionsFactory } from "./data-source-options-factory";
import './data-source-migration'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<Configuration>) => {
				const database = configService.get<Configuration["database"]>("database")!;

				return dataSourceOptionsFactory({
					host: database.host,
					port: database.port,
					username: database.username,
					password: database.password,
					database: database.name,
				});
			},
		}),
	],
})
export class DatabaseModule {}
