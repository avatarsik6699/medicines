import { Module } from "@nestjs/common";
import { DatabaseModule } from "./shared/setup/db/db.module";
import { ScrapingModule } from "./scraping/scrapping.module";
import { AppController } from "./app.controller";
import { SeedModule } from "./shared/features/seed/seed.module";
import { CoreModule } from "./core/core.module";
import { EnvConfigModule } from "./shared/setup/env-config/env-config.module";

@Module({
	controllers: [AppController],
	imports: [SeedModule, EnvConfigModule, CoreModule, DatabaseModule, ScrapingModule],
})
export class AppModule {}
