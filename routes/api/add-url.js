const tokensModel = require('../../models/tokens')
const slugsModel = require('../../models/slugs')
const yup = require('yup');

const schema = yup.object().shape({
	Token: yup.string().length(64).required(),
	Url: yup.string().url().required(),
	Slug: yup.string().matches(/^[a-zA-Z0-9\-_]+$/g).max(10).required()
});

module.exports = (app) => {
	app.post('/add_url', async (req, res, next) => {
		let { 
			Token,
			Url,
			Slug
		} = req.body;
		try {
			await schema.validate({
				Token,
				Url,
				Slug
			})
			Url = Url.trim()
			Url = Url.toLowerCase()
			const MatchedToken = await tokensModel.findOne( { token : Token, expired : false })
			if(MatchedToken)
			{
				const MatchedSlug = await slugsModel.findOne( { slug : Slug })
				if(!MatchedSlug)
				{
				let NewSlug = new slugsModel()
					NewSlug.url = Url;
					NewSlug.slug = Slug;
					NewSlug.assignedid = MatchedToken.assignedid;
					await NewSlug.save()
					res.send({
						success : true,
						message : 'Slug has been successfuly created'
					})
				}
				else
				{
					next(new Error('Slug already exists'))
				}
				
			}
			else
			{
				next(new Error('Invalid token'))
			}
		} catch ( err )
		{
			next(err)
		}
	})
}