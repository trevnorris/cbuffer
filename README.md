## JavaScript [Circular Buffer](http://en.wikipedia.org/wiki/Circular_buffer) Utility

The end goal of this project is to implement the entire JavaScript `Array.prototype`, and some
additional utility methods, as a circular buffer.

As JavaScript is used for more and more computationally intensive tasks, it's important to reduce
execution and garbage collection time. By using a circular buffer instead of a native array less
extraneous data bits are generated that will need to be cleaned up later. So use of this library is
two fold: First, if you need a circular buffer for the classical reasons (animation queue, video
streaming) this library can help you out. Second, if you know the maximum size of an array you'll be
working with, using CBuffer can drastically reduce the memory footprint of your application.

While the entire `Array.prototype` API is on the roadmap, it's not all quite here. Below is the
currently implemented API.


### API

#### Mutator Methods

* pop()
* push()
* reverse()
* shift()

#### Accessor Methods

* indexOf()

#### Iteration Methods

* forEach()

#### Utility Methods

* first()
* last()
* get()
* set()
