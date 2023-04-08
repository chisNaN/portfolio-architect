const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	try {
		console.log('req.headers.authorizatio', req.headers.authorization);
		//const token = req.headers.authorization.split(' ')[1]
		const token = req.headers?.authorization ?? 'missing auth header'
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        //console.log(err)  
        return res.json({ error: "not allowed: token expired" })
      }
      console.log('user ',user)
      req.auth = { userId: user.userId }
      next()
    })
	} catch {
		console.log('------ inside catch -----')
		res.status(401).json({
			error: new Error('You are not authenticated')
		})
	}
}
