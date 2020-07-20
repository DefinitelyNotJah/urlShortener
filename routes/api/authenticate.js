const usersModel = require('../../models/users')
const tokensModel = require('../../models/tokens')

const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().required().length(64)
});

module.exports = (app) => {
	app.get('/authenticate', async (req, res, next) => {
		const {
			Token
		} = req.query
		try {
			await schema.validate({
				Token
			})
			const TokenSearch = await tokensModel.findOne({
				token : Token,
				expired : false
			})
			if(TokenSearch)
			{
				const UserSearch = await usersModel.findOne({
					id : TokenSearch.assignedid
				})
				if(UserSearch)
				{
					console.log()
					res.send({
						success : true,
						message : UserSearch.name
					})
				}
				else
				{
					next(new Error('Invalid Token'))
				}
			}
			else
			{
				next(new Error('Invalid Token'))
			}
		}
		catch (err) {
			next(err)
		}
	})
}