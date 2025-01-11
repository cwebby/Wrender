// Wrender/Graphics/WebGL1/WebGL1Textures.js, CWEBBY.

// Import/Export
import {
    GL1_RGBA,
    GL1_TEXTURE_2D,
    GL1_UNSIGNED_BYTE,

    GL1_TEXTURE_WRAP_S,
    GL1_TEXTURE_WRAP_T,
    GL1_TEXTURE_MIN_FILTER,
    GL1_TEXTURE_MAG_FILTER,

    gl1CreateTexture,
    gl1DeleteTexture,
    gl1texParameteri,
    gl1ActiveTexture,
    gl1BindTexture,
    gl1TexImage2D
} from "./WebGL1API.js"

import { Texture2DInterface, 
    RenderTextureInterface } from "../TexturesInterface.js"
export { WebGL1Texture2D, WebGL1RenderTexture }

// WebGL1Texture2D
class WebGL1Texture2D extends Texture2DInterface {
    constructor(image, params = {}) {
        super(image, params); 
        this.gl1ID = gl1CreateTexture();

        gl1BindTexture(GL1_TEXTURE_2D, this.gl1ID);
        gl1TexImage2D(GL1_TEXTURE_2D, 0, GL1_RGBA, GL1_UNSIGNED_BYTE, { pixels: image });

        gl1texParameteri(GL1_TEXTURE_2D, GL1_TEXTURE_MAG_FILTER, this.filter);
        gl1texParameteri(GL1_TEXTURE_2D, GL1_TEXTURE_MIN_FILTER, this.filter);
        gl1texParameteri(GL1_TEXTURE_2D, GL1_TEXTURE_WRAP_S, this.wrap);
        gl1texParameteri(GL1_TEXTURE_2D, GL1_TEXTURE_WRAP_T, this.wrap);
        gl1BindTexture(GL1_TEXTURE_2D, null);
    }

    // Vars
    gl1ID;

    // Methods
    bind(slot) {
        gl1ActiveTexture(slot);
        gl1BindTexture(GL1_TEXTURE_2D, this.gl1ID);
    }

    unbind() { gl1BindTexture(GL1_TEXTURE_2D, null); }
    release() { gl1DeleteTexture(this.gl1ID); }
}

class WebGL1RenderTexture extends RenderTextureInterface {
    constructor(width, height, params = {}) {
        super(width, height, params);
    }

    // Methods
    release() { 
        
    }

    resize(width, height) {

    }
}