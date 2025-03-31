import { Module } from "@nestjs/common";
import { Drug } from "./drug/entities/drug.entity";
import { Pharmacy } from "./pharmacy/entities/pharmacy.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DrugModule } from "./drug/drug.module";
import { PharmacyModule } from "./pharmacy/pharmacy.module";

@Module({
	imports: [TypeOrmModule.forFeature([Drug, Pharmacy]), DrugModule, PharmacyModule],
	exports: [DrugModule, PharmacyModule],
})
export class CoreModule {}
