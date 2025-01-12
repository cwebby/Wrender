// Wrender/Graphics/WebGL1/WebGL1Shader.js, CWEBBY.

// Imports / Exports
import { ShaderInterface } from "../ShaderInterface.js";

import { 

    // Enums
    GL_ACTIVE_UNIFORMS,
    GL_ACTIVE_ATTRIBS,

    GL_COMPILE_STATUS,
    GL_LINK_STATUS,
 
    // Functions
    glCreateProgram, glCreateShader, 
    glShaderSource, glCompileShader,
    glBindAttribLocation,
    glGetProgramParameter,
    glGetShaderParameter,
    glGetProgramInfoLog,
    glGetShaderInfoLog,

    glDeleteProgram,

    glDeleteShader,
    glAttachShader,
    glLinkProgram,
    glUseProgram,

    glGetActiveAttrib,
    glGetActiveUniform,
    glGetUniformLocation,

    glUniform1i, glUniform2i, glUniform3i, glUniform4i,
    glUniform1f, glUniform2f, glUniform3f, glUniform4f,
    glUniformMatrix2fv, glUniformMatrix3fv, glUniformMatrix4fv

} from "./WebGL1API.js"
    
export { WebGL1Shader };

// Shader
class WebGL1Shader extends ShaderInterface {
    constructor (stages) {
        super();
        
        this.glID = glCreateProgram();

        for (let stage in stages) {
            let shader = glCreateShader(stage);

            glShaderSource(shader, stages[stage]); // come back to 'stage'.
            glCompileShader(shader);

             if (!glGetShaderParameter(shader, GL_COMPILE_STATUS)) {
                console.log(glGetShaderInfoLog(shader));
                glDeleteShader(shader);
                return;
            }

            glAttachShader(this.glID, shader);
        }

        glLinkProgram(this.glID);

        if (!glGetProgramParameter(this.glID, GL_LINK_STATUS)) {
            console.log(glGetProgramInfoLog(this.glID));
            glDeleteProgram(this.glID);
            return;
        }
        
        this.bind();
            // Intentionally leave bound for any initial uniform setting right after.

        let activeAttributes = glGetProgramParameter(this.glID, GL_ACTIVE_ATTRIBS);
        for (let i = 0; i < activeAttributes; i++) {
            let activeAttrib = glGetActiveAttrib(this.glID, i);
            glBindAttribLocation(this.glID, i, activeAttrib.name);
        }

        let samplerCount = 0;
        let activeUniforms = glGetProgramParameter(this.glID, GL_ACTIVE_UNIFORMS);
        for (let i = 0; i < activeUniforms; i++) {
            let activeUniform = glGetActiveUniform(this.glID, i);

            if (activeUniform.type == "SAMPLER2D") {
                this.samplerBindings[activeUniform.name] = samplerCount;
                samplerCount = samplerCount + 1;
            }

            this.uniformBindings[activeUniform.name] = 
                glGetUniformLocation(this.glID, activeUniform.name);
        }
        this.unbind();
    }

    // Members
    glID;

    samplerBindings = {};
    uniformBindings = {};

    // Methods
    unbind() { glUseProgram(null); }
    bind() { glUseProgram(this.glID); }

    setInt(name, x)             { this.bind(); glUniform1i(this.uniformBindings[name], x); this.unbind(); }
    setFloat(name, x)           { this.bind(); glUniform1f(this.uniformBindings[name], x); this.unbind(); }
    setInt2(name, x, y)         { this.bind(); glUniform2i(this.uniformBindings[name], x, y); this.unbind(); }
    setFloat2(name, x, y)       { this.bind(); glUniform2f(this.uniformBindings[name], x, y); this.unbind(); }
    setInt3(name, x, y, z)      { this.bind(); glUniform3i(this.uniformBindings[name], x, y, z); this.unbind(); }
    setFloat3(name, x, y, z)    { this.bind(); glUniform3f(this.uniformBindings[name], x, y, z); this.unbind(); }
    setInt4(name, x, y, z, w)   { this.bind(); glUniform4i(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setFloat4(name, x, y, z, w) { this.bind(); glUniform4f(this.uniformBindings[name], x, y, z, w); this.unbind(); }
    setMatrix2x2(name, matrix)  { this.bind(); glUniformMatrix2fv(this.uniformB[name], false, matrix); this.unbind(); }
    setMatrix3x3(name, matrix)  { this.bind(); glUniformMatrix3fv(this.uniformBindings[name], false, matrix); this.unbind(); }
    setMatrix4x4(name, matrix)  { this.bind(); glUniformMatrix4fv(this.uniformBindings[name], false, matrix); this.unbind(); }

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