// Wrender/Graphics/BufferInterface.js, CWEBBY.

// Import/Export
export { VertexArrayInterface };

// BufferInterface
class VertexArrayInterface {
    constructor (layout, data, indices = null) {
        this.layout = layout;    
        this.data = data;

        this.indicies = indices;    


        this.sizeof = 0;
        this.layout.forEach(element => 
            this.sizeof += element.type.sizeof * element.count);
    }

    // Vars 
    indicies; // Optional.
    layout;
    data;

    sizeof;
    length;

    // Methods
    release() { console.error("VertexArrayInterface.release not implemented!"); }
    unbind() { console.error("VertexArrayInterface.unbind not implemented!"); }
    bind() { console.error("VertexArrayInterface.bind not implemented!"); }
}