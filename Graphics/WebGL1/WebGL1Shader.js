// Wrender/Graphics/WebGL1/WebGL1Shader.js, CWEBBY.

// Imports / Exports
import { ShaderInterface } from "../ShaderInterface.js";

import { 

    // Enums
    GL1_COMPILE_STATUS,
    
    // Functions
    gl1CreateProgram, gl1CreateShader, 
    gl1ShaderSource, gl1CompileShader,
    gl1GetShaderParameter,
    gl1GetShaderInfoLog,
    gl1DeleteShader,
    gl1AttachShader,
    gl1UseProgram

} from "./WebGL1API.js"
    
export { WebGL1Shader };

// Shader
class WebGL1Shader extends ShaderInterface {
    constructor (stages) {
        super();
        
        this.glID = gl1CreateProgram();

        for (let stage in stages) {
            let shader = gl1CreateShader(stage);

            gl1ShaderSource(shader, stages[stage]); // come back to 'stage'.
            gl1CompileShader(shader);

             if (!gl1GetShaderParameter(shader, GL_COMPILE_STATUS)) {
                console.error(gl1GetShaderInfoLog(shader));
                gl1DeleteShader(shader);
                return;
            }

            // let lines = stages[stage]
            //     .replace(/\r?\n/, "\n")
            //     .split(/[{;}]/);

            // let attribPtr = 0;
            // for (let line in lines) {
            //     if (lines[line].startsWith("attribute ")) {
            //         gl.bindAttribLocation(this.id, attribPtr, lines[line].split(" ").slice(-1));
            //         attribPtr++;
            //     }
            // }
                
            gl1AttachShader(this.glID, shader);
        }
    }

    // Members
    glID;

    // Methods
    unbind() { gl1UseProgram(null); }
    bind() { gl1UseProgram(this.glID); }

    setInt(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setInt2(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setInt3(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setInt4(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setBool(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setFloat(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setFloat2(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setFloat3(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setFloat4(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setMatrix2x2(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setMatrix3x3(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setMatrix4x4(name, value) { this.bind(); /* do thing */ this.unbind(); }
    setTexture2D(name, texture2D) { this.bind(); /* do thing */ this.unbind(); }

    static async fromURL(url) {
        const INCLUDE_TOKEN = "#include ";
        const SHADER_TOKEN = "#shader ";

        let stages = {};
        let fileSource = await fetch(url);
        fileSource = await fileSource.text();
        fileSource = fileSource.split(/\r?\n/);

        let stage = undefined;
        for (let line of fileSource) {
            
            if (line.startsWith(SHADER_TOKEN)) {
                stage = line.slice(SHADER_TOKEN.length).trim();
                stages[stage] = stages[stage] || "";
                continue;
            }

            if (line.startsWith(INCLUDE_TOKEN)) {
                line = line.slice(INCLUDE_TOKEN.length).trim()
                line = await this.includeFromURL(line);
            }

            stages[stage] += `${line}\n`;
        }

        return new WebGL1Shader(stages)
    }
}