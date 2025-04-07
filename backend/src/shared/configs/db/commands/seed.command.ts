import { Command, CommandRunner, Option } from "nest-commander";
import ora from "ora";
import { DbConfig } from "../db.config";
import { SeedService } from "../services/seed.service";

const { MESSAGES, DEFAULT_COUNT, ERRORS } = DbConfig.seedConstants;

/**
 * Interface for seed command options
 * @interface SeedOptions
 * @property {boolean} [clean] - Whether to clean the database before seeding
 * @property {boolean} [force] - Whether to force seeding even if data exists
 * @property {number} [count] - Number of records to create for each entity
 */
export interface SeedOptions {
	clean?: boolean;
	force?: boolean;
	count?: number;
}

/**
 * Command for seeding the database with test data
 * @class SeedCommand
 * @extends CommandRunner
 * @description This command is used to populate the database with test data for development and testing purposes.
 * It can create various entities like pharmacological groups, active substances, trade names, drugs, pharmacies, etc.
 *
 * @example
 * // Basic usage
 * npm run cli:seed
 *
 * @example
 * // Clean database before seeding
 * npm run cli:seed -- --clean
 *
 * @example
 * // Force seeding even if data exists
 * npm run cli:seed -- --force
 *
 * @example
 * // Specify number of records to create
 * npm run cli:seed -- --count 10
 */
@Command({
	name: "seed",
	description: "Seed the database with test data",
})
export class SeedCommand extends CommandRunner {
	constructor(private readonly seedService: SeedService) {
		super();
	}

	async run(_: string[], options: SeedOptions): Promise<void> {
		const spinner = ora("Starting database seeding...").start();

		try {
			console.log(options.clean);
			// Check if data exists and force option is not set
			if (!options.force && (await this.seedService.hasData())) {
				spinner.fail(ERRORS.DATA_EXISTS);
				return;
			}

			// Clean database if requested
			if (options.clean) {
				spinner.text = MESSAGES.CLEANING;
				await this.seedService.cleanDatabase();
				spinner.succeed(MESSAGES.CLEANING);
			}

			// Pharmacological groups step
			spinner.text = MESSAGES.CREATING_PHARMACOLOGICAL_GROUPS;
			spinner.start();
			const pharmacologicalGroups = await this.seedService.createPharmacologicalGroups();
			spinner.succeed(MESSAGES.CREATING_PHARMACOLOGICAL_GROUPS);

			// Active substances step
			spinner.text = MESSAGES.CREATING_ACTIVE_SUBSTANCES;
			spinner.start();
			const activeSubstances = await this.seedService.createActiveSubstances(pharmacologicalGroups);
			spinner.succeed(MESSAGES.CREATING_ACTIVE_SUBSTANCES);

			// Trade names step
			spinner.text = MESSAGES.CREATING_TRADE_NAMES;
			spinner.start();
			const tradeNames = await this.seedService.createTradeNames(activeSubstances);
			spinner.succeed(MESSAGES.CREATING_TRADE_NAMES);

			// Drugs step
			spinner.text = MESSAGES.CREATING_DRUGS;
			spinner.start();
			const drugs = await this.seedService.createDrugs(tradeNames);
			spinner.succeed(MESSAGES.CREATING_DRUGS);

			// Pharmacy chains step
			spinner.text = MESSAGES.CREATING_PHARMACY_CHAINS;
			spinner.start();
			const pharmacyChains = await this.seedService.createPharmacyChains();
			spinner.succeed(MESSAGES.CREATING_PHARMACY_CHAINS);

			// Pharmacies step
			spinner.text = MESSAGES.CREATING_PHARMACIES;
			spinner.start();
			const pharmacies = await this.seedService.createPharmacies(pharmacyChains);
			spinner.succeed(MESSAGES.CREATING_PHARMACIES);

			// Pharmacy drugs step
			spinner.text = MESSAGES.CREATING_PHARMACY_DRUGS;
			spinner.start();
			await this.seedService.createDrugsAvailableInPharmacies(pharmacies, drugs);
			spinner.succeed(MESSAGES.CREATING_PHARMACY_DRUGS);

			spinner.succeed("Database seeding completed successfully!");
		} catch (error) {
			spinner.fail("Error during database seeding");
			console.log(error);
			throw error;
		}
	}

	/**
	 * Parse the count option
	 * @param value - The value passed to the count option
	 * @returns The parsed number
	 */
	@Option({
		flags: "-n, --count <number>",
		description: "Number of records to create for each entity",
	})
	parseCount(value: string): number {
		const count = parseInt(value, 10);

		return isNaN(count) ? DEFAULT_COUNT : count;
	}

	/**
	 * Parse the clean option
	 * @param value - The value passed to the clean option
	 * @returns The parsed boolean
	 */
	@Option({
		flags: "-c, --clean",
		description: "Clean database before seeding",
	})
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	parseClean(_: string): boolean {
		return true;
	}

	/**
	 * Parse the force option
	 * @param value - The value passed to the force option
	 * @returns The parsed boolean
	 */
	@Option({
		flags: "-f, --force",
		description: "Force seeding even if data exists",
	})
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	parseForce(_: string): boolean {
		return true;
	}
}
