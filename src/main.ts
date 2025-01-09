import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 8000;
  console.log(`Server running on port ${port}`);
  await app.listen(port);
}
bootstrap();
