// Wrender/Graphics/WebGL1/Shader.js, CWEBBY.

// Imports / Exports
import { ShaderInterface } from "../ShaderInterface.js";

import { 

    // Enums
    ACTIVE_UNIFORMS,
    ACTIVE_ATTRIBS,

    COMPILE_STATUS,
    LINK_STATUS,
 
    // Functions
    CreateProgram, CreateShader, 
    ShaderSource, CompileShader,
    BindAttribLocation,
    GetProgramParameter,
    GetShaderParameter,
    GetProgramInfoLog,
    GetShaderInfoLog,

    DeleteProgram,

    DeleteShader,
    AttachShader,
    LinkProgram,
    UseProgram,

    GetActiveAttrib,
    GetActiveUniform,
    GetUniformLocation,

    Uniform1i, Uniform2i, Uniform3i, Uniform4i,
    Uniform1f, Uniform2f, Uniform3f, Uniform4f,
    UniformMatrix2fv, UniformMatrix3fv, UniformMatrix4fv

} from "./API.js"
    
export { Shader };

// Shader
class Shader extends ShaderInterface {
    constructor (stages) {
        super();
        
        this.glID = CreateProgram();

        for (let stage in stages) {
            let shader = CreateShader(stage);

            ShaderSource(shader, stages[stage]); // come back to 'stage'.
            CompileShader(shader);

             if (!GetShaderParameter(shader, COMPILE_STATUS)) {
                console.log(GetShaderInfoLog(shader));
                DeleteShader(shader);
                return;
            }

            AttachShader(this.glID, shader);
        }

        LinkProgram(this.glID);

        if (!GetProgramParameter(this.glID, LINK_STATUS)) {
            console.log(GetProgramInfoLog(this.glID));
            DeleteProgram(this.glID);
            return;
        }
        
        this.bind();
            // Intentionally leave bound for any initial uniform setting right after.

        let activeAttributes = GetProgramParameter(this.glID, ACTIVE_ATTRIBS);
        for (let i = 0; i < activeAttributes; i++) {
            let activeAttrib = GetActiveAttrib(this.glID, i);
            BindAttribLocation(this.glID, i, activeAttrib.name);
        }

        let samplerCount = 0;
        let activeUniforms = GetProgramParameter(this.glID, ACTIVE_UNIFORMS);
        for (let i = 0; i < activeUniforms; i++) {
            let activeUniform = GetActiveUniform(this.glID, i);

            if (activeUniform.type == "SAMPLER2D") {
                this.samplerBindings[activeUniform.name] = samplerCount;
                samplerCount = samplerCount + 1;
            }

            this.uniformBindings[activeUniform.name] = 
                GetUniformLocation(this.glID, activeUniform.name);
        }
        this.unbind();
    }

    // Members
    glID;

    samplerBindings = {};
    uniformBindings = {};

    // Methods
    unbind() { UseProgram(null); }
    bind() { UseProgram(this.glID); }

    setInt(name, x)             { this.bind(); Uniform1i(this.uniformBindings[name], x); this.unbind(); }
    setFloat(name, x)           { this.bind(); Uniform1f(this.uniformBindings[name], x); this.unbind(); }
    setInt2(name, x, y)         { this.bind(); Uniform2i(this.uniformBindings[name], x, y); this.unbind(); }
    setFloat2(name, x, y)       { this.bind(); Uniform2f(this.uniformBindings[name], x, y); this.unbind(); }
    setInt3(name, x, y, z)      { this.bind(); Uniform3i(this.uniformBindings[name], x, y, z); this.unbind(); }
    setFloat3(name, x, y, z)    { this.bind(); Uniform3f(this.uniformBindings[name], x, y, z); this.unbind(); }
    setInt4(name, x, y, z, w)   { this.bind(); Uniform4i(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setFloat4(name, x, y, z, w) { this.bind(); Uniform4f(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setMatrix2x2(name, matrix)  { this.bind(); UniformMatrix2fv(this.uniformB[name], false, matrix); this.unbind(); }
    setMatrix3x3(name, matrix)  { this.bind(); UniformMatrix3fv(this.uniformBindings[name], false, matrix); this.unbind(); }
    setMatrix4x4(name, matrix)  { this.bind(); UniformMatrix4fv(this.uniformBindings[name], false, matrix); this.unbind(); }

    setTexture2D(name, texture2D) { 
        this.bind();
        this.setInt(name, this.samplerBindings[name]);
        texture2D.bind(this.samplerBindings[name]);
        this.unbind();
    }

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

        return new Shader(stages)
    }
}