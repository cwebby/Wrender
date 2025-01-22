// Wrender/Grahics/Textures.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js"

import * as WebGL1 from "./WebGL1/Textures.js"
import * as WebGL2 from "./WebGL2/Textures.js"

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
                        res(new WebGL1.Texture2D(img, params));
                        break;

                    case "WebGL2":
                        res(new WebGL2.Texture2D(img, params));
                        break;
                }
            };
        });
    }
}