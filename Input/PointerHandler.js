/* ~/Input.js, Cwebby.
 */

// Imports / Exports
export { PointerHandler };

class PointerHandler {
    constructor(htmlElement) {
        this.isDragging = false;
        this.currentPosition = this.deltaPosition = { x: 0, y: 0 };
        
        ["mousedown", "touchstart"].forEach(eventName => {
            htmlElement.addEventListener(eventName, eventHandler => {
                this.isDragging = true;

                this.dragDeltaPosition = { x: 0, y: 0 };
                this.dragStartPosition = this.currentPosition;
            });
        });

        ["mousemove", "touchmove"].forEach(eventName => {
            htmlElement.addEventListener(eventName, eventHandler => {
                this.updated = true;

                let currentPosition = {
                    x: eventHandler.clientX, y: eventHandler.clientY };
                this.deltaPosition = {
                    x: currentPosition.x - this.currentPosition.x,
                    y: currentPosition.y - this.currentPosition.y };
                this.currentPosition = currentPosition;

                if (this.isDragging) {
                    this.dragDeltaPosition = {
                        x: this.currentPosition.x - this.dragStartPosition.x,
                        y: this.currentPosition.y - this.dragStartPosition.y
                    }
                }
            });
        });

        ["mouseup", "touchend", "touchcancel"].forEach(eventName => {
            htmlElement.addEventListener(eventName, eventHandler => {
                this.dragDeltaPosition = this.dragStartPosition  = null;
                this.isDragging = false;
            });
        });

        this.update();
    } 

    // Vars
    updated;
    deltaPosition;
    currentPosition;

    isDragging;
    dragStartPosition;
    dragDeltaPosition;

    // Methods
    update() {
        if (!this.updated) { this.deltaPosition = { x: 0, y: 0 }; }
            
            // Set the latch incase the event call never happens.
        this.updated = false; 
        
        requestAnimationFrame(() => this.update());
    }
}