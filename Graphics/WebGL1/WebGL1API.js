// Wrender/Graphics/WebGL1/WebGL1API.js, CWEBBY.

// =====================================================Shader
const GL1_LINK_STATUS = "LINK_STATUS";
const GL1_COMPILE_STATUS = "COMPILE_STATUS";

const GL1_VERTEX_SHADER = "VERTEX_SHADER";
const GL1_FRAGMENT_SHADER = "FRAGMENT_SHADER";

function gl1CreateProgram() {
    return gl1.createProgram();
}

function gl1CreateShader(type) {
    return gl1.createShader(gl1[type]);
}

function gl1ShaderSource(shader, source) {
    return gl1.shaderSource(shader, source);
}

function gl1CompileShader(shader) {
    return gl1.compileShader(shader);
}

function gl1GetShaderParameter(shader, name) {
    return gl1.getShaderParameter(shader, gl1[name]);
}

function gl1GetShaderInfoLog(shader) {
    return gl1.getShaderInfoLog(shader);
}

function gl1DeleteShader(shader) {
    return gl1.deleteShader(shader);
}

function gl1AttachShader(program, shader) {
    return gl1.attachShader(program, shader);
}

function gl1UseProgram(program) {
    return gl1.useProgram(program);
}

function gl1LinkProgram(program) {
    return gl1.linkProgram(program);
}

function gl1DeleteProgram(program) {
    return gl1.deleteProgram(program);
}
    
function gl1GetProgramParameter(program, parameter) {
    return gl1.getProgramParameter(program, gl1[parameter]);
}

function gl1GetProgramInfoLog(program) {
    return gl1.getProgramInfoLog(program);
}

export { // Shader
    // Enums
    GL1_LINK_STATUS,
    GL1_COMPILE_STATUS,
    GL1_VERTEX_SHADER,
    GL1_FRAGMENT_SHADER,
    
    // Functions
    gl1CreateProgram, gl1CreateShader, 
    gl1ShaderSource, gl1CompileShader,

    gl1GetProgramParameter,
    gl1GetShaderParameter,
    gl1GetProgramInfoLog,
    gl1GetShaderInfoLog,

    gl1DeleteShader,
    gl1AttachShader,
    gl1LinkProgram,
    gl1UseProgram,
    gl1DeleteProgram,
}
// =====================================================Shader
// =====================================================Uniform
const GL1_ACTIVE_UNIFORMS = "ACTIVE_UNIFORMS";

function gl1GetActiveUniform(program, index) {
    let uniform = gl1.getActiveUniform(program, index);

    switch (uniform.type) {
        case gl1["INT"]: return { name: uniform.name, type: "INT" };  
        case gl1["BOOL"]: return { name: uniform.name, type: "BOOL" };  
        case gl1["FLOAT"]: return { name: uniform.name, type: "FLOAT" };  
        case gl1["INT_VEC2"]: return { name: uniform.name, type: "INT2" };  
        case gl1["INT_VEC3"]: return { name: uniform.name, type: "INT3" };  
        case gl1["INT_VEC4"]: return { name: uniform.name, type: "INT4" }; 
        case gl1["BOOL_VEC2"]: return { name: uniform.name, type: "BOOL2" };  
        case gl1["BOOL_VEC3"]: return { name: uniform.name, type: "BOOL3" };  
        case gl1["BOOL_VEC4"]: return { name: uniform.name, type: "BOOL4" }; 
        case gl1["FLOAT_VEC2"]: return { name: uniform.name, type: "FLOAT2" };  
        case gl1["FLOAT_VEC3"]: return { name: uniform.name, type: "FLOAT3" };  
        case gl1["FLOAT_VEC4"]: return { name: uniform.name, type: "FLOAT4" }; 
        case gl1["SAMPLER_2D"]: return { name: uniform.name, type: "SAMPLER2D" };  
        case gl1["SAMPLER_CUBE"]: return { name: uniform.name, type: "SAMPLERCUBE" };  
    }
}

function gl1GetUniformLocation(program, name) {
    return gl1.getUniformLocation(program, name);
}

function gl1Uniform1i(location, value) {
    return gl1.uniform1i(location, value);
}

function gl1Uniform2i(location, x, y) {
    return gl1.uniform2i(location, x, y);
}

function gl1Uniform3i(location, x, y, z) {
    return gl1.uniform3i(location, x, y, z);
}

function gl1Uniform4i(location, x, y, z, w) {
    return gl1.uniform4i(location, x, y, z, w);
}

function gl1Uniform1f(location, value) {
    return gl1.uniform1f(location, value);
}

function gl1Uniform2f(location, x, y) {
    return gl1.uniform2f(location, x, y);
}

function gl1Uniform3f(location, x, y, z) {
    return gl1.uniform3f(location, x, y, z);
}

