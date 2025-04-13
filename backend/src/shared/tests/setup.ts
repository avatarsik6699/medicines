import "tsconfig-paths/register";
import { TestingPostgreSqlDbContainer } from "./postgresql-db.container";

const setup = async () => {
	const $db = TestingPostgreSqlDbContainer.build();

	await $db.startContainer();
	await $db.connectToDatabase();

	globalThis.$db = $db;
};

export default setup;
