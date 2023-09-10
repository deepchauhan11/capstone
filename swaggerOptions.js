const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specify the version of the OpenAPI Specification
    info: {
      title: "Food Ordering App API Documentation",
      version: "1.0.0",
      description: "API documentation for food ordering web application",
    },
  },
  // Paths to the API docs and your API routes
  apis: ["./app.js"], // Replace with the actual path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
