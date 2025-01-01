// Wrender/Graphics.js, Cwebb.

// Imports/Exports
import * as WRENDER from "./API.js"

import { 

    gl1Init, gl1Viewport, gl1DrawElements

} from "./Graphics/WebGL1/WebGL1API.js"

export { Graphics };

// Vars
let wrender_canvas = document
    .getElementById("WRENDER_CANVAS");
let wrender_scale = 1;

switch (WRENDER.GRAPHICS_API) {
    
    case "WebGL1":
        gl1Init(wrender_canvas);
        break;

    default: break;
}

wrender_resize();
window.addEventListener(    
    'resize', () => wrender_resize());    

// Functions
function wrender_resize() {
    wrender_canvas.width = Math.min(wrender_canvas.offsetWidth, wrender_canvas.offsetWidth * devicePixelRatio) * wrender_scale;
    wrender_canvas.height = Math.min(wrender_canvas.offsetHeight, wrender_canvas.offsetHeight * devicePixelRatio) * wrender_scale;
}

// Graphics
class Graphics {
    // Vars
    static activeRenderTarget;

    // Properties
    static get resolution() {
        return { width: wrender_canvas.width,  height: wrender_canvas.height };
    }

    static get scale () { return wrender_scale; }
    static set scale (value) {
        wrender_scale = value;
        wrender_resize();
    }

    // Methods
    static blit(shader) {
        shader.bind();
        //blit_quad.bind();
        //activeRenderTarget?.bind();

        switch (WRENDER.GRAPHICS_API) {
            
            case "WebGL1":
                gl1Viewport(0, 0, 
                    wrender_canvas.width, wrender_canvas.height);
                gl1DrawElements(this.blitQuad.triangles);
                break;

            default: break;
        }

        //activeRenderTarget?.unbind();
        //blit_quad.unbind();
        shader.unbind();
    }
}