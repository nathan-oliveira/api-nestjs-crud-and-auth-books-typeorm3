import { HttpException, HttpStatus } from '@nestjs/common';
import { registerDecorator, ValidationOptions } from 'class-validator';

/* Exemplo de uso:
@ExcludeColumn({ message: 'A propriedade "tenant" não pode ser alterada.' })
tenant?: string;
*/

export const ExcludeColumn = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string): void {
    registerDecorator({
      name: 'excludeColumn',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return !value;
        },
        defaultMessage() {
          const { message } = validationOptions;
          throw new HttpException(
            message ?? 'Não é possível completar a solicitação.',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        },
      },
    });
  };
};
