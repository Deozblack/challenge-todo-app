export interface BcryptPort {
  encrypt(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
