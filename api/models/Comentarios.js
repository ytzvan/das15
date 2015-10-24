/**
* Comentarios.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	user  : { 
  		type: 'string'
  	},

  	comment  : { 
  		type: 'string'
  	},

  	photo  : { 
  		type: 'string',
  		defaultsTo: "http://urbita.com/img/default/default_user_256.png"
  	},

  	denuncias: { // TODO: Make the relationship with locations
      model:'denuncias',
      defaultsTo: null
    },

  }
};

