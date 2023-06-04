import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration, validationSchema } from './config';
import { EncryptionService } from './services/encryption.service';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class CommonModule {}
