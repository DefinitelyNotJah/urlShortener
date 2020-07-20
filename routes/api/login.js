const usersModel = require('../../models/users')
const tokensModel = require('../../models/tokens')
const Generate = require('../../functions/generate')
const yup = require('yup');

const schema = yup.object().shape({
	Email: yup.string().email().required(),
	Password: yup.string().required().min(8)
});

module.exports = (app) => {
	app.post('/login', async (req, res, next) => {
		let {
			Email,
			Password
		} = req.body
		try {
			await schema.validate({
				Email,
				Password
			})
			Email = Email.trim()
			Email = Email.toLowerCase()
			const MatchedUser = await usersModel.findOne({
				email : Email,
				password : Password
			})
			if(MatchedUser)
			{
				const NewToken = new tokensModel()
				const token = Generate(64)
				NewToken.token = token
				NewToken.assignedid = MatchedUser.id
				await NewToken.save()
				res.send({
					success : true,
					message : {
						token : token,
						name : MatchedUser.name
					}
				})
			}
			else
			{
				next(new Error('Email and/or password mismatch'))
			}
		} catch ( err )
		{
			next(err)
		}
	})
}