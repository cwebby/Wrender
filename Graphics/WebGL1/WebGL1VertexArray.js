// Wrender/Graphics/WebGL1/WebGL1VertexArray.js, CWEBBY.

// TODO(cwebby): Sort out how dynamic meshes will be done...
// TODO(cwebby): Convert current to use index buffer, even if none is given.

// Import/Export
import {
    
    GL_ARRAY_BUFFER,
    GL_STATIC_DRAW,

    glCreateBuffer,
    glBindBuffer,
    glBufferData,
    glDeleteBuffer,

    glVertexAttribPointer,
    glEnableVertexAttribArray

} from "./WebGL1API.js"

import { VertexArrayInterface } from "../VertexArrayInterface.js";

export { WebGL1VertexArray };

// WebGL1VertexArray
class WebGL1VertexArray extends VertexArrayInterface {
    constructor(layout, data, indices = null) {
        super(layout, data, indices);

        this.attributeBuffer = glCreateBuffer();
        glBindBuffer(GL_ARRAY_BUFFER, this.attributeBuffer); // this.bind?
        glBufferData(GL_ARRAY_BUFFER, data, GL_STATIC_DRAW);
        glBindBuffer(GL_ARRAY_BUFFER, null);// this.unbind?
    }

    // Vars
    attributeBuffer;

    // Methods
    bind() { 
        glBindBuffer(GL_ARRAY_BUFFER, this.attributeBuffer);
        
        let offset = 0;
        for (let i = 0; i < this.layout.length; i++)
        {
            let attribute = this.layout[i];
            glEnableVertexAttribArray(i);

            glVertexAttribPointer(i, attribute.count, 
                attribute.type.name, false, this.sizeof, offset);
            offset += attribute.type.sizeof * attribute.count;
        }
    }

    unbind() { glBindBuffer(GL_ARRAY_BUFFER, null); }
    release() { glDeleteBuffer(this.attributeBuffer); }
}