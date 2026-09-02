function Queue(maxSize) {
    this.elements = [];
    this.maxSize = 5;
    if(maxSize) {
        this.maxSize = maxSize;
    }
 }

 Queue.prototype.enqueue = function (e) {
    this.elements.push(e);
    while(this.elements.length > this.maxSize) {
        this.elements.shift();
    }
 };

 // remove an element from the front of the queue
Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

// check if the queue is empty
Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

// get the element at the front of the queue
Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function() {
    return this.elements.length;
}

export default Queue;