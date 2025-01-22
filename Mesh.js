// Wrenderer/Mesh.js, CWEBBY.

// Import/Export
import * as WRENDER from "./API.js"
import { VertexArray } from "./Graphics.js"

export { Mesh }

// Mesh
class Mesh {
    static async fromOBJ(url) {
        let lines = await fetch(url);
        lines = await lines.text();
        lines = lines.split("\n")
        let buffer = [];

        let value = {};
        value["vn "] = [[0, 0, 0]]
        value["v "] = [[0, 0, 0]]
        value["vt "] = [[0, 0]]
        value["f "] = []

        let faceFlags = {};        

        for (let line of lines)
        {
            // Just get everything out of the file...
            ["vt ", "v ", "vn ", "f "].forEach(token => {
                if (!line.startsWith(token)) { return; }

                let components = 
                    line.slice(token.length).split(/\s/);
                value[token].push(components);
            });
        }
        
        ["vt ", "v ", "vn "].forEach(token => {
            // This _looks_ weird... but... it's all in strings...
            for (let i in value[token]) { // ...so we need to conver to Number.
                for (let ii in value[token][i]) { // So set the string value to the Number version...
                    value[token][i][ii] = Number(value[token][i][ii]); // ...Then set the index with it.
                }
            }
        });

        // Next, parse and fetch the faces.
        for (let triangle in value["f "]) {
            triangle = value["f "][triangle];
            for (let point in triangle) {
                point = triangle[point].split("/");

                let components = ["v ", "vt ", "vn "];
                for (let component in point) {
                    if (point[component] != "") {
                        buffer.push(value[components[component]][point[component]])
                    }
                }
            }
        }


        let format = [ { name: "a_Position", type: WRENDER.FLOAT, count: 3 } ]
        if (value["vt "].length > 1) 
            format.push({ name: "a_TexCoord", type: WRENDER.FLOAT, count: 2 });
        if (value["vn "].length > 1) 
            format.push({ name: "a_Normal", type: WRENDER.FLOAT, count: 3 });
        return new Mesh(format, buffer.flat())
    }

    constructor(format, buffer) {
        // NOTE(cwebby): Due to complications involving index buffers...
        //  ... we don't really use index buffers when loading from obj.
        this.vertexArray = VertexArray.Create(format, new Float32Array(buffer));
    }

    // Vars
    vertexArray;
}