const { model, Schema } = require('mongoose')
const uuid = require('uuid')

const tokens = Schema({
	id : {
		type : String,
		default : uuid.v4()
	},
	token : {
		type : String,
		default : ''
	},
	assignedid : {
		type : String,
		default : ''
	},
	expired : {
		type : Boolean,
		default : false
	},
	created : {
		type : Date,
		default : Date()
	},
})

module.exports = model('tokens', tokens)