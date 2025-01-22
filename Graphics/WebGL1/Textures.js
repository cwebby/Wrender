// Wrender/Graphics/WebGL1/Textures.js, CWEBBY.

// Import/Export
import {
    RGBA,
    TEXTURE_2D,
    UNSIGNED_BYTE,

    TEXTURE_WRAP_S,
    TEXTURE_WRAP_T,
    TEXTURE_MIN_FILTER,
    TEXTURE_MAG_FILTER,

    CreateTexture,
    DeleteTexture,
    texParameteri,
    ActiveTexture,
    BindTexture,
    TexImage2D
} from "./API.js"

import { Texture2DInterface, 
    RenderTextureInterface } from "../TexturesInterface.js"
export { Texture2D, RenderTexture }

// WebGL1Texture2D
class Texture2D extends Texture2DInterface {
    constructor(image, params = {}) {
        super(image, params); 
        this.glID = CreateTexture();

        BindTexture(TEXTURE_2D, this.glID);
        TexImage2D(TEXTURE_2D, 0, RGBA, UNSIGNED_BYTE, { pixels: image });

        texParameteri(TEXTURE_2D, TEXTURE_MAG_FILTER, this.filter);
        texParameteri(TEXTURE_2D, TEXTURE_MIN_FILTER, this.filter);
        texParameteri(TEXTURE_2D, TEXTURE_WRAP_S, this.wrap);
        texParameteri(TEXTURE_2D, TEXTURE_WRAP_T, this.wrap);
        BindTexture(TEXTURE_2D, null);
    }

    // Vars
    glID;

    // Methods
    bind(slot) {
        ActiveTexture(slot);
        BindTexture(TEXTURE_2D, this.glID);
    }

    unbind() { BindTexture(TEXTURE_2D, null); }
    release() { DeleteTexture(this.glID); }
}

class RenderTexture extends RenderTextureInterface {
    constructor(width, height, params = {}) {
        super(width, height, params);
    }

    // Methods
    release() { 
        
    }

    resize(width, height) {

    }
}