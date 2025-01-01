// Wrender/Graphics/BufferInterface.js, CWEBBY.

// Import/Export
export { VertexArrayInterface };

// BufferInterface
class VertexArrayInterface {
    constructor (layout, data, indices = null) {
        
    }

    get triangleCount() 
        { console.error("VertexArrayInterface.triangleCount not implemented!"); }
    unbind() { console.error("VertexArrayInterface.unbind not implemented!"); }
    bind() { console.error("VertexArrayInterface.bind not implemented!"); }
}