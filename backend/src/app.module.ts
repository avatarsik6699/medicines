import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "./core/core.module";
import { dataSourceFactory } from "./shared/configs/db/db.data-source";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";
import { DatabaseModule } from "./shared/configs/db/db.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env", load: [envsFactoryMapper] }),
		TypeOrmModule.forRootAsync({ useFactory: async () => (await dataSourceFactory()).options }),
		CoreModule,
		DatabaseModule,
	],
})
export class AppModule {}
