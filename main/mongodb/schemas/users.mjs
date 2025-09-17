

export const users = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "User Object Validation",
      required: ["email", "name"],
      properties: {
        username: {
          bsonType: "string",
          description: "'username' must be a string and is required"
        }
      }
    }
  }
};
