class BooleanExample {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Booleans",
            "name": "Standard Booleans",
            "blocks": [ {
                            "opcode": "rtrue",
                            "blockType": "Boolean",
                            "text": "true",
                            }
                        },{"opcode": "rfalse",
                            "blockType": "Boolean",
                            "text": "false",
                            }
                        }, ]
        }
    }

    rtrue(){
		return true
	}
	rfalse(){
		return false
	}
}

Scratch.extensions.register(new BooleanExample())
