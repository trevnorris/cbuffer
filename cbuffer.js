(function( global ) {

function CBuffer() {
	var i = 0;
	// handle cases where "new" keyword wasn't used
	if (!( this instanceof CBuffer )) {
		if ( arguments.length > 1 || typeof arguments[0] !== 'number' ) {
			return CBuffer.apply( new CBuffer(), arguments );
		} else {
			return new CBuffer( arguments[0] );
		}
	}
	// this is the same in either scenario
	this.size = this.start = 0;
	// set to callback fn if data is about to be overwritten
	this.overflow = false;
	// build CBuffer based on passed arguments
	if ( arguments.length > 1 || typeof arguments[0] !== 'number' ) {
		this.data = new Array( arguments.length );
		this.end = ( this.length = arguments.length ) - 1;
		this.push.apply( this, arguments );
	} else {
		this.data = new Array( arguments[0] );
		// force preallocation of memory to each array slot, for quicker operation on buffer
		for ( ; i < arguments[0]; i++ ) {
			this.data[i] = undefined;
		}
		this.end = ( this.length = arguments[0] ) - 1;
	}
	return this;
}

CBuffer.prototype = {
	// properly set constructor
	constructor : CBuffer,

	/* mutator methods */
	// pop last item
	pop : function() {
		var item;
		if ( this.size === 0 ) return;
		item = this.data[ this.end ];
		delete this.data[( this.size + this.start - 1 ) % this.length ];
		this.size--;
		this.end = ( this.end - 1 + this.length ) % this.length;
		return item;
	},
	// push item to the end
	push : function() {
		var i = 0;
		// check if overflow is set, and if data is about to be overwritten
		if ( this.overflow && this.size + arguments.length > this.length ) {
			// call overflow function and send data that's about to be overwritten
			for ( ; i < this.size + arguments.length - this.length; i++ ) {
				this.overflow( this.data[( this.end + i + 1 ) % this.length ], this );
			}
		}
		// push items to the end, wrapping and erasing existing items
		// using arguments variable directly to reduce gc footprint
		for ( i = 0; i < arguments.length; i++ ) {
			this.data[( this.end + i + 1 ) % this.length ] = arguments[i];
		}
		// recalculate size
		if ( this.size < this.length ) {
			if ( this.size + i > this.length ) this.size = this.length;
			else this.size += i;
		}
		// recalculate end
		this.end = ( this.end + i ) % this.length;
		// recalculate start
		this.start = ( this.length + this.end - this.size + 1 ) % this.length;
		// return number current number of items in CBuffer
		return this.size;
	},
	// reverse order of the buffer
	reverse : function() {
		var i = 0,
			tmp;
		for ( ; i < ~~( this.size / 2 ); i++ ) {
			tmp = this.data[( this.start + i ) % this.length ];
			this.data[( this.start + i ) % this.length ] = this.data[( this.start + ( this.size - i - 1 )) % this.length ];
			this.data[( this.start + ( this.size - i - 1 )) % this.length ] = tmp;
		}
		return this;
	},
	// remove and return first item
	shift : function() {
		var item;
		// check if there are any items in CBuff
		if ( this.size === 0 ) return;
		// store first item for return
		item = this.data[ this.start ];
		// delete first item from memory
		delete this.data[ this.start ];
		// recalculate start of CBuff
		this.start = ( this.start + 1 ) % this.length;
		// decrement size
		this.size--;
		return item;
	},
	// sort items
	sort : function( fn ) {
		if ( fn ) this.data.sort( fn );
		else this.data.sort();
		this.start = 0;
		this.end = this.size - 1;
		return this;
	},
	// add item to beginning of buffer
	unshift : function() {
		var i = 0;
		// check if overflow is set, and if data is about to be overwritten
		if ( this.overflow && this.size + arguments.length > this.length ) {
			// call overflow function and send data that's about to be overwritten
			for ( ; i < this.size + arguments.length - this.length; i++ ) {
				this.overflow( this.data[ this.end - ( i % this.length )], this );
			}
		}
		for ( i = 0; i < arguments.length; i++ ) {
			this.data[( this.length + this.start - ( i % this.length ) - 1 ) % this.length ] = arguments[i];
		}
		if ( this.length - this.size - i < 0 ) {
			this.end += this.length - this.size - i;
			if ( this.end < 0 ) this.end = this.length + ( this.end % this.length );
		}
		if ( this.size < this.length ) {
			if ( this.size + i > this.length ) this.size = this.length;
			else this.size += i;
		}
		this.start -= arguments.length;
		if ( this.start < 0 ) this.start = this.length + ( this.start % this.length );
		return this.size;
	},

	/* accessor methods */
	// return index of first matched element
	indexOf : function( arg, idx ) {
		if ( !idx ) idx = 0;
		for ( ; idx < this.size; idx++ ) {
			if ( this.data[( this.start + idx ) % this.length ] === arg ) return idx;
		}
		return -1;
	},
	// return last index of the first match
	lastIndexOf : function( arg, idx ) {
		if ( !idx ) idx = this.size - 1;
		for ( ; idx >= 0; idx-- ) {
			if ( this.data[( this.start + idx ) % this.length ] === arg ) return idx;
		}
		return -1;
	},

	/* iteration methods */
	// check every item in the array against a test
	every : function( callback, context ) {
		var i = 0;
		if ( context ) {
			for ( ; i < this.size; i++ ) {
				if ( !callback.call( context, this.data[( this.start + i ) % this.length ], i, this ))
					return false;
			}
		} else {
			for ( ; i < this.size; i++ ) {
				if ( !callback( this.data[( this.start + i ) % this.length ], i, this ))
					return false;
			}
		}
		return true;
	},
	// loop through each item in buffer
	forEach : function( callback, context ) {
		var i = 0;
		// check if context was passed
		if ( context ) {
			for ( ; i < this.size; i++ ) {
				callback.call( context, this.data[( this.start + i ) % this.length ], i, this );
			}
		} else {
			for ( ; i < this.size; i++ ) {
				callback( this.data[( this.start + i ) % this.length ], i, this );
			}
		}
	},
	// check items agains test until one returns true
	some : function( callback, context ) {
		var i = 0;
		if ( context ) {
			for ( ; i < this.size; i++ ) {
				if ( callback.call( context, this.data[( this.start + i ) % this.length ], i, this ))
					return true;
			}
		} else {
			for ( ; i < this.size; i++ ) {
				if ( callback( this.data[( this.start + i ) % this.length ], i, this ))
					return true;
			}
		}
		return false;
	},

	/* utility methods */
	// return first item in buffer
	first : function() {
		return this.data[ this.start ];
	},
	// return last item in buffer
	last : function() {
		return this.data[ this.end ];
	},
	// return specific index in buffer
	get : function( arg ) {
		return this.data[( this.start + arg ) % this.length ];
	},
	// set value at specified index
	set : function( idx, arg ) {
		return this.data[( this.start + idx ) % this.length ] = arg;
	},
	// return clean array of values
	toArray : function() {
		var narr = new Array( this.size ),
			i = 0;
		for ( ; i < this.size; i++ ) {
			narr[i] = this.data[( this.start + i ) % this.length ];
		}
		return narr;
	}
};

global.CBuffer = CBuffer;

}( this ));
