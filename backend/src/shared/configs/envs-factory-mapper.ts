export const envsFactoryMapper = () => ({
	port: parseInt(process.env.APP_PORT!, 10) || 3000,
	database: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT!, 10) || 5433,
		username: process.env.DATABASE_USERNAME || "postgres",
		password: process.env.DATABASE_PASSWORD || "postgres",
		name: process.env.DATABASE_NAME || "drugs",
	},
});
