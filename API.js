// Wrender/API.js, CWEBBY.

// Import/Export
export {
    GRAPHICS_API,

    BYTE, FLOAT, SHORT, UBYTE, USHORT
}

// Vars
const GRAPHICS_API = "WebGL2";

let BYTE = null;
let FLOAT = null;
let SHORT = null;
let UBYTE = null;
let USHORT = null;

switch (GRAPHICS_API) {
        
    case "WebGL1":
        BYTE = { name: "BYTE", sizeof: 1 };
        FLOAT = { name: "FLOAT", sizeof: 4 };
        SHORT = { name: "SHORT", sizeof: 2 };
        UBYTE = { name: "UNSIGNED_BYTE", sizeof: 1 };
        USHORT = { name : "UNSIGNED_SHORT", sizeof: 2 };
        break;

    case "WebGL2":
        BYTE = { name: "BYTE", sizeof: 1 };
        FLOAT = { name: "FLOAT", sizeof: 4 };
        SHORT = { name: "SHORT", sizeof: 2 };
        UBYTE = { name: "UNSIGNED_BYTE", sizeof: 1 };
        USHORT = { name : "UNSIGNED_SHORT", sizeof: 2 };
        break;

    default: break;
}