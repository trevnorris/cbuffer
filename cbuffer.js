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
	// pop last item
	pop : function() {
		if ( this.size === 0 ) return;
		var item = this.last();
		delete this.data[( this.size + this.start - 1 ) % this.length ];
		this.size--;
		this.end--;
		if ( this.end < 0 ) this.end += this.length;
		return item;
	},
	// reverse order of the buffer
	reverse : function() {
		var i = 0,
			tmp;
		for ( ; i < ~~( this.size / 2 ); i++ ) {
			tmp = this.idx( i );
			this.set( i, this.idx( this.size - i - 1 ));
			this.set( this.size - i - 1, tmp );
		}
		return this;
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
	// loop through each item in buffer
	forEach : function( callback, context ) {
		var i = 0;
		// check if context was passed
		if ( context ) {
			for (; i < this.size; i++ ) {
				callback.call( context, this.idx( i ), i, this );
			}
		} else {
			for (; i < this.size; i++ ) {
				callback( this.idx( i ), i, this );
			}
		}
	},
	// return index of first matched element
	indexOf : function( arg, idx ) {
		if ( !idx ) idx = 0;
		for ( ; idx < this.size; idx++ ) {
			if ( this.idx( idx ) === arg ) return idx;
		}
		return -1;
	},
	// return first item in buffer
	first : function() {
		return this.data[ this.start ];
	},
	// return last item in buffer
	last : function() {
		return this.data[ this.end ];
	},
	// return specific index in buffer
	idx : function( arg ) {
		return this.data[( this.start + arg ) % this.length ];
	}
};

global.CBuffer = CBuffer;

}( this ));
