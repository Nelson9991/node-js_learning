import { yarg } from '../../../src/config/plugins/args.plugin';
import fs from 'fs';

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('../../../src/config/plugins/args.plugin');

  return yarg;
};

describe('Test args.plutins.ts', () => {
  const opriginalArgs = process.argv;

  beforeEach(() => {
    process.argv = opriginalArgs;
    jest.resetModules();
  });

  test('should return default values', async () => {
    const yarg = await runCommand(['-b', '5']);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'table',
        d: 'out'
      })
    );
  });

  test('should return config with custom values', async () => {
    const yarg = await runCommand([
      '-b',
      '10',
      '-l',
      '5',
      '-s',
      '-n',
      'test.txt',
      '-d',
      'outTest'
    ]);

    expect(yarg).toEqual(
      expect.objectContaining({
        b: 10,
        l: 5,
        s: true,
        n: 'test.txt',
        d: 'outTest'
      })
    );
  });
});
