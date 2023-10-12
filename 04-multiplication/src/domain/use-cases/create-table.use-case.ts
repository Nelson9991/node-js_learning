export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions): string {
    let outputMessage = '';

    for (let i = 1; i <= limit; i++) {
      outputMessage += `${i} x ${base} = ${i * base}\n`;
    }

    return outputMessage;
  }
}
