import * as path from "path";
import * as fs from "fs";
import { glob } from "glob";

type PathConfig = {
	patterns: string[];
	required?: boolean;
};

type PathValidationResult = {
	success: boolean;
	paths: string[];
	errors: string[];
};

export class PathResolver {
	private static instance: PathResolver;

	private isCompiled: boolean;

	private constructor() {
		this.isCompiled = process.env.NODE_ENV !== "cli";
	}

	static init(): PathResolver {
		if (!PathResolver.instance) {
			PathResolver.instance = new PathResolver();
		}

		return PathResolver.instance;
	}

	async getPaths({ patterns, required = false }: PathConfig): Promise<PathValidationResult> {
		const resolvedPaths = this.resolvePaths(patterns);

		const result = await this.validatePaths(resolvedPaths);

		if (required && !result.success) {
			throw new Error(`Required paths not found: ${result.errors.join(", ")}`);
		}

		return result;
	}

	/**
	 * Получает и валидирует пути для фабрик
	 */
	async getFactoryPaths(config: PathConfig): Promise<PathValidationResult> {
		const defaultPatterns = ["shared/configs/db/factories/*{.ts,.js}"];

		const patterns = config.patterns || defaultPatterns;
		const resolvedPaths = this.resolvePaths(patterns);

		const result = await this.validatePaths(resolvedPaths);

		if (config.required && !result.success) {
			throw new Error(`Required factory paths not found: ${result.errors.join(", ")}`);
		}

		return result;
	}

	/**
	 * Получает и валидирует пути для сущностей
	 */
	async getEntityPaths(config: PathConfig): Promise<PathValidationResult> {
		const defaultPatterns = ["**/*.entity{.ts,.js}", "**/*.mixin{.ts,.js}"];

		const patterns = config.patterns || defaultPatterns;
		const resolvedPaths = this.resolvePaths(patterns);

		const result = await this.validatePaths(resolvedPaths);

		if (config.required && !result.success) {
			throw new Error(`Required paths not found: ${result.errors.join(", ")}`);
		}

		return result;
	}

	/**
	 * Получает и валидирует пути для миграций
	 */
	async getMigrationPaths(config: PathConfig): Promise<PathValidationResult> {
		const defaultPatterns = ["shared/configs/db/migrations/*{.ts,.js}"];

		const patterns = config.patterns || defaultPatterns;
		const resolvedPaths = this.resolvePaths(patterns);

		const result = await this.validatePaths(resolvedPaths);

		if (config.required && !result.success) {
			throw new Error(`Required migration paths not found: ${result.errors.join(", ")}`);
		}

		return result;
	}

	/**
	 * Проверяет существование файлов по заданным путям (паттернам)
	 *
	 * Метод использует glob для поиска файлов, соответствующих указанным паттернам.
	 * Возвращает результат валидации, включающий найденные пути и ошибки, если они возникли.
	 */
	private async validatePaths(patterns: string[]): Promise<PathValidationResult> {
		const errors: string[] = [];
		const foundPaths: string[] = [];

		for (const pattern of patterns) {
			try {
				const files = await glob(pattern, {
					ignore: ["node_modules/**"],
					absolute: true,
					posix: true,
				});

				if (files.length === 0) {
					errors.push(`No files found matching pattern: ${pattern}`);
				} else {
					foundPaths.push(...files);
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					errors.push(`Error processing pattern ${pattern}: ${error.message}`);
				} else {
					errors.push(`Error processing pattern ${pattern}: unknown error`);
				}
			}
		}

		return {
			success: errors.length === 0,
			paths: foundPaths,
			errors,
		};
	}

	/**
	 * Получает базовую директорию в зависимости от окружения
	 */
	private getBaseDir(): string {
		return this.isCompiled ? "dist" : "src";
	}

	/**
	 * Преобразует относительные пути в абсолютные
	 */
	private resolvePaths(patterns: string[]): string[] {
		return patterns.map(pattern =>
			path
				.resolve(process.cwd(), this.getBaseDir(), pattern)
				// Perhaps this will work in the system on Windows, but will not work in Unix
				// https://stackoverflow.com/questions/72313482/glob-paths-dont-work-in-my-windows-environment
				.replace(/\\/g, "/")
		);
	}

	/**
	 * Проверяет существование директории
	 */
	async validateDirectory(dirPath: string): Promise<boolean> {
		try {
			await fs.promises.access(dirPath);
			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Создает директорию, если она не существует
	 */
	async ensureDirectory(dirPath: string): Promise<void> {
		if (!(await this.validateDirectory(dirPath))) {
			await fs.promises.mkdir(dirPath, { recursive: true });
		}
	}
}
