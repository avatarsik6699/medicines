import { Module } from "@nestjs/common";
import { DrugModule } from "./drug/drug.module";
import { PharmacyModule } from "./pharmacy/pharmacy.module";

@Module({
	imports: [DrugModule, PharmacyModule],
	exports: [DrugModule, PharmacyModule],
})
export class CoreModule {}
