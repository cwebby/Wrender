// Wrender/Graphics/WebGL1/WebGL1API.js, CWEBBY.

// =====================================================Shader
const GL_LINK_STATUS = "LINK_STATUS";
const GL_COMPILE_STATUS = "COMPILE_STATUS";

const GL_VERTEX_SHADER = "VERTEX_SHADER";
const GL_FRAGMENT_SHADER = "FRAGMENT_SHADER";

function glCreateProgram() {
    return gl.createProgram();
}

function glCreateShader(type) {
    return gl.createShader(gl[type]);
}

function glShaderSource(shader, source) {
    return gl.shaderSource(shader, source);
}

function glCompileShader(shader) {
    return gl.compileShader(shader);
}

function glGetShaderParameter(shader, name) {
    return gl.getShaderParameter(shader, gl[name]);
}

function glGetShaderInfoLog(shader) {
    return gl.getShaderInfoLog(shader);
}

function glDeleteShader(shader) {
    return gl.deleteShader(shader);
}

function glAttachShader(program, shader) {
    return gl.attachShader(program, shader);
}

function glUseProgram(program) {
    return gl.useProgram(program);
}

function glLinkProgram(program) {
    return gl.linkProgram(program);
}

function glDeleteProgram(program) {
    return gl.deleteProgram(program);
}
    
function glGetProgramParameter(program, parameter) {
    return gl.getProgramParameter(program, gl[parameter]);
}

function glGetProgramInfoLog(program) {
    return gl.getProgramInfoLog(program);
}

export { // Shader
    // Enums
    GL_LINK_STATUS,
    GL_COMPILE_STATUS,
    GL_VERTEX_SHADER,
    GL_FRAGMENT_SHADER,
    
    // Functions
    glCreateProgram, glCreateShader, 
    glShaderSource, glCompileShader,

    glGetProgramParameter,
    glGetShaderParameter,
    glGetProgramInfoLog,
    glGetShaderInfoLog,

    glDeleteShader,
    glAttachShader,
    glLinkProgram,
    glUseProgram,
    glDeleteProgram,
}
// =====================================================Shader
// =====================================================Uniform
const GL_ACTIVE_UNIFORMS = "ACTIVE_UNIFORMS";

function glGetActiveUniform(program, index) {
    let uniform = gl.getActiveUniform(program, index);

    switch (uniform.type) {
        case gl["INT"]: return { name: uniform.name, type: "INT" };  
        case gl["BOOL"]: return { name: uniform.name, type: "BOOL" };  
        case gl["FLOAT"]: return { name: uniform.name, type: "FLOAT" };  
        case gl["INT_VEC2"]: return { name: uniform.name, type: "INT2" };  
        case gl["INT_VEC3"]: return { name: uniform.name, type: "INT3" };  
        case gl["INT_VEC4"]: return { name: uniform.name, type: "INT4" }; 
        case gl["BOOL_VEC2"]: return { name: uniform.name, type: "BOOL2" };  
        case gl["BOOL_VEC3"]: return { name: uniform.name, type: "BOOL3" };  
        case gl["BOOL_VEC4"]: return { name: uniform.name, type: "BOOL4" }; 
        case gl["FLOAT_VEC2"]: return { name: uniform.name, type: "FLOAT2" };  
        case gl["FLOAT_VEC3"]: return { name: uniform.name, type: "FLOAT3" };  
        case gl["FLOAT_VEC4"]: return { name: uniform.name, type: "FLOAT4" }; 
        case gl["SAMPLER_2D"]: return { name: uniform.name, type: "SAMPLER2D" };  
        case gl["SAMPLER_CUBE"]: return { name: uniform.name, type: "SAMPLERCUBE" };  
    }
}

function glGetUniformLocation(program, name) {
    return gl.getUniformLocation(program, name);
}

function glUniform1i(location, value) {
    return gl.uniform1i(location, value);
}

function glUniform2i(location, x, y) {
    return gl.uniform2i(location, x, y);
}

function glUniform3i(location, x, y, z) {
    return gl.uniform3i(location, x, y, z);
}

function glUniform4i(location, x, y, z, w) {
    return gl.uniform4i(location, x, y, z, w);
}

function glUniform1f(location, value) {
    return gl.uniform1f(location, value);
}

function glUniform2f(location, x, y) {
    return gl.uniform2f(location, x, y);
}

function glUniform3f(location, x, y, z) {
    return gl.uniform3f(location, x, y, z);
}

