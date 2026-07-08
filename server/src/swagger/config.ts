import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application Tracker API',
      version: '1.0.0',
      description: 'REST API for the Job Application Tracker application',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 