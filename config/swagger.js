import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Node.js Todo CRUD API Documentation"
    },
    servers: [
      {
        url: "http://localhost:3001"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;