const tokensModel = require('../../models/tokens')

const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().required().length(64)
});

module.exports = (app) => {
	app.get('/logout', async (req, res, next) => {
		const {
			Token
		} = req.query
		try {
			await schema.validate({
				Token
			})
			tokensModel.findOneAndUpdate({
				token : Token,
				expired : false
			}, {
				$set : {
					expired : true
				}
			}, {
				new : true
			}, (err, ses) => {
				if(err)
					next(err)
				res.send({
					success : true,
					message : 'Sign out successful'
				})
			})
		}
		catch (err) {
			next(err)
		}
	})
}