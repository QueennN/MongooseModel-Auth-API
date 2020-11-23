import * as mongoose from 'mongoose'
import { Req, rawQuery } from './types'
import * as queryString from "query-string"
import * as rawQueryParser from 'api-query-params'
import * as methods from './methods'
import mongoosePaginate from 'mongoose-paginate-v2'
export default class API {
    queryString
    rawQueryParser
    connection
    requester
    models
    roles
    methods

    constructor(options) {
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
        this.methods = new Map()
        this.queryString = queryString
        this.rawQueryParser = rawQueryParser

    }

    async connect(url: string = 'mongodb://localhost:27017/API', config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection

    }

    async parseRequester(req, res) {
        let user = await this.requester.findOne(req.body)
        return user != null ? { user } : false
    }

    async setRequester(model: mongoose.Schema<any>) {
        this.requester = model
    }

    async newRole(roleName: String, roleFunction: Function) {
        this.roles.set(roleName, roleFunction)
    }

    async setModel(modelName: string, schema: mongoose.Schema<any>) {

        schema.plugin(mongoosePaginate);

        schema.statics.get = methods._get
        schema.statics.post = methods._post
        schema.statics.delete = methods._delete
        schema.statics.patch = methods._patch
        schema.statics.pagination = methods._pagination


        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }




    async run<T extends Req>(user, req: T) {
    }


    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }


    // RUN 
    private async controlAuth(User: mongoose.Document, Model: mongoose.Model<any>, field: String) {
        return true
    }


    private filter(user: mongoose.Document, Model: mongoose.Model<any>, model: mongoose.Document): mongoose.Document {
        let paths = Model.prototype.schema.paths
        for (let i in paths) {
            let roleFunc = this.roles.get(paths[i])
            if (!roleFunc(user, model)) {
                model[i] = undefined
            }
        }
        return model
    }



    //PARSE

    private longUrl(rawLongQuery: string): Array<string> {
        return rawLongQuery.split('/')
    }

    private url(rawUrl: string): rawQuery {
        let res = this.queryString.parseUrl(rawUrl)
        return { modelName: res.url, rawQuery: res.query }
    }

    private query(rawQuery: string) {
        return this.rawQueryParser(rawQuery)
    }


}