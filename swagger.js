import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'Products API',
    version: "1.0.0",
    description: 'Products API'
  },
  host: 'localhost:3000',
  basePath: "/"
};
const outputFile = './swagger-output.json';
const routes = ['./routes/products.js'];
swaggerAutogen()(outputFile, routes, doc);