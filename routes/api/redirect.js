const slugsModel = require('../../models/slugs')
const yup = require('yup');

const schema = yup.object().shape({
	Slug: yup.string().matches(/^[a-zA-Z0-9\-_]+$/g).max(10).required()
});

module.exports = (app) => {
	app.get('/url/:id', async (req, res, next) => {
		const { id: Slug } = req.params
		try {
			await schema.validate({
				Slug
			})
			const SlugExist = await slugsModel.findOne({ slug : Slug })
			if(SlugExist)
			{
				slugsModel.findOneAndUpdate({
					slug : Slug
				}, {
					$set : {
						clicked : SlugExist.clicked + 1
					}
				}, {
					new : true
				}, (err, reso) => {
					if(err)
						next(err)
					res.send({
						success : true,
						message : SlugExist.url
					})
				})
			}
			else
			{
				next(new Error('Slug/URL does not exist'))
			}
		} catch ( err ) {
			next(err)
		}
	})
}