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
                            "arguments": {
                                },
                            }
                        },{"opcode": "rfalse",
                            "blockType": "reporter",
                            "text": "false",
							"arguments": {
                                },
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

Scratch.extensions.register(new ScratchFetch())