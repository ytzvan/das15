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
		.populate('Comentarios')
	    .exec(function denunciacb(err, denuncia){ 
	    	if (err){
	    		return res.send(err);
	    	}
				return  res.view('denuncias/single', {d: denuncia});
				//return  res.json(denuncia);
			});
	},

	updateStatus : function (req, res) {
		var id= req.param('id');

		Denuncias.update({id:id},{status:req.param('status')})
		.exec(function afterwards(err, updated){
		  if (err) {
		    // handle error here- e.g. `res.serverError(err);`
		    return res.serverError(err);
		  }
		  	console.log(updated);
			  return res.redirect('/denuncias/'+req.param('id'));
			});
		},

	login : function (req, res) {
		return  res.view('login');
	},	


	home : function (req, res) {
		var homeData = {};
		Denuncias.count({status: 1})
		.exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}	
	    		homeData.open = denuncias;
			});
		Denuncias.count({status: 2})
		.exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}	
	    		homeData.inProgress = denuncias;
			});
		Denuncias.count({status: 3})
		.exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}	
	    		homeData.completed = denuncias;
			});
		Denuncias.count({status:4})
		.exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}	
	    		homeData.denied = denuncias;
			});
		Denuncias.count({})
		.exec(function denunciacb(err, denuncias){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}	
	    		homeData.total = denuncias;
	    		JSON.stringify(homeData);
	    		console.log(homeData);
				return  res.view('home', {d: homeData});
			});
	}

	
};

