const { model, Schema } = require('mongoose')
const uuid = require('uuid')

const users = Schema({
	id : {
		type : String,
		default : uuid.v4()
	},
	name : {
		type : String,
		default : ''
	},
	email : {
		type : String,
		default : ''
	},
	password : {
		type : String,
		default : ''
	},
	created : {
		type : Date,
		default : Date()
	}
})

module.exports = model('users', users)