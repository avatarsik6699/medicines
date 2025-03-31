import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoreModule } from "./core/core.module";
import dataSource from "./shared/configs/db/data-source";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env", load: [envsFactoryMapper] }),
		TypeOrmModule.forRootAsync({ useFactory: () => dataSource.options }),
		CoreModule,
	],
})
export class AppModule {}
