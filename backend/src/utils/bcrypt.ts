import * as bcrypt from 'bcrypt';
const SALT = 10;
export async function encodePassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, SALT);
}
