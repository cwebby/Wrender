// Wrender/ECS.js, CWEBBY.

// Import/Export
export { ComponentEntity, ComponentSystem };

// ComponentEntity
class ComponentEntity {
    constructor(args) {
        this.name = args["name"] || "";
        this.state = args["state"] || { };
        this.update = args["update"] || (() => {});
        this.requires = args["requires"] || []
    } 

    // Vars
    name;
    state;
    update;
    requires;
}

// ComponentSystem
class ComponentSystem {
    // Vars
    componentEntities = [];

    // Methods
    addComponentEntity(componentEntity) {
        if (this.componentEntities.find(existingComponentEntity => existingComponentEntity.name == componentEntity.name) != null) {
            throw (componentEntity + " already exists!");
        }

        this.componentEntities.push(componentEntity);
    }

    // TODO(cwebby): Add removeComponent.

    update() {
        for (let i = 0; i < this.componentEntities.length; i++) {
            let current = this.componentEntities[i];

            let requires = {};
            if (current.update != null) {
                if (current["requires"].length > 0) {

                    for (let ii = 0; ii < this.componentEntities.length; ii++) {
                        let require = this.componentEntities[ii];
    
                        if (current["requires"].includes(require.name)) {
                            requires[require.name] = require;
                        }
                    }
                }

                current.update(requires);
            }
        }
    }
}