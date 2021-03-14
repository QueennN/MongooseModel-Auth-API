module.exports = {
    name: 'system_model',
    schema: {
        schema: {
            type: "JSONB",
            input: "json",
            read: ['everybody'],
            write: ['everybody'],

        },
    },
    fookie: {
        get: {
            auth: ["everybody"],
            rule: [],
            modify: []
        },
        getAll: {
            auth: ["everybody"],
            rule: [],
            modify: []
        },
        patch: {
            auth: ["everybody"],
            rule: [],
            modify: [],
            effect: ['sync'],
        },
        post: {
            rule: [],
            auth: ["everybody"],
            effect: ['sync'],
            modify: []
        },
        delete: {
            rule: [],
            auth: ["everybody"],
        },
        options: {
            auth: ["everybody"],
            modify: []
        }
    }
}