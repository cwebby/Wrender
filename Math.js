/* ~/Maths.js, Cwebb.
 */

// Imports / Exports
import { Mat4x4 } from "./Math/Mat4x4.js"

export { 
    Mat4x4,

    lerp, toRadians, toDegrees 
};

// Vars
const PI = 3.14159265;

// Functions
function lerp(a, b, v) {
    return a + ((b - a) * v);
}

function toDegrees(radians) {
    return radians * (180 / PI);
}

function toRadians(degrees) {
    return degrees * (PI / 180);
}