function gl1Uniform4f(location, x, y, z, w) {
    return gl1.uniform4f(location, x, y, z, w);
}

function gl1UniformMatrix2fv(location, transpose, values) {
    return gl1.uniformMatrix2fv(location, transpose, values);
}

function gl1UniformMatrix3fv(location, transpose, values) {
    return gl1.uniformMatrix3fv(location, transpose, values);
}

function gl1UniformMatrix4fv(location, transpose, values) {
    return gl1.uniformMatrix4fv(location, transpose, values);
}

export { 
    GL1_ACTIVE_UNIFORMS,

    gl1GetActiveUniform,
    gl1GetUniformLocation,

    gl1Uniform1i, gl1Uniform2i, gl1Uniform3i, gl1Uniform4i,
    gl1Uniform1f, gl1Uniform2f, gl1Uniform3f, gl1Uniform4f,
    gl1UniformMatrix2fv, gl1UniformMatrix3fv, gl1UniformMatrix4fv
};
// =====================================================Uniform
// =====================================================Attributes
const GL1_ACTIVE_ATTRIBS = "ACTIVE_ATTRIBUTES";

function gl1GetActiveAttrib(program, ptr) {
    return gl1.getActiveAttrib(program, ptr);
}

function gl1BindAttribLocation(program, ptr, name) {
    return gl1.bindAttribLocation(program, ptr, name);
}

function gl1EnableVertexAttribArray(ptr) {
    return gl1.enableVertexAttribArray(ptr);
}

function gl1VertexAttribPointer(ptr, components, type, isNormalised, stride, offset) {
    return gl1.vertexAttribPointer(ptr, components, gl1[type], isNormalised, stride, offset);
}

function gl1GetAttribLocation(program, name) {
    return gl1.getAttribLocation(program, name);
}

export {
    GL1_ACTIVE_ATTRIBS,

    gl1GetActiveAttrib,
    gl1BindAttribLocation,
    gl1EnableVertexAttribArray,
    gl1VertexAttribPointer,
    gl1GetAttribLocation
}
// =====================================================Attributes
// =====================================================Buffers
const GL1_STATIC_DRAW = "STATIC_DRAW";
const GL1_DYNAMIC_DRAW = "DYNAMIC_DRAW";

const GL1_ARRAY_BUFFER = "ARRAY_BUFFER";
const GL1_ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER";

function gl1CreateBuffer() {
    return gl1.createBuffer();
}

function gl1BindBuffer(type, buffer) {
    return gl1.bindBuffer(gl1[type], buffer);
}

function gl1BufferData(type, data, usage) {
    return gl1.bufferData(gl1[type], data, gl1[usage]);
}

function gl1DeleteBuffer(buffer) {
    return gl1.deleteBuffer(buffer);
}

export {
    GL1_STATIC_DRAW,
    GL1_DYNAMIC_DRAW,
    GL1_ARRAY_BUFFER,
    GL1_ELEMENT_ARRAY_BUFFER,

    gl1CreateBuffer,
    gl1BindBuffer,
    gl1BufferData,
    gl1DeleteBuffer
}
// =====================================================Buffers
// =====================================================Texutres
const GL1_RGB = "RGB"
const GL1_RGBA = "RGBA";
const GL1_ALPHA = "ALPHA";
const GL1_LUMINANCE = "LUMINANCE";
const GL1_LUMINANCE_ALPHA = "LUMINANCE_ALPHA";

const GL1_UNSIGNED_BYTE = "UNSIGNED_BYTE";
const GL1_UNSIGNED_SHORT_5_6_5 = "UNSIGNED_SHORT_5_6_5"
const GL1_UNSIGNED_SHORT_4_4_4_4 = "UNSIGNED_SHORT_4_4_4_4"
const GL1_UNSIGNED_SHORT_5_5_5_1 = "UNSIGNED_SHORT_5_5_5_1"

const GL1_TEXTURE_WRAP_S = "TEXTURE_WRAP_S";
const GL1_TEXTURE_WRAP_T = "TEXTURE_WRAP_T";
const GL1_TEXTURE_MIN_FILTER = "TEXTURE_MIN_FILTER";
const GL1_TEXTURE_MAG_FILTER = "TEXTURE_MAG_FILTER";

const GL1_TEXTURE_2D = "TEXTURE_2D";
const GL1_TEXTURE_CUBE_MAP_POSITIVE_X = "TEXTURE_CUBE_MAP_POSITIVE_X";
const GL1_TEXTURE_CUBE_MAP_NEGATIVE_X = "TEXTURE_CUBE_MAP_NEGATIVE_X";
const GL1_TEXTURE_CUBE_MAP_POSITIVE_Y = "TEXTURE_CUBE_MAP_POSITIVE_Y";
const GL1_TEXTURE_CUBE_MAP_NEGATIVE_Y = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
const GL1_TEXTURE_CUBE_MAP_POSITIVE_Z = "TEXTURE_CUBE_MAP_POSITIVE_Z";
const GL1_TEXTURE_CUBE_MAP_NEGATIVE_Z = "TEXTURE_CUBE_MAP_NEGATIVE_Z";

