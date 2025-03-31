import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { envsFactoryMapper } from "./shared/configs/envs-factory-mapper";
import { ValidationPipe } from "@nestjs/common";
import { Swagger } from "./shared/configs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";

dotenv.config();

const { port } = envsFactoryMapper();

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set("query parser", "extended");

	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
	app.setGlobalPrefix("api");

	new Swagger().setup(app);

	await app.listen(port);
}

void bootstrap();
