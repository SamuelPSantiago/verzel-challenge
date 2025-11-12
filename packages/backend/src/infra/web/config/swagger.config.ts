import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const SwaggerDocumentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('Datika API')
    .setDescription('Datika API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'auth-token',
    )

export const SwaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
};