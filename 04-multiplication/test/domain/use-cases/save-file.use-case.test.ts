import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {
  // beforeEach(() => {
  // clear mocks before each test
  // jest.clearAllMocks();
  // });

  test('should save file with default values', () => {
    const exists = fs.existsSync('out');
    if (exists) {
      fs.rmSync('out', { recursive: true });
    }

    const saveFile = new SaveFile();
    const options = { fileContent: 'test content' };
    const filePath = 'out/table.txt';

    const result = saveFile.execute(options);
    const checkFiels = fs.existsSync(filePath); // ojo: puede dar falso positivo
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBeTruthy();
    expect(checkFiels).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('error');
    });

    const result = saveFile.execute({ fileContent: 'test content' });

    expect(result).toBeFalsy();

    // clear spys after test
    mkdirSpy.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error msg');
      });

    const result = saveFile.execute({ fileContent: 'test content' });

    expect(result).toBeFalsy();

    // clear spys after test
    writeFileSyncSpy.mockRestore();
  });
});
