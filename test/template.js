var vows = require( 'vows' ),
	assert = require('assert' )
	suite = vows.describe( 'DBuffer' );

require( '../env.js' );

suite.addBatch({
	'' : {
		'topic' : function() {
			return DBuffer;
		},
		'' : function( DBuffer ) {
		}
	}
});

suite.export( module );
