// Wrender/Graphics/WebGL1/WebGL1Textures.js, CWEBBY.

// Import/Export
import {
    GL_RGBA,
    GL_TEXTURE_2D,
    GL_UNSIGNED_BYTE,

    GL_TEXTURE_WRAP_S,
    GL_TEXTURE_WRAP_T,
    GL_TEXTURE_MIN_FILTER,
    GL_TEXTURE_MAG_FILTER,

    glCreateTexture,
    glDeleteTexture,
    gltexParameteri,
    glActiveTexture,
    glBindTexture,
    glTexImage2D
} from "./WebGL1API.js"

import { Texture2DInterface, 
    RenderTextureInterface } from "../TexturesInterface.js"
export { WebGL1Texture2D, WebGL1RenderTexture }

// WebGL1Texture2D
class WebGL1Texture2D extends Texture2DInterface {
    constructor(image, params = {}) {
        super(image, params); 
        this.glID = glCreateTexture();

        glBindTexture(GL_TEXTURE_2D, this.glID);
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_UNSIGNED_BYTE, { pixels: image });

        gltexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, this.filter);
        gltexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, this.filter);
        gltexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, this.wrap);
        gltexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, this.wrap);
        glBindTexture(GL_TEXTURE_2D, null);
    }

    // Vars
    glID;

    // Methods
    bind(slot) {
        glActiveTexture(slot);
        glBindTexture(GL_TEXTURE_2D, this.glID);
    }

    unbind() { glBindTexture(GL_TEXTURE_2D, null); }
    release() { glDeleteTexture(this.glID); }
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