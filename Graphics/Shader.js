// Wrender/Graphics/Shader.js, CWEBBY.

// Imports / Exports
import * as WRENDER from "../API.js";
import { WebGL1Shader } from "./WebGL1/WebGL1Shader.js";
//import { WebGL2Shader } from "./WebGL2/WebGL2Shader.js";
//import { WebGPUShader } from "./WebGPU/WebGPUShader.js";

export { Shader };

let shaders = {};

// Shader
class Shader {
    static async fromURL(url) {

        if (!shaders[url]) {
            switch (WRENDER.GRAPHICS_API) {
                case "WebGL1": shaders[url] = await WebGL1Shader.fromURL(url);
                    break;
                //case "WebGL2": shaders[url] = await WebGL2Shader.fromURL(url);
                    //break;
                //case "WebGPU": shaders[url] = await WebGPUShader.fromURL(url);
                    //break;
            }
        }
        
        return shaders[url];
    }

    static setStaticInt(name, value) { for (let shader in shaders) { shaders[shader].setInt(name, value); } }  
    static setStaticInt2(name, x, y) { for (let shader in shaders) { shaders[shader].setInt2(name, x, y); } }  
    static setStaticInt3(name, x, y, z) { for (let shader in shaders) { shaders[shader].setInt3(name, x, y, z); } }  
    static setStaticInt4(name, x, y, z, w) { for (let shader in shaders) { shaders[shader].setInt4(name, x, y, z, w); } }

    static setStaticFloat(name, value)  { for (let shader in shaders) { shaders[shader].setFloat(name, value); } } 
    static setStaticFloat2(name, x, y)  { for (let shader in shaders) { shaders[shader].setFloat2(name, x, y); } } 
    static setStaticFloat3(name, x, y, z)  { for (let shader in shaders) { shaders[shader].setFloat3(name, x, y, z); } }
    static setStaticFloat4(name, x, y, z, w) { for (let shader in shaders) { shaders[shader].setFloat4(name, x, y, z, w); } }

    static setStaticMatrix2x2(name, value) { for (let shader in shaders) { shaders[shader].setMatrix2x2(name, value); } }
    static setStaticMatrix3x3(name, value)  { for (let shader in shaders) { shaders[shader].setMatrix3x3(name, value); } } 
    static setStaticMatrix4x4(name, value)  { for (let shader in shaders) { shaders[shader].setMatrix4x4(name, value); } }

    static setStaticTexture2D(name, texture2D)  { for (let shader in shaders) { shaders[shader].setTexture2D(name, texture2D); } }
}