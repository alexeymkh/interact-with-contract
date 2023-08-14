import { getEnvVariable } from '../src/helpers';

describe('getEnvVariable', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns the value of an environment variable if it is defined', () => {
    process.env.TEST_VARIABLE = 'test value';
    expect(getEnvVariable('TEST_VARIABLE')).toEqual('test value');
  });

  it('throws an error if the environment variable is not defined', () => {
    delete process.env.TEST_VARIABLE;
    expect(() => getEnvVariable('TEST_VARIABLE')).toThrowError('TEST_VARIABLE is not defined');
  });
});
