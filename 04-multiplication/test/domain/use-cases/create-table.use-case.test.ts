import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case';
import fs from 'fs';

describe('CreateTableUseCase', () => {
  test('should create table with default values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n').length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('1 x 2 = 2');
    expect(table).toContain('10 x 2 = 20');
    expect(rows).toBe(10);
  });

  test('should create table with custom values', () => {
    const options = { base: 3, limit: 5 };

    const createTable = new CreateTable();
    const table = createTable.execute(options);

    const rows = table.split('\n');
    const baseApeerances = rows.filter((x) =>
      x.includes(`${options.base}`)
    ).length;

    expect(baseApeerances).toBe(options.limit);
    expect(table).toContain(`1 x ${options.base} = ${options.base}`);
    expect(table).toContain(
      `${options.limit} x ${options.base} = ${options.base * options.limit}`
    );
    expect(rows.length).toBe(options.limit);
  });
});
