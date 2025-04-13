import { Logger, ModuleMetadata, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";

interface TestingModuleOptions extends ModuleMetadata {
	config?: {
		globalPrefix?: string;
		cors?: boolean;
		validationPipe?: ValidationPipeOptions;
	};
}

export class TestingModuleFactory {
	private readonly logger = new Logger(TestingModuleFactory.name);

	private app: NestExpressApplication;
	private moduleRef: TestingModule;

	getApp(): NestExpressApplication {
		return this.app;
	}

	getModuleRef(): TestingModule {
		return this.moduleRef;
	}

	private constructor(private readonly options: TestingModuleOptions) {}

	static create(options: TestingModuleOptions): TestingModuleFactory {
		return new TestingModuleFactory(options);
	}

	async initialize(): Promise<TestingModuleFactory> {
		try {
			const { imports = [], providers = [], controllers = [], config = {} } = this.options;

			this.moduleRef = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRootAsync({
						useFactory: () => $db.dataSource.options,
					}),
					...imports,
				],
				providers,
				controllers,
			}).compile();

			this.app = this.moduleRef.createNestApplication<NestExpressApplication>();

			if (config.globalPrefix) {
				this.app.setGlobalPrefix(config.globalPrefix);
			}

			if (config.cors) {
				this.app.enableCors();
			}

			if (config.validationPipe) {
				this.app.useGlobalPipes(new ValidationPipe(config.validationPipe));
			}

			await this.app.init();

			this.logger.log("Test module initialized successfully");
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error("Failed to initialize test module", error?.stack);
			} else {
				this.logger.error("Failed to initialize test module", error);
			}

			throw error;
		}

		return this;
	}

	async destroy(): Promise<void> {
		try {
			await this.app.close();

			this.logger.log("Test module cleaned up successfully");
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error("Failed to cleanup test module", error?.stack);
			} else {
				this.logger.error("Failed to cleanup test module", error);
			}

			throw error;
		}
	}
}
