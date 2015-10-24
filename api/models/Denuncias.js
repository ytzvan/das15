/**
* Denuncias.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	reporterName  : { 
  		type: 'string'
  	},
  	reporterHandle  : { 
  		type: 'string'
  	},
  	reporterPicture  : { 
  		type: 'string'
  	},
  	reporterID  : { 
  		type: 'string'
  	},
  	text  : { 
  		type: 'string'
  	},
  	TweetID  : { 
  		type: 'string'
  	},
  	TweetID_str : {
  		type: 'string'
  	},

  	TweetPhoto : {
  		type: 'string',
  		defaultsTo: null
  	},
  	date : {
  		type : 'date'
  	},
  	status : {
  		type : 'integer', 
  		defaultsTo : '1' // 1 Abiertas, 2 in progress, 3 cerradas, 4 no aceptadas
  	},
  	category : {
  		type : 'integer',
  		defaultsTo: 1
  	},

  	followersCount : {
  		type : 'string',
  		defaultsTo: 1
  	},

  	followingCount : {
  		type : 'string',
  		defaultsTo: 1
  	},

  	profileBanner : {
  		type : 'string',
  		defaultsTo: 'https://usuarioraiz.files.wordpress.com/2010/02/theme_ntp_background.png'
  	},
  	
  	getTwitterAvatar: function (){
  	  var s = this.reporterPicture;
  	  s = s.substring(0, s.indexOf('_normal'));
  	  console.log(s);
      return s+'.jpg';
    },

    getCategoryName: function (){
  	  var category = this.category;
  	  if (category === 1) {
  	  	return '<span class="label bg-navy">Tránsito</span>';
  	  } else if (category === 2) {
  	  	return '<span class="label bg-teal">Ruido</span>';
  	  } else if (category === 3) {
  	  	return '<span class="label bg-purple">Seguridad</span>';
  	  } else if (category === 4) {
  	  	return '<span class="label bg-orange">Contaminación</span>';
  	  } else if (category === 5) {
  	  	return '<span class="label bg-maroon">Inclusión</span>';
  	  }
      
    },

     getStatusName: function (){
  	  var status = this.status;
  	  if (status === 1) {
  	  	return '<span class="label label-success">Abierta</span>';
  	  } else if (status === 2) {
  	  	return '<span class="label label-warning">En Progreso</span>';
  	  } else if (status === 3) {
  	  	return '<span class="label label-primary">Cerrada</span>';
  	  } else if (status === 4) {
  	  	return '<span class="label label-danger">Denegada</span>';
  	  }
      
    },

  }
};

