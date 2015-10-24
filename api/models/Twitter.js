/**
* Twitter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	profile_image_url  : { 
  		type: 'string'
  	},
 	getTwitterAvatar: function (){
  	  var s = this.profile_image_url;
  	  s = s.substring(0, s.indexOf('_normal'));
      return s+'.jpg';
    },
  }
};

