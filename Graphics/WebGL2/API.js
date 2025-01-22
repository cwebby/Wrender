// Wrender/Graphics/WebGL2/API.js, CWEBBY.

// =====================================================Shader
const LINK_STATUS = "LINK_STATUS";
const COMPILE_STATUS = "COMPILE_STATUS";

const VERTEX_SHADER = "VERTEX_SHADER";
const FRAGMENT_SHADER = "FRAGMENT_SHADER";

function CreateProgram() {
    return gl.createProgram();
}

function CreateShader(type) {
    return gl.createShader(gl[type]);
}

function ShaderSource(shader, source) {
    return gl.shaderSource(shader, source);
}

function CompileShader(shader) {
    return gl.compileShader(shader);
}

function GetShaderParameter(shader, name) {
    return gl.getShaderParameter(shader, gl[name]);
}

function GetShaderInfoLog(shader) {
    return gl.getShaderInfoLog(shader);
}

function DeleteShader(shader) {
    return gl.deleteShader(shader);
}

function AttachShader(program, shader) {
    return gl.attachShader(program, shader);
}

function UseProgram(program) {
    return gl.useProgram(program);
}

function LinkProgram(program) {
    return gl.linkProgram(program);
}

function DeleteProgram(program) {
    return gl.deleteProgram(program);
}
    
function GetProgramParameter(program, parameter) {
    return gl.getProgramParameter(program, gl[parameter]);
}

function GetProgramInfoLog(program) {
    return gl.getProgramInfoLog(program);
}

export { // Shader
    // Enums
    LINK_STATUS,
    COMPILE_STATUS,
    VERTEX_SHADER,
    FRAGMENT_SHADER,
    
    // Functions
    CreateProgram, CreateShader, 
    ShaderSource, CompileShader,

    GetProgramParameter,
    GetShaderParameter,
    GetProgramInfoLog,
    GetShaderInfoLog,

    DeleteShader,
    AttachShader,
    LinkProgram,
    UseProgram,
    DeleteProgram,
}
// =====================================================Shader
// =====================================================Uniform
const ACTIVE_UNIFORMS = "ACTIVE_UNIFORMS";

function GetActiveUniform(program, index) {
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
        case gl["FLOAT_MAT2"]: return { name: uniform.name, type: "MAT2" }; 
        case gl["FLOAT_MAT3"]: return { name: uniform.name, type: "MAT3" }; 
        case gl["FLOAT_MAT4"]: return { name: uniform.name, type: "MAT4" }; 
        case gl["FLOAT_VEC2"]: return { name: uniform.name, type: "FLOAT2" };  
        case gl["FLOAT_VEC3"]: return { name: uniform.name, type: "FLOAT3" };  
        case gl["FLOAT_VEC4"]: return { name: uniform.name, type: "FLOAT4" }; 
        case gl["SAMPLER_2D"]: return { name: uniform.name, type: "SAMPLER2D" };  
        case gl["SAMPLER_CUBE"]: return { name: uniform.name, type: "SAMPLERCUBE" };  
    }
}

function GetUniformLocation(program, name) {
    return gl.getUniformLocation(program, name);
}

function Uniform1i(location, value) {
    return gl.uniform1i(location, value);
}

function Uniform2i(location, x, y) {
    return gl.uniform2i(location, x, y);
}

function Uniform3i(location, x, y, z) {
    return gl.uniform3i(location, x, y, z);
}

function Uniform4i(location, x, y, z, w) {
    return gl.uniform4i(location, x, y, z, w);
}

function Uniform1f(location, value) {
    return gl.uniform1f(location, value);
}

function Uniform2f(location, x, y) {
    return gl.uniform2f(location, x, y);
}

function Uniform3f(location, x, y, z) {
    return gl.uniform3f(location, x, y, z);
}

function Uniform4f(location, x, y, z, w) {
    return gl.uniform4f(location, x, y, z, w);
}

function UniformMatrix2fv(location, transpose, values) {
    return gl.uniformMatrix2fv(location, transpose, values);
}

