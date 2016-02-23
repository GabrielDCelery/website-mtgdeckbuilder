module.exports = function(req, res){
	console.log(req.body.id)
	res.json({
		success: true,
		message: 'Got some test data!'
	});
}