import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  hashPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, 10);
  }

  comparePassword(plainText: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainText, hashedPassword);
  }
}
