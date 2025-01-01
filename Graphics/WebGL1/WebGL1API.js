// Wrender/Graphics/WebGL1/WebGL1API.js, CWEBBY.

// Export
export { 
    // Enums
    GL1_VERTEX_SHADER,
    GL1_FRAGMENT_SHADER,

    GL1_COMPILE_STATUS,

    GL1_SCISSOR_TEST,
    GL1_BLEND,

    GL1_COLOR_BUFFER,
    GL1_DEPTH_BUFFER,

    // Functions
    gl1Viewport, gl1Scissor,
    gl1Init, gl1Enable, gl1Clear, 
    gl1DrawArrays, gl1DrawElements,

    gl1CreateProgram, gl1CreateShader, 
    gl1ShaderSource, gl1CompileShader,
    gl1GetShaderParameter,
    gl1GetShaderInfoLog,
    gl1DeleteShader,
    gl1AttachShader,
    gl1UseProgram,
};

// Vars
let gl1 = null;

const GL1_SCISSOR_TEST = "SCISSOR_TEST";
const GL1_BLEND = "BLEND";

const GL1_VERTEX_SHADER = "VERTEX_SHADER";
const GL1_FRAGMENT_SHADER = "FRAGMENT_SHADER";

const GL1_COMPILE_STATUS = "COMPILE_STATUS";

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

function gl1Enable(param) {
    return gl1.enable(gl[param]);
}

function gl1Viewport(x, y, width, height) { gl1.viewport(x, y, width, height); }
function gl1Scissor(x, y, width, height) { gl1.scissor(x, y, width, height); }

function gl1Clear(r = 0, g = 0, b = 0, a = 0, bufferMasks) {
    gl1.clearColor(r, g, b, a);
    for (let mask in bufferMasks) { gl1.clear(gl1[mask]); }
}

function gl1DrawArrays(count) {
    { gl1.drawArrays(gl.TRIANGLES, 0, count); }    
}

function gl1DrawElements(count) {
    { gl1.drawElements(gl.TRIANGLES, 0, count); }    
}

function gl1CreateProgram() {
    return gl1.createProgram();
}

function gl1CreateShader(type) {
    return gl1.createShader(gl[type]);
}

function gl1ShaderSource(shader, source) {
    return gl1.shaderSource(shader, source);
}

function gl1CompileShader(shader) {
    return gl1.compileShader(shader);
}

function gl1GetShaderParameter(shader, name) {
    return gl1.getShaderParameter(shader, gl[name]);
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