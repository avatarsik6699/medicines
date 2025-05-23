import { Module } from "@nestjs/common";
import { PharmacyController } from "./controllers/pharmacy.controller";
import { DrugsAvailableInPharmacy } from "./entities/drugs-available-in-pharmacy.entity";
import { PharmacyChain } from "./entities/pharmacy-chain.entity";
import { Pharmacy } from "./entities/pharmacy.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DrugModule } from "../drug/drug.module";
import { AvailableDrugFiltersService } from "./services/available-drug-filters.service";
import { PharmacyService } from "./services/pharmacy.service";
import { AvailableDrugFiltersController } from "./controllers/available-drug-filters.controller";
import { AvailableDrugController } from "./controllers/available-drug.controller";
import { AvailableDrugService } from "./services/available-drug.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Pharmacy, DrugsAvailableInPharmacy, PharmacyChain]),
		DrugModule,
	],

	controllers: [PharmacyController, AvailableDrugFiltersController, AvailableDrugController],
	providers: [PharmacyService, AvailableDrugFiltersService, AvailableDrugService],
})
export class PharmacyModule {}
