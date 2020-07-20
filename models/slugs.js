const { model, Schema } = require('mongoose')
const uuid = require('uuid')
const slugs = Schema({
	id : {
		type : String,
		default : uuid.v4()
	},
	url : {
		type : String,
		default : ''
	},
	slug : {
		type : String,
		default : ''
	},
	time_added : {
		type : Date,
		default : Date()
	},
	assignedid : {
		type : String,
		default : ''
	},
	clicked : {
		type : Number,
		default : 0
	}
})
module.exports = model('slugs', slugs)