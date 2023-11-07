import { ServerApp } from '../src/presentation/server-app';
describe('App', () => {
  test('should call Server.run with values"', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'dist/app.js',
      '-b',
      '5',
      '-l',
      '10',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-out'
    ];

    await import('../src/app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 5,
      limit: 10,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-out'
    });
  });
});
