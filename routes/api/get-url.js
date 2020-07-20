const tokensModel = require('../../models/tokens')
const slugsModel = require('../../models/slugs')
const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().required().length(64)
});

module.exports = (app) => {
	app.get('/url_list', async (req, res, next) => {
		const {
			Token
		} = req.query
		try {
			await schema.validate({
				Token
			})
			const TokenExist = await tokensModel.findOne( { token : Token, expired : false })
			if(TokenExist)
			{
				slugsModel.find({ assignedid : TokenExist.assignedid}, (err, resu) => {
					if(err)
						next(err)
					if(resu.length == 0)
					{
						res.send({
							success : true,
							message : []
						})
					}
					else
					{
						let return_urls = []
						resu.forEach( (element) => {
							return_urls.push({
								id : element.id,
								slug : element.slug,
								url : element.url,
								clicks : element.clicked,
								time : element.time_added
							})
						})
						res.send({
							success : true,
							message : return_urls
						})
					}
				})
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