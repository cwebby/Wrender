import { Vec3 } from "./Vec3.js";

export { Mat4x4 };

class Mat4x4 {
    constructor(elements) { this.elements = elements; }

    // Methods
    static identity() {
        return new Mat4x4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static translate(vec3) {
        return new Mat4x4([
                 1,      0,      0, 0,
                 0,      1,      0, 0,
                 0,      0,      1, 0,
            vec3.x, vec3.y, vec3.z, 1,
        ]);
    }

    static rotate(vec3) { 
        let cosX = Math.cos(vec3.x);
        let cosY = Math.cos(vec3.y);
        let cosZ = Math.cos(vec3.z);
        let sinX = Math.sin(vec3.x);
        let sinY = Math.sin(vec3.y);
        let sinZ = Math.sin(vec3.z);

        let xRot = Mat4x4.identity();
        let yRot = Mat4x4.identity();
        let zRot = Mat4x4.identity();

        Mat4x4.multiply(xRot, Mat4x4.identity(),
            new Mat4x4([
                 cosY, 0, sinY, 0,
                    0, 1,    0, 0,
                -sinY, 0, cosY, 0,
                    0, 0,     0,1,
            ])
        );

        Mat4x4.multiply(yRot, xRot,
            new Mat4x4([
                1,     0,   0, 0,
                0, cosX,-sinX, 0,
                0, sinX, cosX, 0,
                0,     0,   0, 1,
            ])
        );

        Mat4x4.multiply(zRot, yRot,
            new Mat4x4([
                 cosZ,  sinZ, 0, 0,
                -sinZ,  cosZ, 0, 0,
                    0,     0, 1, 0,
                    0,     0, 0, 1
            ])
        );

        return zRot;
    }

    static scale(vec3) {
        return new Mat4x4([
            vec3.x, 0, 0, 0,
            0, vec3.y, 0, 0,
            0, 0, vec3.z, 0,
            0, 0,      0, 1,
        ]);
    }

    static orthographic(left, right, bottom, top, near, far) {
        let xOff = -((right + left) / (right - left));
        let yOff = -((top + bottom) / (top - bottom));
        let zOff = -((far + near) / (far - near));
        
        let wDiv = 2 / (right - left);
        let hDiv = 2 / (top - bottom);
        let dDiv = 2 / (far - near);

        return new Mat4x4([
            wDiv,    0,    0, 0,
               0, hDiv,    0, 0,
               0,    0, dDiv, 0,
            xOff, yOff, zOff, 1
        ]);
    }
    
    static perspective(aspect, vfov, near, far) {
        vfov = 1 / (Math.tan((vfov * .5) * (Math.PI / 180)));
        // Take the vfov from degrees to frustum rads, then 1/ for the scaler. 
        let hfov = vfov / aspect; // Then, * aspect for the horizontal.

        let zDiv = far - near; 
        let zMul = far / zDiv; 
        let zOff = -((far * near) / zDiv); 

        // There's a lot going on here...
        // 1: We want (, basically, ) what each fruxel (frustum element) will be worth on the Z. 
        //  That's zDiv = far - near... ie, the total range of z.
        // 2: We also want to get how much to multiply the z for each fruxel, normalised to 1 (for GL).
        //  That's zMul = far / zDiv;
        // 3: We ALSO want to offset the z by how far away the near is from the lens.
        //  That's zOffs = (-far * near) / zDiv... Think of it like the following:
        //  3.1: ((far * near) / zDiv) finds where the near starts in local space.
        //  3.3: Then tack a (-...) in there to turn that into an offset.
    
        return new Mat4x4([
            hfov,    0,    0, 0,
               0, vfov,    0, 0,
               0,    0, zMul, 1,
               0,    0, zOff, 1
        ]);
    }

    static multiply(out, left, right) { // All you'll ever need...
        out.elements = [ // this is hardcoded for the moment... anything else is just complicating it.
            (left.elements[0] * right.elements[0]) + (left.elements[1] * right.elements[4]) + (left.elements[2] * right.elements[8]) + (left.elements[3] * right.elements[12]),
            (left.elements[0] * right.elements[1]) + (left.elements[1] * right.elements[5]) + (left.elements[2] * right.elements[9]) + (left.elements[3] * right.elements[13]),
            (left.elements[0] * right.elements[2]) + (left.elements[1] * right.elements[6]) + (left.elements[2] * right.elements[10]) + (left.elements[3] * right.elements[14]),
            (left.elements[0] * right.elements[3]) + (left.elements[1] * right.elements[7]) + (left.elements[2] * right.elements[11]) + (left.elements[3] * right.elements[15]),
            
            (left.elements[4] * right.elements[0]) + (left.elements[5] * right.elements[4]) + (left.elements[6] * right.elements[8]) + (left.elements[7] * right.elements[12]),
            (left.elements[4] * right.elements[1]) + (left.elements[5] * right.elements[5]) + (left.elements[6] * right.elements[9]) + (left.elements[7] * right.elements[13]),
            (left.elements[4] * right.elements[2]) + (left.elements[5] * right.elements[6]) + (left.elements[6] * right.elements[10]) + (left.elements[7] * right.elements[14]),
            (left.elements[4] * right.elements[3]) + (left.elements[5] * right.elements[7]) + (left.elements[6] * right.elements[11]) + (left.elements[7] * right.elements[15]),
            
            (left.elements[8] * right.elements[0]) + (left.elements[9] * right.elements[4]) + (left.elements[10] * right.elements[8]) + (left.elements[11] * right.elements[12]),
            (left.elements[8] * right.elements[1]) + (left.elements[9] * right.elements[5]) + (left.elements[10] * right.elements[9]) + (left.elements[11] * right.elements[13]),
            (left.elements[8] * right.elements[2]) + (left.elements[9] * right.elements[6]) + (left.elements[10] * right.elements[10]) + (left.elements[11] * right.elements[14]),
            (left.elements[8] * right.elements[3]) + (left.elements[9] * right.elements[7]) + (left.elements[10] * right.elements[11]) + (left.elements[11] * right.elements[15]),
            
            (left.elements[12] * right.elements[0]) + (left.elements[13] * right.elements[4]) + (left.elements[14] * right.elements[8]) + (left.elements[15] * right.elements[12]),
            (left.elements[12] * right.elements[1]) + (left.elements[13] * right.elements[5]) + (left.elements[14] * right.elements[9]) + (left.elements[15] * right.elements[13]),
            (left.elements[12] * right.elements[2]) + (left.elements[13] * right.elements[6]) + (left.elements[14] * right.elements[10]) + (left.elements[15] * right.elements[14]),
            (left.elements[12] * right.elements[3]) + (left.elements[13] * right.elements[7]) + (left.elements[14] * right.elements[11]) + (left.elements[15] * right.elements[15]),
        ];
    }

    // Vars
    elements;

    // Properties
    get array() { return this.elements; }
}