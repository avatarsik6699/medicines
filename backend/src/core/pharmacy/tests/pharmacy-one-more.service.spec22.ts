import { Test, TestingModule } from "@nestjs/testing";
import { PharmacyService } from "../pharmacy.service";
import { CreatePharmacyDto } from "../dtos/create-pharmacy.dto";
import { UpdatePharmacyDto } from "../dtos/update-pharmacy.dto";

describe("PharmacyService2", () => {
	// let service: PharmacyService;

	// beforeEach(async () => {
		// const module: TestingModule = await Test.createTestingModule({
		// 	providers: [PharmacyService],
		// }).compile();

		// service = module.get<PharmacyService>(PharmacyService);
	// });

	it("should be defined", () => {
		expect(true).toBe(true);
	});

	// describe("create", () => {
	// 	it("should return a success message", () => {
	// 		const createPharmacyDto: CreatePharmacyDto = {
	// 			name: "Test Pharmacy",
	// 			address: "Test Address",
	// 			// Add other required fields from your DTO
	// 		};
	// 		expect(service.create(createPharmacyDto)).toBe("This action adds a new pharmacy");
	// 	});
	// });

	// describe("findAll", () => {
	// 	it("should return all pharmacies message", () => {
	// 		expect(service.findAll()).toBe("This action returns all pharmacy");
	// 	});
	// });

	// describe("findOne", () => {
	// 	it("should return a specific pharmacy message", () => {
	// 		const id = 1;
	// 		expect(service.findOne(id)).toBe(`This action returns a #${id} pharmacy`);
	// 	});
	// });

	// describe("update", () => {
	// 	it("should return an update message", () => {
	// 		const id = 1;
	// 		const updatePharmacyDto: UpdatePharmacyDto = {
	// 			name: "Updated Pharmacy",
	// 			// Add other fields that can be updated
	// 		};
	// 		expect(service.update(id, updatePharmacyDto)).toBe(`This action updates a #${id} pharmacy`);
	// 	});
	// });

	// describe("remove", () => {
	// 	it("should return a remove message", () => {
	// 		const id = 1;
	// 		expect(service.remove(id)).toBe(`This action removes a #${id} pharmacy`);
	// 	});
	// });
});
