/**
 * DenunciasController
 *
 * @description :: Server-side logic for managing denuncias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add : function (req, res) {
		console.log(req.body);
		Denuncias.findOrCreate({
			TweetID : req.param('TweetID')
		},req.body)
	    .exec(function denunciacb(err, denuncia){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}
				return res.redirect('/denuncias');
			});
	},

	list : function (req, res) {
		Denuncias.find()
	    .exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}
				return  res.view('denuncias/all', {d: denuncias});
			});
	},

	single : function (req, res) {
		Denuncias.findOne({id:req.param('id')})
	    .exec(function denunciacb(err, denuncia){ 
	    	if (err){
	    		return res.send(err);
	    	}
	    	console.log(denuncia);
				return  res.view('denuncias/single', {d: denuncia});
			});
	}

	
};

