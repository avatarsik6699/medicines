import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module";

async function cli() {
	await CommandFactory.run(AppModule, {
		logger: ["error", "warn", "log"],
	});
}

void cli();
