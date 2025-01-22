// Wrender/ECS/EntityComponent.js, CWEBBY.

// Import/Export
export { EntityComponent };

// ComponentEntity
class EntityComponent {
    constructor(args) {
        this.name = args["name"] || "";
        this.state = args["state"] || { };
        this.requires = args["requires"] || []
    
        this.update = args["update"] || (() => {});
    } 

    // Vars
    name;
    state;
    update;
    requires;
}