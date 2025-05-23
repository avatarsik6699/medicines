export const CONSTANTS = {
	/**
	 * Default number of records to create for each entity
	 */
	DEFAULT_COUNT: 5,

	/**
	 * Messages for different stages of seeding
	 */
	MESSAGES: {
		START: "Starting database seeding...",
		CLEANING: "Cleaning database...",
		CREATING_PHARMACY_CHAINS: "Creating pharmacy chains...",
		CREATING_PHARMACIES: "Creating pharmacies...",
		CREATING_PHARMACY_DRUGS: "Creating pharmacy drugs...",
		CREATING_PHARMACOLOGICAL_GROUPS: "Creating pharmacological groups...",
		CREATING_ACTIVE_SUBSTANCES: "Creating active substances...",
		CREATING_TRADE_NAMES: "Creating trade names...",
		CREATING_DRUGS: "Creating drugs...",
		SUCCESS: "Database seeding completed successfully!",
		ERROR: "Error during database seeding",
	},

	/**
	 * Error messages
	 */
	ERRORS: {
		DATA_EXISTS: "Data already exists in the database. Use --force to override.",
		CLEAN_FAILED: "Failed to clean database",
		SEED_FAILED: "Failed to seed database",
	},
} as const;
