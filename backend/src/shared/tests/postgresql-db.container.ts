import { Logger } from "@nestjs/common";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { DataSource, DataSourceOptions } from "typeorm";
import { utils } from "../utils";

export class TestingPostgreSqlDbContainer {
	private static instance: TestingPostgreSqlDbContainer;
	private static readonly logger = new Logger(TestingPostgreSqlDbContainer.name);

	container: StartedPostgreSqlContainer;
	dataSource: DataSource;

	get getStatus() {
		return {
			containerRunning: !!this.container,
			dataSourceInitialized: !!(this.dataSource && this.dataSource.isInitialized),
		};
	}

	private constructor() {}

	static build(): TestingPostgreSqlDbContainer {
		if (!TestingPostgreSqlDbContainer.instance) {
			TestingPostgreSqlDbContainer.instance = new TestingPostgreSqlDbContainer();
		}

		return TestingPostgreSqlDbContainer.instance;
	}

	async startContainer() {
		const self = TestingPostgreSqlDbContainer;

		this.container = await this.createContainer();

		self.logger.log(`PostgreSQL container started on port ${this.container.getMappedPort(5432)}`);

		return this;
	}

	async connectToDatabase() {
		const self = TestingPostgreSqlDbContainer;

		this.dataSource = await this.createDataSource();
		await this.dataSource.initialize();

		self.logger.log("Connected to database");

		return this;
	}

	async stop(): Promise<void> {
		const self = TestingPostgreSqlDbContainer;

		if (this.getStatus.dataSourceInitialized) {
			await this.dataSource.destroy();
		}

		if (this.getStatus.containerRunning) {
			await this.container.stop();
		}

		self.logger.log("Test database environment stopped");
	}

	async resetDatabase(): Promise<void> {
		if (!this.getStatus.dataSourceInitialized) throw new Error("Data source is not initialized");

		const entities = this.dataSource.entityMetadatas;

		if (entities.length === 0) return;

		const tableNames = entities.map(entity => `"${entity.tableName}"`).join(", ");

		await this.dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE;`);
	}

	private async createContainer(): Promise<StartedPostgreSqlContainer> {
		if (this.container) return this.container;

		const container = await new PostgreSqlContainer("postgres:17-alpine")
			.withReuse()
			.withAutoRemove(false)
			.withExposedPorts(5432)
			.withDatabase("testdb")
			.withUsername("test")
			.withPassword("test")
			.start();

		return container;
	}

	private async createDataSource(): Promise<DataSource> {
		if (!this.container) throw new Error("Container is not started");
		if (this.dataSource) return this.dataSource;

		const pathResolver = utils.PathResolver.init();

		const { paths: entities } = await pathResolver.getPaths({
			required: true,
			patterns: ["**/*.entity{.ts,.js}"],
		});

		const options: DataSourceOptions = {
			type: "postgres",
			host: this.container.getHost(),
			port: this.container.getPort(),
			username: this.container.getUsername(),
			password: this.container.getPassword(),
			database: this.container.getDatabase(),
			entities,
			synchronize: true,
			logging: ["error"],
		};

		return new DataSource(options);
	}
}

declare global {
	// eslint-disable-next-line no-var
	var $db: TestingPostgreSqlDbContainer;
}
