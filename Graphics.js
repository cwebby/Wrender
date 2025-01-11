// Wrender/Graphics.js, Cwebb.

// Imports/Exports
import { 
    GL1_SCISSOR_TEST, 
    GL1_DEPTH_TEST, GL1_LESS,
    GL1_BLEND, GL1_SRC_ALPHA, GL1_ONE_MINUS_SRC_ALPHA,
    gl1Init, gl1Viewport, gl1DrawArrays, gl1DepthFunc, gl1BlendFunc, gl1Enable,
    gl1Scissor

} from "./Graphics/WebGL1/WebGL1API.js"

import * as WRENDER from "./API.js"
import { VertexArray } from "./Graphics/VertexArray.js"

export { Graphics };

// defs
let BYTE = null;
let FLOAT = null;
let SHORT = null;
let UBYTE = null;
let USHORT = null;

switch (WRENDER.GRAPHICS_API) {
        
    case "WebGL1":
        BYTE = { name: "BYTE", sizeof: 1 };
        FLOAT = { name: "FLOAT", sizeof: 4 };
        SHORT = { name: "SHORT", sizeof: 2 };
        UBYTE = { name: "UNSIGNED_BYTE", sizeof: 1 };
        USHORT = { name : "UNSIGNED_SHORT", sizeof: 2 };
        break;

    default: break;
}

// GraphicsContext
class GraphicsContext {
    constructor (canvas, scale = 1) {
        this.scale = scale;
        this.canvas = canvas;

        switch (WRENDER.GRAPHICS_API) {
    
            case "WebGL1":
                gl1Init(this.canvas);
                
                gl1Enable(GL1_SCISSOR_TEST);
                gl1Enable(GL1_DEPTH_TEST);
                gl1Enable(GL1_BLEND);

                gl1DepthFunc(GL1_LESS);
                gl1BlendFunc(GL1_SRC_ALPHA, GL1_ONE_MINUS_SRC_ALPHA);
                break;
        
            default: break;
        }

        this.onResize();
        window.addEventListener(    
            'resize', () => this.onResize());    

        this.quad = VertexArray.Create(
            [
                { name: "a_Position", type: FLOAT, count: 2 }, 
                { name: "a_TexCoord", type: FLOAT, count: 2 }
            ], new Float32Array
            ([
                 /* #1 */    /* Pos */ -1, -1,  /* UV */ 0, 1,
                 /* #2 */    /* Pos */ -1, 1,   /* UV */ 0, 0,
                 /* #3 */    /* Pos */  1, 1,    /* UV */ 1, 0,
                
                 /* #4 */    /* Pos */ 1, 1,   /* UV */ 1, 0,
                 /* #5 */    /* Pos */ 1, -1,   /* UV */ 1, 1,
                 /* #6 */    /* Pos */ -1, -1,   /* UV */ 0, 1,
            ])
        );
    }

    // Vars
    scale;
    canvas;

    quad;
    target;

    // Methods
    onResize () {
        this.canvas.width = Math.min(this.canvas.offsetWidth, this.canvas.offsetWidth * devicePixelRatio) * this.scale;
        this.canvas.height = Math.min(this.canvas.offsetHeight, this.canvas.offsetHeight * devicePixelRatio) * this.scale;
    }
}

let context = new GraphicsContext(
    document.getElementById("WRENDER_CANVAS"));
if (!document.getElementById("WRENDER_CANVAS")) 
    { console.error("#WRENDER_CANVAS not found!"); }

// Graphics
class Graphics {
    // Properties
    static get contextRenderTarget() { return context.target; }
    static set contextRenderTarget(value) { context.target = value; }

    static get resolution() {
        return { width: context.canvas.width,  height: context.canvas.height };
    }

    static get scale () { return context.scale; }
    static set scale (value) {
        context.scale = value;
        context.onResize();
    }

    // Methods
    static blit(shader) {
        gl1Enable(GL1_BLEND);
        gl1BlendFunc(GL1_SRC_ALPHA, GL1_ONE_MINUS_SRC_ALPHA);

        shader.bind();
        context.quad.bind();
        //activeRenderTarget?.bind();

        switch (WRENDER.GRAPHICS_API) {
        
            case "WebGL1":
                gl1Viewport(0, 0, this.resolution.width, this.resolution.height);
                gl1Scissor(0, 0, this.resolution.width, this.resolution.height);
                gl1DrawArrays(6);
                break;

            default: break;
        }

        //activeRenderTarget?.unbind();
        context.quad.unbind();
        shader.unbind();
    }
}