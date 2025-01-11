// Wrender/Graphics/WebGL1/WebGL1VertexArray.js, CWEBBY.

// TODO(cwebby): Sort out how dynamic meshes will be done...
// TODO(cwebby): Convert current to use index buffer, even if none is given.

// Import/Export
import {
    
    GL1_ARRAY_BUFFER,
    GL1_STATIC_DRAW,

    gl1CreateBuffer,
    gl1BindBuffer,
    gl1BufferData,
    gl1DeleteBuffer,

    gl1VertexAttribPointer,
    gl1EnableVertexAttribArray

} from "./WebGL1API.js"

import { VertexArrayInterface } from "../VertexArrayInterface.js";

export { WebGL1VertexArray };

// WebGL1VertexArray
class WebGL1VertexArray extends VertexArrayInterface {
    constructor(layout, data, indices = null) {
        super(layout, data, indices);

        this.attributeBuffer = gl1CreateBuffer();
        gl1BindBuffer(GL1_ARRAY_BUFFER, this.attributeBuffer); // this.bind?
        gl1BufferData(GL1_ARRAY_BUFFER, data, GL1_STATIC_DRAW);
        gl1BindBuffer(GL1_ARRAY_BUFFER, null);// this.unbind?
    }

    // Vars
    attributeBuffer;

    // Methods
    bind() { 
        gl1BindBuffer(GL1_ARRAY_BUFFER, this.attributeBuffer);
        
        let offset = 0;
        for (let i = 0; i < this.layout.length; i++)
        {
            let attribute = this.layout[i];
            gl1EnableVertexAttribArray(i);

            gl1VertexAttribPointer(i, attribute.count, 
                attribute.type.name, false, this.sizeof, offset);
            offset += attribute.type.sizeof * attribute.count;
        }
    }

    unbind() { gl1BindBuffer(GL1_ARRAY_BUFFER, null); }
    release() { gl1DeleteBuffer(this.attributeBuffer); }
}