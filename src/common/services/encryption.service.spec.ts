import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let encryptionService: EncryptionService;

  beforeEach(() => {
    encryptionService = new EncryptionService();
  });

  describe('hashPassword', () => {
    it('should return a hashed password', () => {
      const plainText = 'password123';
      const hashedPassword = encryptionService.hashPassword(plainText);
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(plainText);
    });
  });

  describe('comparePassword', () => {
    it('should return true if the plain text matches the hashed password', () => {
      const plainText = 'password123';
      const hashedPassword = encryptionService.hashPassword(plainText);
      const result = encryptionService.comparePassword(
        plainText,
        hashedPassword,
      );
      expect(result).toBe(true);
    });

    it('should return false if the plain text does not match the hashed password', () => {
      const plainText = 'password123';
      const incorrectPlainText = 'wrongpassword';
      const hashedPassword = encryptionService.hashPassword(plainText);
      const result = encryptionService.comparePassword(
        incorrectPlainText,
        hashedPassword,
      );
      expect(result).toBe(false);
    });
  });
});