function glUniform4f(location, x, y, z, w) {
    return gl.uniform4f(location, x, y, z, w);
}

function glUniformMatrix2fv(location, transpose, values) {
    return gl.uniformMatrix2fv(location, transpose, values);
}

function glUniformMatrix3fv(location, transpose, values) {
    return gl.uniformMatrix3fv(location, transpose, values);
}

function glUniformMatrix4fv(location, transpose, values) {
    return gl.uniformMatrix4fv(location, transpose, values);
}

export { 
    GL_ACTIVE_UNIFORMS,

    glGetActiveUniform,
    glGetUniformLocation,

    glUniform1i, glUniform2i, glUniform3i, glUniform4i,
    glUniform1f, glUniform2f, glUniform3f, glUniform4f,
    glUniformMatrix2fv, glUniformMatrix3fv, glUniformMatrix4fv
};
// =====================================================Uniform
// =====================================================Attributes
const GL_ACTIVE_ATTRIBS = "ACTIVE_ATTRIBUTES";

function glGetActiveAttrib(program, ptr) {
    return gl.getActiveAttrib(program, ptr);
}

function glBindAttribLocation(program, ptr, name) {
    return gl.bindAttribLocation(program, ptr, name);
}

function glEnableVertexAttribArray(ptr) {
    return gl.enableVertexAttribArray(ptr);
}

function glVertexAttribPointer(ptr, components, type, isNormalised, stride, offset) {
    return gl.vertexAttribPointer(ptr, components, gl[type], isNormalised, stride, offset);
}

function glGetAttribLocation(program, name) {
    return gl.getAttribLocation(program, name);
}

export {
    GL_ACTIVE_ATTRIBS,

    glGetActiveAttrib,
    glBindAttribLocation,
    glEnableVertexAttribArray,
    glVertexAttribPointer,
    glGetAttribLocation
}
// =====================================================Attributes
// =====================================================Buffers
const GL_STATIC_DRAW = "STATIC_DRAW";
const GL_DYNAMIC_DRAW = "DYNAMIC_DRAW";

const GL_ARRAY_BUFFER = "ARRAY_BUFFER";
const GL_ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER";

function glCreateBuffer() {
    return gl.createBuffer();
}

function glBindBuffer(type, buffer) {
    return gl.bindBuffer(gl[type], buffer);
}

function glBufferData(type, data, usage) {
    return gl.bufferData(gl[type], data, gl[usage]);
}

function glDeleteBuffer(buffer) {
    return gl.deleteBuffer(buffer);
}

export {
    GL_STATIC_DRAW,
    GL_DYNAMIC_DRAW,
    GL_ARRAY_BUFFER,
    GL_ELEMENT_ARRAY_BUFFER,

    glCreateBuffer,
    glBindBuffer,
    glBufferData,
    glDeleteBuffer
}
// =====================================================Buffers
// =====================================================Texutres
const GL_RGB = "RGB"
const GL_RGBA = "RGBA";
const GL_ALPHA = "ALPHA";
const GL_LUMINANCE = "LUMINANCE";
const GL_LUMINANCE_ALPHA = "LUMINANCE_ALPHA";

const GL_UNSIGNED_BYTE = "UNSIGNED_BYTE";
const GL_UNSIGNED_SHORT_5_6_5 = "UNSIGNED_SHORT_5_6_5"
const GL_UNSIGNED_SHORT_4_4_4_4 = "UNSIGNED_SHORT_4_4_4_4"
const GL_UNSIGNED_SHORT_5_5_5_1 = "UNSIGNED_SHORT_5_5_5_1"

const GL_TEXTURE_WRAP_S = "TEXTURE_WRAP_S";
const GL_TEXTURE_WRAP_T = "TEXTURE_WRAP_T";
const GL_TEXTURE_MIN_FILTER = "TEXTURE_MIN_FILTER";
const GL_TEXTURE_MAG_FILTER = "TEXTURE_MAG_FILTER";

const GL_TEXTURE_2D = "TEXTURE_2D";
const GL_TEXTURE_CUBE_MAP_POSITIVE_X = "TEXTURE_CUBE_MAP_POSITIVE_X";
const GL_TEXTURE_CUBE_MAP_NEGATIVE_X = "TEXTURE_CUBE_MAP_NEGATIVE_X";
const GL_TEXTURE_CUBE_MAP_POSITIVE_Y = "TEXTURE_CUBE_MAP_POSITIVE_Y";
const GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
const GL_TEXTURE_CUBE_MAP_POSITIVE_Z = "TEXTURE_CUBE_MAP_POSITIVE_Z";
const GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = "TEXTURE_CUBE_MAP_NEGATIVE_Z";

