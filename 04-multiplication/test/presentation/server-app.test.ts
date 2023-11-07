import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';
describe('Tests in server-app.ts', () => {
  const options = {
    base: 5,
    limit: 10,
    showTable: false,
    fileName: 'table-5',
    fileDestination: 'test-out'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  test('should run ServerApp with options', () => {
    // logSpy is a mock function that we can use to spy on the console.log function
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server is running...');
    expect(logSpy).toHaveBeenLastCalledWith('File created!');
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName
    });
  });

  test('should run with custom values mocked', () => {
    const testFileContent = '5 x 1 = 5';

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const mockCreateTable = jest.fn().mockReturnValue(testFileContent);
    const mockSaveFile = jest.fn().mockReturnValue(true);

    const createTableSpy = jest
      .spyOn(CreateTable.prototype, 'execute')
      .mockImplementation(mockCreateTable);

    const saveFileSpy = jest
      .spyOn(SaveFile.prototype, 'execute')
      .mockImplementation(mockSaveFile);

    console.log = logMock;
    console.error = logErrorMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server is running...');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: testFileContent,
      fileDestination: options.fileDestination,
      fileName: options.fileName
    });
    expect(logMock).toHaveBeenCalledWith('File created!');
    expect(logErrorMock).not.toHaveBeenCalled();
  });
});
