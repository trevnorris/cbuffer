function CBuffer() {
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
	// build CBuffer based on passed arguments
	if ( arguments.length > 1 || typeof arguments[0] !== 'number' ) {
		this.data = new Array( arguments.length );
		this.end = ( this.length = arguments.length ) - 1;
		this.push.apply( this, arguments );
	} else {
		this.data = new Array( arguments[0] );
		this.end = ( this.length = arguments[0] ) - 1;
	}
	return this;
}

CBuffer.prototype = {
	// push item to the end
	push : function() {
		var i = 0;
		// push items to the end, wrapping and erasing existing items
		// using arguments variable directly to reduce gc footprint
		for ( ; i < arguments.length; i++ ) {
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
		this.start = this.end - this.size + 1;
		if ( this.start < 0 ) this.start += this.length;
		// return number current number of items in CBuffer
		return this.size;
	},
	// shift first item
	shift : function() {
		var item;
		// check if there are any items in CBuff
		if ( this.size === 0 ) return undefined;
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
	first : function() {
		return this.data[ this.start ];
	},
	last : function() {
		return this.data[ this.end ];
	},
	idx : function( arg ) {
		return this.data[( this.start + arg ) % this.length ];
	}
};

this.CBuffer = CBuffer;
