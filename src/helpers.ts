export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined`);
  }
  return value;
}
