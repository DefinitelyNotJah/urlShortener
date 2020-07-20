const tokensModel = require('../../models/tokens')
const usersModel = require('../../models/users')
const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().length(64).required(),
	oldPassword: yup.string().required().min(8),
	newPassword: yup.string().required().min(8)
});

module.exports = (app) => {
	app.post('/change-password', async (req, res, next) => {
		const {
			Token,
			oldPassword,
			newPassword
		} = req.body
		try {
			await schema.validate({
				Token,
				oldPassword,
				newPassword
			})
			const tokenExist = await tokensModel.findOne({ token : Token, expired: false })
			if(tokenExist)
			{
				let userExists = await usersModel.findOne({ id : tokenExist.assignedid })
				if(userExists)
				{
					if(oldPassword === userExists.password)
					{
						userExists.password = newPassword
						await userExists.save()
						res.send({
							success : true,
							message : 'Password has been successfuly changed'
						})
					}
					else
					{
						next(new Error('Old password does not match current password'))
					}
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
		} catch (err)
		{
			next(err)
		}
	})
}