function glCreateTexture() {
    return gl.createTexture();
}

function glDeleteTexture(texture) {
    return gl.deleteTexture(texture);
}

function glBindTexture(target, texture) {
    return gl.bindTexture(gl[target], texture);
}

function glTexImage2D(target, level, format, type, image) {
    if (image["pixels"]) // Sooooooooo bad...
        return gl.texImage2D(gl[target], level, gl[format], gl[format], gl[type], image.pixels);
    return gl.texImage2D(gl[target], level, gl[format], image.width || 0, image.height || 0, border || 0, gl[format], gl[type], null);
}

function gltexParameteri(target, name, value) {
    return gl.texParameteri(gl[target], gl[name], gl[value]);
}

function glActiveTexture(slot) {
    return gl.activeTexture(gl["TEXTURE" + slot]);
}

export {
    GL_TEXTURE_2D,
    GL_TEXTURE_CUBE_MAP_POSITIVE_X, GL_TEXTURE_CUBE_MAP_NEGATIVE_X,
    GL_TEXTURE_CUBE_MAP_POSITIVE_Y, GL_TEXTURE_CUBE_MAP_NEGATIVE_Y,
    GL_TEXTURE_CUBE_MAP_POSITIVE_Z, GL_TEXTURE_CUBE_MAP_NEGATIVE_Z,

    GL_RGB, GL_RGBA, GL_ALPHA, GL_LUMINANCE, GL_LUMINANCE_ALPHA,

    GL_TEXTURE_WRAP_S, GL_TEXTURE_WRAP_T,
    GL_TEXTURE_MIN_FILTER, GL_TEXTURE_MAG_FILTER,

    GL_UNSIGNED_BYTE,
    GL_UNSIGNED_SHORT_5_6_5, 
    GL_UNSIGNED_SHORT_4_4_4_4, 
    GL_UNSIGNED_SHORT_5_5_5_1,

    glCreateTexture,
    glDeleteTexture,
    gltexParameteri,
    glActiveTexture,
    glBindTexture,
    glTexImage2D,
}
// =====================================================Textures
// =====================================================Capabilities
const GL_BLEND = "BLEND";
const GL_DEPTH_TEST = "DEPTH_TEST";
function glEnable(param) {
    return gl.enable(gl[param]);
}

const GL_SRC_ALPHA = "SRC_ALPHA";
const GL_ONE_MINUS_SRC_ALPHA = "ONE_MINUS_SRC_ALPHA";
function glBlendFunc(source, destination) {
    return gl.blendFunc(gl[source], gl[destination]);
}

const GL_SCISSOR_TEST = "SCISSOR_TEST";
function glScissor(x, y, width, height) { 
    gl.scissor(x, y, width, height); 
}

const GL_LESS = "LESS";
function glDepthFunc(func) {
    return gl.depthFunc(gl[func]);
}

export {
    GL_BLEND, 
    GL_DEPTH_TEST,
    glEnable,

    GL_SRC_ALPHA,
    GL_ONE_MINUS_SRC_ALPHA,
    glBlendFunc,

    GL_SCISSOR_TEST,
    glScissor,

    GL_LESS,
    glDepthFunc
}
// =====================================================Capabilities
let gl = null;

const GL_COLOR_BUFFER = "COLOR_BUFFER_BIT";
const GL_DEPTH_BUFFER = "DEPTH_BUFFER_BIT"; 

// Functions
function glInit(canvas) {
    if (!(gl = canvas.getContext('webgl'))) {  
        console.error("Wrender [WebGL1] is not supported!");
        return false;
    }

    return true;
}

function glViewport(x, y, width, height) { return gl.viewport(x, y, width, height); }

function glClear(r = 0, g = 0, b = 0, a = 0, bufferMasks) {
    gl.clearColor(r, g, b, a);
    for (let mask in bufferMasks) { gl.clear(gl[mask]); }
}

function glDrawArrays(count) {
    gl.drawArrays(gl.TRIANGLES, 0, count);
}

export {
    
    GL_COLOR_BUFFER,
    GL_DEPTH_BUFFER,

    glInit,
    glViewport,
    glClear,
    glDrawArrays,
}
