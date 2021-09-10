const Role = require("../models/Role");

const categoryRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;
  
    const roles = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "moderator" }).save(),
    ]);
  
    console.log(roles)
  } catch (err) {
      return err
  }
};

module.exports = categoryRoles;