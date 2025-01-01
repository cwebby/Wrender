/* ~/Core/Textures.js, Cwebb.
 */

// Imports / Exports
export { Texture2D, RenderTexture };

// Texture
class Texture {
    constructor(width, height, params = {}) {
        this.width = width;
        this.height = height;

        this.filter = params['wrap'] || "CLAMP"
        this.filter = params['filter'] || "LINEAR"
    }

    // Vars
    wrap; filter; 
    width; height;

    // Methods
    bind() { console.error("Texture.bind not implemented!"); }
    unbind() { console.error("Texture.unbind not implemented!"); }

    release() { console.error("Texture.release not implemented!"); }
}

// Texture2D
class Texture2D extends Texture {
    constructor(image, params = {}) {
        super(image.width, image.height, params);
    }

    // Functions
    static fromURL(url, params = {}) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = url;

            img.onerror = rej;
            img.onload = () => {
                // switch (WRENDER.GRAPHICS_API)
                // {
                //     case "WebGL":
                //         res(new GLTexture2D(img, params));
                //         break;

                //     case "WebGL":
                //         res(new GLTexture2D(img, params));
                //         break;
                // }
            };
        });
    }
}

// RenderTexture
class RenderTexture extends Texture {
    constructor(width = 1, height = 1, params = {}) {
        super(width, height, params);
        this.resize(width, height);
    }

    // Functions 
    resize(width, height) { console.error("RenderTexture.resize not implemented!"); }
}