import bcrypt from 'bcrypt';
import type { BcryptPort } from '../../domain/bcrypt.port.js';

export class BcryptRepository implements BcryptPort {
  async encrypt(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}
