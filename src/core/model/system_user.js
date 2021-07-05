module.exports = {
   name: "system_user",
   database: "mongoose",
   display: "email",
   schema: {
      email: {
         unique: true,
         onlyClient: true,
         required: true,
         type: "string",
         input: "text",
      },
      password: {
         onlyClient: true,
         required: true,
         type: "string",
         input: "password",
         read: ["nobody"],
      },
      type: {
         type: "string",
         input: "text",
      },
   },
   fookie: {
      get: {
         role: ["system_admin"],
      },
      getAll: {
         role: ["system_admin"],
      },
      patch: {
         role: ["system_admin"],
      },
      post: {
         role: ["system_admin"],
         modify: ["password"],
      },
      delete: {
         role: ["system_admin"],
      },
      model: {
         role: ["everybody"],
      },
      login: {
         preRule: ["has_pwemail"],
      },
      register: {
         preRule: ["has_pwemail"],
      },
   },
};
