import {
	ArgumentMetadata,
	Body,
	Controller,
	Get,
	Param,
	PipeTransform,
	Post,
	UsePipes,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { Allow, IsNotEmpty, IsNumber, IsString, validate } from "class-validator";

class DTO {
	// @IsString()
	// @Expose()
	@Allow()
	name: string;

	// @Transform((data) => {
	//   console.log("transform", data);
	// 	return 123;
	// }, {toClassOnly: true})
	// @Type((data) => {
	//   console.log(data)
	//   return Number
	// })
	// @Expose()
	// @Type(() => {
	// 	console.log("type");
	// 	return Number;
	// })

	@Transform((data) => {
		console.log("transform", data);
		return Number(data.value);
	}, {toClassOnly: true})
	// @IsNotEmpty()
	@IsNumber()
	age: number;
}

// class SomeTransformPipe implements PipeTransform {
// 	constructor(private readonly name: string) {}
// 	async transform(value: any, {metatype, type}: ArgumentMetadata) {

//     if (type === "body" && metatype instanceof Function) {
//       console.log(metatype, type, value)
//       const instance = plainToInstance(metatype, value);
//      const result =  await validate(instance);

//      console.log(result)
//     }

// 		return value;
// 	}
// }

@Controller("app")
export class AppController {
	// @Get("test/:id")
	// async index(@Param(new SomeTransformPipe("test")) params: { id: number }) {
	// 	return `Hello World ${params.id} ${typeof params.id}`;
	// }

	@Post("test/:id")
	// @UsePipes(new SomeTransformPipe("post-test"))
	async test(@Param("id") id: number, @Body() body: DTO) {
		console.log(body);
		return `Hello World ${id} ${body.name} ${body.age}`;
	}
}
