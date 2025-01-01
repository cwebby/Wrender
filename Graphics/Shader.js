// Wrender/Graphics/Shader.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js";
import { WebGL1Shader } from "./WebGL1/WebGL1Shader.js";
//import { WebGPUShader } from "./WebGPU/WebGPUShader.js";

export { Shader };

// Vars
let allShaders = {};

// Shader
class Shader {
    static async fromURL(url) {
        switch (WRENDER.GRAPHICS_API) {
            case "WebGL1": return await WebGL1Shader.fromURL(url);
            //case "WebGPU": return await WebGPUShader.fromURL(url);
            default: console.error("Graphics API not implemented!");
                break;
        }
    }

    // static stuff goes here...
}