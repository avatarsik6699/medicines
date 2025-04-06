import { Logger } from "@nestjs/common";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { utils } from "src/shared/utils";
import { DataSource, DataSourceOptions } from "typeorm";

export class TestingPostgreSqlDbContainer {
	static container: StartedPostgreSqlContainer;
	static dataSource: DataSource;
	private static readonly logger = new Logger(TestingPostgreSqlDbContainer.name);

	static async start(): Promise<TestingPostgreSqlDbContainer> {
		const self = TestingPostgreSqlDbContainer;

		self.logger.log("Initializing test database environment");

		try {
			if (self.container && self.dataSource) {
				return self;
			}

			self.container = await self.createContainer();
			self.dataSource = await (await self.createDataSource()).initialize();

			self.logger.log("Test database environment initialized");
		} catch (error) {
			if (error instanceof Error) {
				self.logger.error(`Failed to initialize test database: ${error.message}`);
				self.logger.error(`Test database initialization failed: ${error.message}`);
			} else {
				self.logger.error(`Failed to initialize test database: ${error}`);
				self.logger.error(`Test database initialization failed: ${error}`);
			}

			throw error;
		}

		return self;
	}

	static async stop(): Promise<void> {
		const self = TestingPostgreSqlDbContainer;

		self.logger.log("Stopping test database environment");

		if (self.dataSource?.isInitialized) {
			await self.dataSource.destroy();
		}

		if (self.container) {
			await self.container.stop();
		}

		self.logger.log("Test database environment stopped");
	}

	static async cleanDatabase(): Promise<void> {
		const self = TestingPostgreSqlDbContainer;

		self.logger.log("Cleaning database");

		if (self.dataSource) {
			const entities = self.dataSource.entityMetadatas;

			if (entities.length === 0) {
				self.logger.log("No entities found to clean");
				return;
			}

			const tableNames = entities.map(entity => `"${entity.tableName}"`).join(", ");
			await self.dataSource.query(`TRUNCATE TABLE ${tableNames} CASCADE;`);
			self.logger.log(`Database cleaned (${entities.length} tables)`);
		} else {
			self.logger.log("No data source available to clean");
		}
	}

	static getStatus() {
		const self = TestingPostgreSqlDbContainer;

		return {
			containerRunning: !!self.container,
			dataSourceInitialized: !!(self.dataSource && self.dataSource.isInitialized),
		};
	}

	private static async createContainer(): Promise<StartedPostgreSqlContainer> {
		const self = TestingPostgreSqlDbContainer;

		if (self.container) {
			return self.container;
		}
		self.logger.log("Creating PostgreSQL container");
		const startTime = Date.now();

		const container = await new PostgreSqlContainer("postgres:17-alpine")
			.withReuse()
			.withAutoRemove(false)
			.withExposedPorts(5432)
			.withDatabase("testdb")
			.withUsername("test")
			.withPassword("test")
			.start();

		self.logger.log(
			`PostgreSQL container started on port ${container.getMappedPort(5432)} in ${Date.now() - startTime}ms`
		);

		return container;
	}

	private static async createDataSource(): Promise<DataSource> {
		if (!TestingPostgreSqlDbContainer.container) {
			throw new Error("Container is not started");
		}

		if (TestingPostgreSqlDbContainer.dataSource) {
			return TestingPostgreSqlDbContainer.dataSource;
		}
		const self = TestingPostgreSqlDbContainer;

		self.logger.log("Creating data source");

		const pathResolver = utils.PathResolver.init();

		const { paths: entities } = await pathResolver.getPaths({
			required: true,
			patterns: ["**/*.entity{.ts,.js}"],
		});

		const options: DataSourceOptions = {
			type: "postgres",
			host: TestingPostgreSqlDbContainer.container.getHost(),
			port: TestingPostgreSqlDbContainer.container.getPort(),
			username: TestingPostgreSqlDbContainer.container.getUsername(),
			password: TestingPostgreSqlDbContainer.container.getPassword(),
			database: TestingPostgreSqlDbContainer.container.getDatabase(),
			entities,
			synchronize: true,
			logging: ["error"],
		};

		self.logger.log(`Data source created with ${entities.length} entities`);

		return new DataSource(options);
	}
}
