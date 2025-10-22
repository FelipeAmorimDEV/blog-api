import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })
 
const config = new DocumentBuilder()
.setTitle('Blog API')
.setDescription('API for the Blog application with JWT authentication')
.setVersion('1.0')
.addBearerAuth()
.addTag("auth")
.addTag("users")
.addTag("categories")
.addTag("posts")
.build()
const document = SwaggerModule.createDocument(app, config)

SwaggerModule.setup('api-docs', app, document)

  await app.listen(port);
}
bootstrap();
