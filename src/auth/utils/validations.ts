import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'cpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          return regex.test(value);
        },
      },
    });
  };
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'cnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
          return regex.test(value);
        },
      },
    });
  };
}
