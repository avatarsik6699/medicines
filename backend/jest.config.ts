import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.jest.json";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",

	rootDir: compilerOptions.baseUrl,
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	testRegex: ".*\\.(spec|test)\\.ts$",
	moduleFileExtensions: ["js", "json", "ts"],
	modulePaths: ["<rootDir>"],

	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
	watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
	transformIgnorePatterns: ["node_modules/(?!(ora)/)", "node_modules/(?!@nestjs)/"],

	cache: true,
	cacheDirectory: ".jest-cache",
	verbose: true,
	maxWorkers: "50%",
	testTimeout: 30000,
	bail: 1,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,

	collectCoverageFrom: [
		"**/*.(t|j)s",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!**/dist/**",
		"!**/coverage/**",
		"!**/jest.config.*",
	],
	coverageDirectory: "../coverage",
	coverageReporters: ["text", "lcov", "html"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},

	globalTeardown: "<rootDir>/src/shared/tests/teardown.ts",
	globalSetup: "<rootDir>/src/shared/tests/setup.ts",
	setupFilesAfterEnv: ["<rootDir>/src/shared/tests/global-hooks-for-every-test.ts"],
};
export default config;