function UniformMatrix3fv(location, transpose, values) {
    return gl.uniformMatrix3fv(location, transpose, values);
}

function UniformMatrix4fv(location, transpose, values) {
    return gl.uniformMatrix4fv(location, transpose, values);
}

export { 
    ACTIVE_UNIFORMS,

    GetActiveUniform,
    GetUniformLocation,

    Uniform1i, Uniform2i, Uniform3i, Uniform4i,
    Uniform1f, Uniform2f, Uniform3f, Uniform4f,
    UniformMatrix2fv, UniformMatrix3fv, UniformMatrix4fv
};
// =====================================================Uniform
// =====================================================Attributes
const ACTIVE_ATTRIBS = "ACTIVE_ATTRIBUTES";

function GetActiveAttrib(program, ptr) {
    return gl.getActiveAttrib(program, ptr);
}

function BindAttribLocation(program, ptr, name) {
    return gl.bindAttribLocation(program, ptr, name);
}

function EnableVertexAttribArray(ptr) {
    return gl.enableVertexAttribArray(ptr);
}

function VertexAttribPointer(ptr, components, type, isNormalised, stride, offset) {
    return gl.vertexAttribPointer(ptr, components, gl[type], isNormalised, stride, offset);
}

function GetAttribLocation(program, name) {
    return gl.getAttribLocation(program, name);
}

export {
    ACTIVE_ATTRIBS,

    GetActiveAttrib,
    BindAttribLocation,
    EnableVertexAttribArray,
    VertexAttribPointer,
    GetAttribLocation
}
// =====================================================Attributes
// =====================================================Buffers
const STATIC_DRAW = "STATIC_DRAW";
const DYNAMIC_DRAW = "DYNAMIC_DRAW";

const ARRAY_BUFFER = "ARRAY_BUFFER";
const ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER";

function CreateBuffer() {
    return gl.createBuffer();
}

function BindBuffer(type, buffer) {
    return gl.bindBuffer(gl[type], buffer);
}

function BufferData(type, data, usage) {
    return gl.bufferData(gl[type], data, gl[usage]);
}

function DeleteBuffer(buffer) {
    return gl.deleteBuffer(buffer);
}

export {
    STATIC_DRAW,
    DYNAMIC_DRAW,
    ARRAY_BUFFER,
    ELEMENT_ARRAY_BUFFER,

    CreateBuffer,
    BindBuffer,
    BufferData,
    DeleteBuffer
}
// =====================================================Buffers
// =====================================================Texutres
const RGB = "RGB"
const RGBA = "RGBA";
const ALPHA = "ALPHA";
const LUMINANCE = "LUMINANCE";
const LUMINANCE_ALPHA = "LUMINANCE_ALPHA";

const UNSIGNED_BYTE = "UNSIGNED_BYTE";
const UNSIGNED_SHORT_5_6_5 = "UNSIGNED_SHORT_5_6_5"
const UNSIGNED_SHORT_4_4_4_4 = "UNSIGNED_SHORT_4_4_4_4"
const UNSIGNED_SHORT_5_5_5_1 = "UNSIGNED_SHORT_5_5_5_1"

const TEXTURE_WRAP_S = "TEXTURE_WRAP_S";
const TEXTURE_WRAP_T = "TEXTURE_WRAP_T";
const TEXTURE_MIN_FILTER = "TEXTURE_MIN_FILTER";
const TEXTURE_MAG_FILTER = "TEXTURE_MAG_FILTER";

const TEXTURE_2D = "TEXTURE_2D";
const TEXTURE_CUBE_MAP_POSITIVE_X = "TEXTURE_CUBE_MAP_POSITIVE_X";
const TEXTURE_CUBE_MAP_NEGATIVE_X = "TEXTURE_CUBE_MAP_NEGATIVE_X";
const TEXTURE_CUBE_MAP_POSITIVE_Y = "TEXTURE_CUBE_MAP_POSITIVE_Y";
const TEXTURE_CUBE_MAP_NEGATIVE_Y = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
const TEXTURE_CUBE_MAP_POSITIVE_Z = "TEXTURE_CUBE_MAP_POSITIVE_Z";
const TEXTURE_CUBE_MAP_NEGATIVE_Z = "TEXTURE_CUBE_MAP_NEGATIVE_Z";

