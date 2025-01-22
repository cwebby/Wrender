// Wrender/Graphics/WebGL1/VertexArray.js, CWEBBY.

// TODO(cwebby): Sort out how dynamic meshes will be done...
// TODO(cwebby): Convert current to use index buffer, even if none is given.

// Import/Export
import {
    
    ELEMENT_ARRAY_BUFFER,
    ARRAY_BUFFER,
    STATIC_DRAW,

    CreateBuffer,
    BindBuffer,
    BufferData,
    DeleteBuffer,

    VertexAttribPointer,
    EnableVertexAttribArray

} from "./API.js"

import { VertexArrayInterface } from "../VertexArrayInterface.js";

export { VertexArray };

// WebGL1VertexArray
class VertexArray extends VertexArrayInterface {
    constructor(layout, data, indices = null) {
        super(layout, data, indices);

        this.attributeBuffer = CreateBuffer();
        BindBuffer(ARRAY_BUFFER, this.attributeBuffer); // this.bind?
        BufferData(ARRAY_BUFFER, data, STATIC_DRAW);
        BindBuffer(ARRAY_BUFFER, null);
        this.indexBuffer = null;

        let countofVert = 0;
        this.layout.forEach(element => {
            countofVert += element.count; });
        this.count = data.length / countofVert;
    }

    // Vars
    attributeBuffer;
    indexBuffer;
    count;

    // Methods
    bind() { 
        BindBuffer(ARRAY_BUFFER, this.attributeBuffer);
        BindBuffer(ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        
        let offset = 0;
        for (let i = 0; i < this.layout.length; i++)
        {
            let attribute = this.layout[i];
            EnableVertexAttribArray(i);

            VertexAttribPointer(i, attribute.count, 
                attribute.type.name, false, this.sizeof, offset);
            offset += attribute.type.sizeof * attribute.count;
        }
    }

    unbind() { 
        BindBuffer(ELEMENT_ARRAY_BUFFER, null); 
        BindBuffer(ARRAY_BUFFER, null); 
    }

    release() { DeleteBuffer(this.attributeBuffer); }
}