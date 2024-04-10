import {HttpAdapterHost, NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaClientExceptionFilter} from "./prisma-client-exception/prisma-client-exception.filter";
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
      .setTitle('Roy Lunetier')
      .setDescription('')
      .setVersion('0.1')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
