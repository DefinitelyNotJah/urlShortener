const tokensModel = require('../../models/tokens')
const usersModel = require('../../models/users')
const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().length(64).required(),
	newName: yup.string().required().min(4).max(24)
});

module.exports = (app) => {
	app.post('/change-name', async (req, res, next) => {
		let {
			Token,
			newName
		} = req.body
		try {
			await schema.validate({
				Token,
				newName
			})
			const tokenExist = await tokensModel.findOne( { token : Token, expired : false })
			if(tokenExist)
			{
				let userExist = await usersModel.findOne( { id : tokenExist.assignedid })
				if(userExist)
				{
					newName = newName.toLowerCase()
					newName = newName.trim()
					userExist.name = newName
					await userExist.save()
					res.send({
						success : true,
						message : 'Name has been successfuly changed'
					})
				}
				else
				{
					next(new Error('Token invalid'))
				}
			}
			else
			{
				next(new Error('Token invalid'))
			}
		} catch (err) {
			next(err)
		}
	})
}
