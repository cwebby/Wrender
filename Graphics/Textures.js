// Wrender/Grahics/Textures.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js"
import { WebGL1Texture2D } from "./WebGL1/WebGL1Textures.js"

export { Texture2D };

// Texture2D
class Texture2D {
    // Functions
    static fromURL(url, params = {}) {
        return new Promise((res, rej) => {
            let img = new Image();
            img.src = url;

            img.onerror = rej;
            img.onload = () => {
                switch (WRENDER.GRAPHICS_API)
                {
                    case "WebGL1":
                        res(new WebGL1Texture2D(img, params));
                        break;

                    case "WebGL2":
                        
                        break;

                    case "WebGPU":
                        
                        break;
                }
            };
        });
    }
}