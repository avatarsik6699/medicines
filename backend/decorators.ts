function ClassDecorator() {
	console.log("Class decorator");
	return function (constructor: Function) {
		console.log("Class decorator applied");
	};
}

function MethodDecorator() {
	console.log("Method decorator");
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log("Method decorator applied");
	};
}

function ParameterDecorator() {
	console.log("Parameter decorator");
	return function (target: any, propertyKey: string, parameterIndex: number) {
		console.log(`Parameter decorator applied for index ${parameterIndex}`);
	};
}

@ClassDecorator()
class Example {
	@MethodDecorator()
	method(@ParameterDecorator() param1: string, @ParameterDecorator() param2: number) {
		console.log("method", param1, param2);
	}

	constructor() {
		console.log("Constructor");
	}
}

const example = new Example();

console.log("instance", example);

example.method("test", 1);
