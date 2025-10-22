import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema  } from 'zod';
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('=== DEBUG INFO ===');
        console.log('Error:', error);
        console.log('==================');
        throw new BadRequestException('Validation failed', { cause: fromZodError(error) });
      }
      console.log('=== DEBUG INFO ===');
      console.log('Error:', error);
      console.log('==================');
      throw new BadRequestException('Validation failed', { cause: error });
    }
  }
}