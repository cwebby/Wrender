// Wrender/Graphics/VertexArray.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js";

import * as WebGL1 from "./WebGL1/VertexArray.js";
import * as WebGL2 from "./WebGL2/VertexArray.js";

export { VertexArray };

// VertexArray
class VertexArray {
    static Create(layout, data) {
        switch (WRENDER.GRAPHICS_API) {
            case "WebGL1": return new WebGL1.VertexArray(layout, data);
            case "WebGL2": return new WebGL2.VertexArray(layout, data);
            default: return null;
        }
    }
}