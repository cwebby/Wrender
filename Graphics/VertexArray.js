// Wrender/Graphics/VertexArray.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js";
import { WebGL1VertexArray } from "./WebGL1/WebGL1VertexArray.js";
//import { WebGL2VertexArray } from "./WebGL1/WebGL2VertexArray.js";
//import { WebGPUVertexArray } from "./WebGL1/WebGPUVertexArray.js";

export { VertexArray };

// VertexArray
class VertexArray {
    static Create(layout, data, indicies = null) {
        switch (WRENDER.GRAPHICS_API) {
            case "WebGL1": return new WebGL1VertexArray(layout, data, indicies);
            case "WebGL2": return new WebGL2VertexArray(layout, data, indicies);
            //case "WebGPU": return new WebGPUVertexArray(layout, data, indicies);
            default: return null;
        }
    }
}