function gl1CreateTexture() {
    return gl1.createTexture();
}

function gl1DeleteTexture(texture) {
    return gl1.deleteTexture(texture);
}

function gl1BindTexture(target, texture) {
    return gl1.bindTexture(gl1[target], texture);
}

function gl1TexImage2D(target, level, format, type, image) {
    if (image["pixels"]) // Sooooooooo bad...
        return gl1.texImage2D(gl1[target], level, gl1[format], gl1[format], gl1[type], image.pixels);
    return gl1.texImage2D(gl1[target], level, gl1[format], image.width || 0, image.height || 0, border || 0, gl1[format], gl1[type], null);
}

function gl1texParameteri(target, name, value) {
    return gl1.texParameteri(gl1[target], gl1[name], gl1[value]);
}

function gl1ActiveTexture(slot) {
    return gl1.activeTexture(gl1["TEXTURE" + slot]);
}

export {
    GL1_TEXTURE_2D,
    GL1_TEXTURE_CUBE_MAP_POSITIVE_X, GL1_TEXTURE_CUBE_MAP_NEGATIVE_X,
    GL1_TEXTURE_CUBE_MAP_POSITIVE_Y, GL1_TEXTURE_CUBE_MAP_NEGATIVE_Y,
    GL1_TEXTURE_CUBE_MAP_POSITIVE_Z, GL1_TEXTURE_CUBE_MAP_NEGATIVE_Z,

    GL1_RGB, GL1_RGBA, GL1_ALPHA, GL1_LUMINANCE, GL1_LUMINANCE_ALPHA,

    GL1_TEXTURE_WRAP_S, GL1_TEXTURE_WRAP_T,
    GL1_TEXTURE_MIN_FILTER, GL1_TEXTURE_MAG_FILTER,

    GL1_UNSIGNED_BYTE,
    GL1_UNSIGNED_SHORT_5_6_5, 
    GL1_UNSIGNED_SHORT_4_4_4_4, 
    GL1_UNSIGNED_SHORT_5_5_5_1,

    gl1CreateTexture,
    gl1DeleteTexture,
    gl1texParameteri,
    gl1ActiveTexture,
    gl1BindTexture,
    gl1TexImage2D,
}
// =====================================================Textures
// =====================================================Capabilities
const GL1_BLEND = "BLEND";
const GL1_DEPTH_TEST = "DEPTH_TEST";
function gl1Enable(param) {
    return gl1.enable(gl1[param]);
}

const GL1_SRC_ALPHA = "SRC_ALPHA";
const GL1_ONE_MINUS_SRC_ALPHA = "ONE_MINUS_SRC_ALPHA";
function gl1BlendFunc(source, destination) {
    return gl1.blendFunc(gl1[source], gl1[destination]);
}

const GL1_SCISSOR_TEST = "SCISSOR_TEST";
function gl1Scissor(x, y, width, height) { 
    gl1.scissor(x, y, width, height); 
}

const GL1_LESS = "LESS";
function gl1DepthFunc(func) {
    return gl1.depthFunc(gl1[func]);
}

export {
    GL1_BLEND, 
    GL1_DEPTH_TEST,
    gl1Enable,

    GL1_SRC_ALPHA,
    GL1_ONE_MINUS_SRC_ALPHA,
    gl1BlendFunc,

    GL1_SCISSOR_TEST,
    gl1Scissor,

    GL1_LESS,
    gl1DepthFunc
}
// =====================================================Capabilities
let gl1 = null;

const GL1_COLOR_BUFFER = "COLOR_BUFFER_BIT";
const GL1_DEPTH_BUFFER = "DEPTH_BUFFER_BIT"; 

// Functions
function gl1Init(canvas) {
    if (!(gl1 = canvas.getContext('webgl'))) {  
        console.error("Wrender [WebGL1] is not supported!");
        return false;
    }

    return true;
}

function gl1Viewport(x, y, width, height) { return gl1.viewport(x, y, width, height); }

function gl1Clear(r = 0, g = 0, b = 0, a = 0, bufferMasks) {
    gl1.clearColor(r, g, b, a);
    for (let mask in bufferMasks) { gl1.clear(gl1[mask]); }
}

function gl1DrawArrays(count) {
    gl1.drawArrays(gl1.TRIANGLES, 0, count);
}

export {
    
    GL1_COLOR_BUFFER,
    GL1_DEPTH_BUFFER,

    gl1Init,
    gl1Viewport,
    gl1Clear,
    gl1DrawArrays,
}