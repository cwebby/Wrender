// Wrender/Graphics/WebGL1/WebGL1Shader.js, CWEBBY.

// Imports / Exports
import { ShaderInterface } from "../ShaderInterface.js";

import { 

    // Enums
    GL1_ACTIVE_UNIFORMS,
    GL1_ACTIVE_ATTRIBS,

    GL1_COMPILE_STATUS,
    GL1_LINK_STATUS,
 
    // Functions
    gl1CreateProgram, gl1CreateShader, 
    gl1ShaderSource, gl1CompileShader,
    gl1BindAttribLocation,
    gl1GetProgramParameter,
    gl1GetShaderParameter,
    gl1GetProgramInfoLog,
    gl1GetShaderInfoLog,

    gl1DeleteProgram,

    gl1DeleteShader,
    gl1AttachShader,
    gl1LinkProgram,
    gl1UseProgram,

    gl1GetActiveAttrib,
    gl1GetActiveUniform,
    gl1GetUniformLocation,

    gl1Uniform1i, gl1Uniform2i, gl1Uniform3i, gl1Uniform4i,
    gl1Uniform1f, gl1Uniform2f, gl1Uniform3f, gl1Uniform4f,
    gl1UniformMatrix2fv, gl1UniformMatrix3fv, gl1UniformMatrix4fv

} from "./WebGL1API.js"
    
export { WebGL1Shader };

// Shader
class WebGL1Shader extends ShaderInterface {
    constructor (stages) {
        super();
        
        this.gl1ID = gl1CreateProgram();

        for (let stage in stages) {
            let shader = gl1CreateShader(stage);

            gl1ShaderSource(shader, stages[stage]); // come back to 'stage'.
            gl1CompileShader(shader);

             if (!gl1GetShaderParameter(shader, GL1_COMPILE_STATUS)) {
                console.log(gl1GetShaderInfoLog(shader));
                gl1DeleteShader(shader);
                return;
            }

            gl1AttachShader(this.gl1ID, shader);
        }

        gl1LinkProgram(this.gl1ID);

        if (!gl1GetProgramParameter(this.gl1ID, GL1_LINK_STATUS)) {
            console.log(gl1GetProgramInfoLog(this.gl1ID));
            gl1DeleteProgram(this.gl1ID);
            return;
        }
        
        this.bind();
            // Intentionally leave bound for any initial uniform setting right after.

        let activeAttributes = gl1GetProgramParameter(this.gl1ID, GL1_ACTIVE_ATTRIBS);
        for (let i = 0; i < activeAttributes; i++) {
            let activeAttrib = gl1GetActiveAttrib(this.gl1ID, i);
            gl1BindAttribLocation(this.gl1ID, i, activeAttrib.name);
        }

        let samplerCount = 0;
        let activeUniforms = gl1GetProgramParameter(this.gl1ID, GL1_ACTIVE_UNIFORMS);
        for (let i = 0; i < activeUniforms; i++) {
            let activeUniform = gl1GetActiveUniform(this.gl1ID, i);

            if (activeUniform.type == "SAMPLER2D") {
                this.samplerBindings[activeUniform.name] = samplerCount;
                samplerCount = samplerCount + 1;
            }

            this.uniformBindings[activeUniform.name] = 
                gl1GetUniformLocation(this.gl1ID, activeUniform.name);
        }
        this.unbind();
    }

    // Members
    gl1ID;

    samplerBindings = {};
    uniformBindings = {};

    // Methods
    unbind() { gl1UseProgram(null); }
    bind() { gl1UseProgram(this.gl1ID); }

    setInt(name, x)             { this.bind(); gl1Uniform1i(this.uniformBindings[name], x); this.unbind(); }
    setFloat(name, x)           { this.bind(); gl1Uniform1f(this.uniformBindings[name], x); this.unbind(); }
    setInt2(name, x, y)         { this.bind(); gl1Uniform2i(this.uniformBindings[name], x, y); this.unbind(); }
    setFloat2(name, x, y)       { this.bind(); gl1Uniform2f(this.uniformBindings[name], x, y); this.unbind(); }
    setInt3(name, x, y, z)      { this.bind(); gl1Uniform3i(this.uniformBindings[name], x, y, z); this.unbind(); }
    setFloat3(name, x, y, z)    { this.bind(); gl1Uniform3f(this.uniformBindings[name], x, y, z); this.unbind(); }
    setInt4(name, x, y, z, w)   { this.bind(); gl1Uniform4i(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setFloat4(name, x, y, z, w) { this.bind(); gl1Uniform4f(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setMatrix2x2(name, matrix)  { this.bind(); gl1UniformMatrix2fv(this.uniformB[name], false, matrix); this.unbind(); }
    setMatrix3x3(name, matrix)  { this.bind(); gl1UniformMatrix3fv(this.uniformBindings[name], false, matrix); this.unbind(); }
    setMatrix4x4(name, matrix)  { this.bind(); gl1UniformMatrix4fv(this.uniformBindings[name], false, matrix); this.unbind(); }

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

        return new WebGL1Shader(stages)
    }
}