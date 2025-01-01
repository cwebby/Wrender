// Wrender/Graphics/ShaderInterface.js, CWEBBY.

// Imports / Exports
export { ShaderInterface };

// Vars
let includes = {};

// ShaderInterface
class ShaderInterface {
    // Methods
    bind() { console.error("ShaderInterface.bind not implemented!"); }
    unbind() { console.error("ShaderInterface.unbind not implemented!"); }

    setInt(name, value) { console.error("ShaderInterface.setInt not implemented!"); }
    setInt2(name, value) { console.error("ShaderInterface.setInt2 not implemented!"); }
    setInt3(name, value) { console.error("ShaderInterface.setInt3 not implemented!"); }
    setInt4(name, value) { console.error("ShaderInterface.setInt4 not implemented!"); }
    setBool(name, value) { console.error("ShaderInterface.setBool not implemented!"); }
    setFloat(name, value) { console.error("ShaderInterface.setFloat not implemented!"); }
    setFloat2(name, value) { console.error("ShaderInterface.setFloat2 not implemented!"); }
    setFloat3(name, value) { console.error("ShaderInterface.setFloat3 not implemented!"); }
    setFloat4(name, value) { console.error("ShaderInterface.setFloat4 not implemented!"); }
    setMatrix2x2(name, value) { console.error("ShaderInterface.setMatrix2x2 not implemented!"); }
    setMatrix3x3(name, value) { console.error("ShadShaderInterfaceer.setMatrix3x3 not implemented!"); }
    setMatrix4x4(name, value) { console.error("ShaderInterface.setMatrix4x4 not implemented!"); }
    setTexture2D(name, texture2D) { console.error("ShaderInterface.setTexture2D not implemented!"); }

    static async fromURL(url) { console.error("ShaderInterface.fromURL not implemented!"); }

    static async includeFromURL(url) {
        if (includes[url]) 
            return includes[url];
        
        return (includes[url] = await (await fetch(url)).text());
    }
}