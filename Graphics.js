// Wrender/Graphics.js, Cwebb.

// Imports/Exports
import { 
    GL_SCISSOR_TEST, 
    GL_DEPTH_TEST, GL_LESS,
    GL_BLEND, GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA,
    glInit, glViewport, glDrawArrays, glDepthFunc, glBlendFunc, glEnable,
    glScissor

} from "./Graphics/WebGL1/WebGL1API.js"

import * as WRENDER from "./API.js"
import { VertexArray } from "./Graphics/VertexArray.js"

export { Graphics };

// defs


// GraphicsContext
class GraphicsContext {
    constructor (canvas, scale = 1) {
        this.scale = scale;
        this.canvas = canvas;

        switch (WRENDER.GRAPHICS_API) {
    
            case "WebGL1":
                glInit(this.canvas);
                
                glEnable(GL_SCISSOR_TEST);
                glEnable(GL_DEPTH_TEST);
                glEnable(GL_BLEND);

                glDepthFunc(GL_LESS);
                glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
                break;

            case "WebGL2":
                glInit(this.canvas);
                
                glEnable(GL_SCISSOR_TEST);
                glEnable(GL_DEPTH_TEST);
                glEnable(GL_BLEND);

                glDepthFunc(GL_LESS);
                glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
                break;
        
            default: break;
        }

        this.onResize();
        window.addEventListener(    
            'resize', () => this.onResize());    

        this.quad = VertexArray.Create(
            [
                { name: "a_Position", type: WRENDER.FLOAT, count: 2 }, 
                { name: "a_TexCoord", type: WRENDER.FLOAT, count: 2 }
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
        glEnable(GL_BLEND);
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

        shader.bind();
        context.quad.bind();
        //activeRenderTarget?.bind();

        switch (WRENDER.GRAPHICS_API) {
        
            case "WebGL1":
                glViewport(0, 0, this.resolution.width, this.resolution.height);
                glScissor(0, 0, this.resolution.width, this.resolution.height);
                glDrawArrays(6);
                break;

            default: break;
        }

        //activeRenderTarget?.unbind();
        context.quad.unbind();
        shader.unbind();
    }
}