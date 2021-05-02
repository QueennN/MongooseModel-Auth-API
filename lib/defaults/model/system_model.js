"use strict";

module.exports = {
  name: 'system_model',
  display: "name",
  schema: {
    name: {
      required: true,
      type: "string"
    },
    display: {
      required: true,
      type: "string",
      "default": "id"
    },
    schema: {
      required: true,
      type: "jsonb"
    },
    fookie: {
      required: true,
      type: "jsonb"
    }
  },
  fookie: {
    get: {
      role: ["system_admin"]
    },
    getAll: {
      filter: ["add_static_models"],
      role: ["system_admin"]
    },
    patch: {
      role: ["system_admin"],
      effect: ['sync']
    },
    post: {
      role: ["system_admin"],
      effect: ['sync']
    },
    "delete": {
      role: ["system_admin"]
    },
    schema: {
      role: ["system_admin"]
    },
    count: {
      role: ["system_admin"]
    }
  }
};