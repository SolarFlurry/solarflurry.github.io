class ScratchStandardBoolean {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Booleans",
            "name": "Standard Booleans",
            "blocks": [ {
                            "opcode": "rtrue",
                            "blockType": "reporter",
                            "text": "true",
                            }
                        }, {"opcode": "rfalse",
                            "blockType": "reporter",
                            "text": "false",
                        } ]
        }
    }

    rtrue(){
		return true
	}
	rfalse(){
		return false
	}
}

Scratch.extensions.register(new ScratchFetch())
