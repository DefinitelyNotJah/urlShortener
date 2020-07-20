const usersModel = require('../../models/users')
const yup = require('yup');

const schema = yup.object().shape({
	Email: yup.string().email().required(),
	Username: yup.string().required().min(4).max(24),
	Password: yup.string().required().min(8)
});

module.exports = (app) => {
	app.post('/register', async (req, res, next) => {
		let { 
			Email,
			Username,
			Password
		} = req.body;
		try {
			await schema.validate({
				Email,
				Username,
				Password
			})
			Email = Email.trim()
			Email = Email.toLowerCase()
			Username = Username.trim()
			Username = Username.toLowerCase()
			const MatchedEmail = await usersModel.findOne( { email : Email })
			const MatchedUser = await usersModel.findOne( { name : Username })
			if(!MatchedUser && !MatchedEmail)
			{
				let NewUser = new usersModel()
				NewUser.name = Username;
				NewUser.email = Email;
				NewUser.password = Password;
				await NewUser.save()
				res.send({
					success : true,
					message : 'User has been successfuly created'
				})
			}
			else
			{
				next(new Error('Username/Email already exists'))
			}
		} catch ( err )
		{
			next(err)
		}
	})
}