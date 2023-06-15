use "database"

db.createCollection("profile", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "address", "hobbies"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name of the person"
        },
        address: {
          bsonType: "string",
          description: "Street address"
        },
        hobbies: {
          bsonType: "array",
          description: "List of hobbies",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
});


#insert
db.profile.insertOne({
  name: "Visen",
  address: "Kledokan",
  hobbies: ["Membaca", "Menonton"]
});


#get profile
db.profile.findOne({ name: "Visen" });

#update
db.profile.updateOne(
  { name: "Visen" },
  { $set: { hobbies: ["Membaca", "Menonton", "Mendengarkan Musik"] } }
);

#delete
db.profile.deleteOne({ name: "Visen" });


