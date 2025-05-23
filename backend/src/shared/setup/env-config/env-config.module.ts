import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./configuration";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: false,
			envFilePath: ".env",
			load: [configuration],
		}),
	],
	exports: [ConfigModule],
})
export class EnvConfigModule {}
