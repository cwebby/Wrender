// Wrender/Graphics.js, Cwebb.

// Imports/Exports
import { VertexArray } from "./Graphics/VertexArray.js"
import { Texture2D } from "./Graphics/Textures.js"
import { Shader } from "./Graphics/Shader.js"
export { VertexArray, Texture2D, Shader };

import * as WebGL1 from "./Graphics/WebGL1/API.js"
import * as WebGL2 from "./Graphics/WebGL2/API.js"

import * as WRENDER from "./API.js"
export { Graphics };

// GraphicsContext
class GraphicsContext {
    constructor (canvas, scale = 1) {
        this.scale = scale;
        this.canvas = canvas;

        switch (WRENDER.GRAPHICS_API) {
    
            case "WebGL1":
                WebGL1.Init(this.canvas);
                
                WebGL1.Enable(WebGL1.SCISSOR_TEST);
                WebGL1.Enable(WebGL1.DEPTH_TEST);
                WebGL1.Enable(WebGL1.BLEND);

                WebGL1.DepthFunc(WebGL1.LESS);
                WebGL1.BlendFunc(WebGL1.SRC_ALPHA, 
                    WebGL1.ONE_MINUS_SRC_ALPHA);
                break;
            case "WebGL2":
                WebGL2.Init(this.canvas);
                
                WebGL2.Enable(WebGL2.SCISSOR_TEST);
                WebGL2.Enable(WebGL2.DEPTH_TEST);
                WebGL2.Enable(WebGL2.BLEND);

                WebGL2.DepthFunc(WebGL2.LESS);
                WebGL2.BlendFunc(WebGL2.SRC_ALPHA, 
                    WebGL2.ONE_MINUS_SRC_ALPHA);
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
                 /* Pos */-1, -1, /* UV */ 0, 0,
                 /* Pos */ 1, -1, /* UV */ 1, 0,
                 /* Pos */ 1,  1, /* UV */ 1, 1,

                 /* Pos */ 1,  1, /* UV */ 1, 1,
                 /* Pos */-1,  1, /* UV */ 0, 1,
                 /* Pos */-1, -1, /* UV */ 0, 0
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
    static drawMesh(mesh, shader, transform) {
        Shader.setStaticMatrix4x4("u_M", transform.array);

        shader.bind();
        mesh.vertexArray.bind();
        switch (WRENDER.GRAPHICS_API) {
        
            case "WebGL1":
                WebGL1.Enable(WebGL1.BLEND);
                WebGL1.BlendFunc(WebGL1.SRC_ALPHA, WebGL1.ONE_MINUS_SRC_ALPHA);
                WebGL1.Viewport(0, 0, this.resolution.width, this.resolution.height);
                WebGL1.Scissor(0, 0, this.resolution.width, this.resolution.height);
                WebGL1.DrawArrays(mesh.vertexArray.count);
                break;
            case "WebGL2":
                WebGL2.Enable(WebGL2.BLEND);
                WebGL2.BlendFunc(WebGL2.SRC_ALPHA, WebGL2.ONE_MINUS_SRC_ALPHA);
                WebGL2.Viewport(0, 0, this.resolution.width, this.resolution.height);
                WebGL2.Scissor(0, 0, this.resolution.width, this.resolution.height);
                WebGL2.DrawArrays(mesh.vertexArray.count);
                break;

            default: break;
        }
        mesh.vertexArray.unbind();
        shader.unbind();
    }

    static blit(shader, source = null, destination = null) {
        shader.bind();
        context.quad.bind();
        switch (WRENDER.GRAPHICS_API) {
        
            case "WebGL1":
                WebGL1.Enable(WebGL1.BLEND);
                WebGL1.BlendFunc(WebGL1.SRC_ALPHA, WebGL1.ONE_MINUS_SRC_ALPHA);
                WebGL1.Viewport(0, 0, this.resolution.width, this.resolution.height);
                WebGL1.Scissor(0, 0, this.resolution.width, this.resolution.height);
                WebGL1.DrawArrays(context.quad.count);
                break;
            case "WebGL2":
                WebGL2.Enable(WebGL2.BLEND);
                WebGL2.BlendFunc(WebGL2.SRC_ALPHA, WebGL2.ONE_MINUS_SRC_ALPHA);
                WebGL2.Viewport(0, 0, this.resolution.width, this.resolution.height);
                WebGL2.Scissor(0, 0, this.resolution.width, this.resolution.height);
                WebGL2.DrawArrays(context.quad.count);

            default: break;
        }
        context.quad.unbind();
        shader.unbind();
    }
}