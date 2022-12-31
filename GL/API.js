/* ~/Core/GL/API.js, Cwebb.
 */

// Imports / Exports
export { gl, glBind, glViewport, glClear, glDraw };

// Vars
let gl = null;

// Functions
function glBind(canvas, params = {}) {
    gl = canvas.getContext('webgl2', params);
    if (!gl) { gl = canvas.getContext('webgl', params);
	console.error("WEBGL v2 NOT SUPPORTED! WRENDER WILL FALLBACK to v1!"); }
    if (!gl) { console.error("WEBGL NOT SUPPORTED! WRENDER WILL FAIL TO OPERATE!"); }

    gl.enable(gl.SCISSOR_TEST);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.BLEND);

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl['API'] = canvas.getContext('webgl') == gl ? 1 : 
	    canvas.getContext('webgl2') == gl ? 2 : 0;

    // Extensions... needed for rendering HDR/F32 textures...
    gl.getExtension('OES_texture_float_linear');
    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('EXT_float_blend');
}

function glViewport(x, y, width, height) {
    gl.viewport(x, y, width, height);
    gl.scissor(x, y, width, height);
}

function glClear(r = 0, g = 0, b = 0, a = 0) {
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function glDraw(count = 0, primitive = "TRIANGLES") {
    gl.drawElements(gl[primitive], count, gl.UNSIGNED_SHORT, 0);
}