function CreateTexture() {
    return gl.createTexture();
}

function DeleteTexture(texture) {
    return gl.deleteTexture(texture);
}

function BindTexture(target, texture) {
    return gl.bindTexture(gl[target], texture);
}

function TexImage2D(target, level, format, type, image) {
    if (image["pixels"]) // Sooooooooo bad...
        return gl.texImage2D(gl[target], level, gl[format], gl[format], gl[type], image.pixels);
    return gl.texImage2D(gl[target], level, gl[format], image.width || 0, image.height || 0, border || 0, gl[format], gl[type], null);
}

function texParameteri(target, name, value) {
    return gl.texParameteri(gl[target], gl[name], gl[value]);
}

function ActiveTexture(slot) {
    return gl.activeTexture(gl["TEXTURE" + slot]);
}

export {
    TEXTURE_2D,
    TEXTURE_CUBE_MAP_POSITIVE_X, TEXTURE_CUBE_MAP_NEGATIVE_X,
    TEXTURE_CUBE_MAP_POSITIVE_Y, TEXTURE_CUBE_MAP_NEGATIVE_Y,
    TEXTURE_CUBE_MAP_POSITIVE_Z, TEXTURE_CUBE_MAP_NEGATIVE_Z,

    RGB, RGBA, ALPHA, LUMINANCE, LUMINANCE_ALPHA,

    TEXTURE_WRAP_S, TEXTURE_WRAP_T,
    TEXTURE_MIN_FILTER, TEXTURE_MAG_FILTER,

    UNSIGNED_BYTE,
    UNSIGNED_SHORT_5_6_5, 
    UNSIGNED_SHORT_4_4_4_4, 
    UNSIGNED_SHORT_5_5_5_1,

    CreateTexture,
    DeleteTexture,
    texParameteri,
    ActiveTexture,
    BindTexture,
    TexImage2D,
}
// =====================================================Textures
// =====================================================Capabilities
const BLEND = "BLEND";
const DEPTH_TEST = "DEPTH_TEST";
function Enable(param) {
    return gl.enable(gl[param]);
}

const SRC_ALPHA = "SRC_ALPHA";
const ONE_MINUS_SRC_ALPHA = "ONE_MINUS_SRC_ALPHA";
function BlendFunc(source, destination) {
    return gl.blendFunc(gl[source], gl[destination]);
}

const SCISSOR_TEST = "SCISSOR_TEST";
function Scissor(x, y, width, height) { 
    gl.scissor(x, y, width, height); 
}

const LESS = "LESS";
function DepthFunc(func) {
    return gl.depthFunc(gl[func]);
}

export {
    BLEND, 
    DEPTH_TEST,
    Enable,

    SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA,
    BlendFunc,

    SCISSOR_TEST,
    Scissor,

    LESS,
    DepthFunc
}
// =====================================================Capabilities
let gl = null;

const COLOR_BUFFER = "COLOR_BUFFER_BIT";
const DEPTH_BUFFER = "DEPTH_BUFFER_BIT"; 

// Functions
function Init(canvas) {
    if (!(gl = canvas.getContext('webgl2'))) {  
        console.error("Wrender [WebGL2] is not supported!");
        return false;
    }

    return true;
}

function Viewport(x, y, width, height) { return gl.viewport(x, y, width, height); }

function Clear(r = 0, g = 0, b = 0, a = 0, bufferMasks) {
    gl.clearColor(r, g, b, a);
    for (let mask in bufferMasks) { gl.clear(gl[mask]); }
}

function DrawArrays(count) {
    gl.drawArrays(gl.TRIANGLES, 0, count);
}

export {
    
    COLOR_BUFFER,
    DEPTH_BUFFER,

    Init,
    Viewport,
    Clear,
    DrawArrays
}
