// Wrender/Graphics/TexturesInterface.js, CWEBBY.

// Import/Export
export { TextureInterface, 
    Texture2DInterface, RenderTextureInterface }

// TextureInterface 
class TextureInterface {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // Vars
    width; height;

    // Methods
    release() { console.error("TextureInterface.release not implemented!"); }
}

// Texture2DInterface 
class Texture2DInterface extends TextureInterface {
    constructor(image, params = {}) {
        super(image.width, image.height);

        this.filter = params['filter'] || "LINEAR";
        this.wrap = params['wrap'] || "CLAMP_TO_EDGE";
    }

    // Vars
    wrap; filter; 

    // Methods
    bind(slot) { console.error("Texture2DInterface.bind not implemented!"); }
    unbind() { console.error("Texture2DInterface.unbind not implemented!"); }
    release() { console.error("Texture2DInterface.release not implemented!"); }
}

// RenderTextureInterface 
class RenderTextureInterface extends TextureInterface {
    constructor(width, height, params = {}) {
        super(width, height);

        // filter?

        this.resize(width, height);
    }

    // Functions
    release() { console.error("RenderTextureInterface.release not implemented!"); }
    resize(width, height) { console.error("RenderTextureInterface.resize not implemented!") }
}