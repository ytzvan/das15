/**
 * ComentariosController
 *
 * @description :: Server-side logic for managing comentarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add : function (req, res) {
		console.log(req.body);
		Comentarios.create(req.body)
	    .exec(function comentarioCB(err, comentario){ //Clone records in our sails model
	    	if (err){
	    		return res.send(err);
	    	}
				return res.redirect('/denuncias/'+req.param('denuncias'));
			});
	}
};

