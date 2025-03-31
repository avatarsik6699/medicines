import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class Swagger {
	setup(app: INestApplication<unknown>) {
		const config = new DocumentBuilder()
			.setTitle("Документация")
			.setDescription("Документация к запросам")
			.setVersion("1.0")
			.build();

		const document = SwaggerModule.createDocument(app, config, {
			operationIdFactory: (controllerKey, methodKey) => {
				return `${this.transformControllerName(controllerKey)}${this.capitalizeFirstLetter(methodKey)}`;
			},
		});

		SwaggerModule.setup("swagger", app, document, {
			yamlDocumentUrl: "swagger/yaml",
			jsonDocumentUrl: "swagger/json",
			explorer: false,
			customSiteTitle: "API",
		});
	}

	private transformControllerName(input: string) {
		const match = input.match(/([A-Za-z]+)Controller/);

		if (match) {
			return match[1].toLowerCase();
		}

		return input;
	}

	private capitalizeFirstLetter(input: string) {
		if (input.length === 0) {
			return input;
		}

		const firstChar = input.charAt(0).toUpperCase();
		const restOfString = input.slice(1);

		return firstChar + restOfString;
	}
}
