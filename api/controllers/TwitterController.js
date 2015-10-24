/**
 * TwitterController
 *
 * @description :: Server-side logic for managing twitters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'Q3dqoM35m5BYpF36IZ4sVGRPZ',
    consumerSecret: 'CVpvJNeUUx8bL4jXUwkEgCBaz7efTSLLcaNHrefQNA1VNR9ZPC',
    callback: 'http://localhost:1337/getTwitterCredentials'
});
module.exports = {
	getUser : function (req, res) {

	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log(error);
    } else {
    	req.session.requestToken = requestToken;
    	req.session.requestTokenSecret = requestTokenSecret;
        //store token and tokenSecret somewhere, you'll need them later; redirect user 
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+requestToken);
    }
	});

	},
	getTwitterCredentials : function (req, res) {
		req.session.oauth_token = req.param('oauth_token');
		req.session.oauth_verifier = req.param('oauth_verifier');

		twitter.getAccessToken(req.session.requestToken, req.session.requestTokenSecret, req.session.oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
		    if (error) {
		        console.log(error);
		    } else {
		    	req.session.accessToken =  accessToken;
		    	req.session.accessTokenSecret =  accessTokenSecret;
		        //store accessToken and accessTokenSecret somewhere (associated to the user) 
		        //Step 4: Verify Credentials belongs here 
		     twitter.verifyCredentials(req.session.accessToken, req.session.accessTokenSecret, function(error, data, response) {
		    if (error) {
		    	console.log('error');
		    	console.log(error);
		       res.redirect('/access');
		    } else {

		        //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented) 
		        //data contains the user-data described in the official Twitter-API-docs 
		        //you could e.g. display his screen_name 
		        Twitter.destroy({})
		        	.exec(function createCB(err, created){ //Clone records in our sails model
					  console.log("destroy TWITTER CURRENT USER");
					  //Create Logic
					Twitter.create(data)
			        	.exec(function createCB(err, created){ //Clone records in our sails model
						  console.log("created Twitter Current User");
					});
	            	
				}); //End CB Destroy

		        res.redirect('/getMentions');
		    }
		});
		    }
		});


		
	},

	getMentions : function (req, res) { //Get Records from Twitter API
		twitter.getTimeline("mentions",{
			count: 10
		},
	    req.session.accessToken,
	    req.session.accessTokenSecret,
	    function(error, data, response) {
	        if (error) {
	           console.log(error);
	        } else {
	        	//Destroy Logic
	        	Timeline.destroy({})
		        	.exec(function createCB(err, created){ //Clone records in our sails model
					  console.log("destroy");
					  //Create Logic
					Timeline.create(data)
			        	.exec(function createCB(err, created){ //Clone records in our sails model
						  console.log("created");
						  return  res.redirect('/menciones');
					});
	            	
				}); //End CB Destroy



			}; //end ELSE 
	    });

	},

	listMentions : function (req , res){
		Timeline.find()
	        .exec(function timelineCB(err, data){ //Clone records in our sails model
				return  res.view('menciones/all',{
                	m: data
			          });
			});
	},
//Para que trabajen con los live tweets, usar este GetMentions y cambiar la ruta de listMentions a Get Mentions
/*	getMentions : function (req, res) {
	twitter.getTimeline("mentions",{
			count: 10
		},
	    req.session.accessToken,
	    req.session.accessTokenSecret,
	    function(error, data, response) {
	        if (error) {
	           console.log(error);
	        } else {
	            return  res.view('menciones/all',{
                m: data
			            });
			    };
	        });

	},*/		
};

