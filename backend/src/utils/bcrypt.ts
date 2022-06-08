import * as bcrypt from 'bcrypt';
const SALT = 10;
export async function encodePassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, SALT);
}
export async function comparePassword(
  inputPassword: string,
  dbPassword: string,
) {
  return bcrypt.compare(inputPassword, dbPassword);
}
