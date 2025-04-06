import { Logger, ModuleMetadata } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, QueryRunner } from "typeorm";

interface TestingModuleOptions extends ModuleMetadata {
	dataSource: DataSource;
	config?: {
		globalPrefix?: string;
		cors?: boolean;
	};
}

export class TestingModuleFactory {
	private readonly logger = new Logger(TestingModuleFactory.name);
	private dataSource: DataSource;
	private queryRunner: QueryRunner;

	private app: NestExpressApplication;
	private moduleRef: TestingModule;

	getApp(): NestExpressApplication {
		return this.app;
	}

	getModuleRef(): TestingModule {
		return this.moduleRef;
	}

	getDataSource(): DataSource {
		return this.dataSource;
	}

	getQueryRunner(): QueryRunner {
		return this.queryRunner;
	}

	private constructor(private readonly options: TestingModuleOptions) {
		this.dataSource = options.dataSource;
	}

	static create(options: TestingModuleOptions): TestingModuleFactory {
		return new TestingModuleFactory(options);
	}

	async initialize(): Promise<TestingModuleFactory> {
		try {
			const {
				imports = [],
				providers = [],
				controllers = [],
				dataSource,
				config = {},
			} = this.options;

			this.moduleRef = await Test.createTestingModule({
				imports: [
					TypeOrmModule.forRootAsync({
						useFactory: () => dataSource.options,
						dataSourceFactory: () => Promise.resolve(dataSource),
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

	async startTransaction(): Promise<void> {
		this.queryRunner = this.dataSource.createQueryRunner();
		await this.queryRunner.connect();
		await this.queryRunner.startTransaction();

		this.logger.debug("Transaction started");
	}

	async commitTransaction(): Promise<void> {
		if (!this.queryRunner) {
			throw new Error("Transaction not started");
		}

		await this.queryRunner.commitTransaction();
		await this.queryRunner.release();

		this.logger.debug("Transaction committed");
	}

	async rollbackTransaction(): Promise<void> {
		if (!this.queryRunner) {
			throw new Error("Transaction not started");
		}

		await this.queryRunner.rollbackTransaction();
		await this.queryRunner.release();

		this.logger.debug("Transaction rolled back");
	}

	async cleanup(): Promise<void> {
		try {
			if (this.queryRunner?.isTransactionActive) {
				await this.rollbackTransaction();
			}

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

	async truncateDatabase(): Promise<void> {
		try {
			const entities = this.dataSource.entityMetadatas;
			const tableNames = entities.map(entity => `"${entity.tableName}"`).join(", ");

			await this.dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE;`);
			this.logger.log(`Database truncated (${entities.length} tables)`);
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error("Failed to truncate database", error?.stack);
			} else {
				this.logger.error("Failed to truncate database", error);
			}

			throw error;
		}
	}
}
