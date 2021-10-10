class ScratchFetch {
    constructor() {
    }
    
    getInfo() {
        return {
            "id": "Test",
            "name": "Test",
            "blocks": [ 
				{
					"opcode": "do",
					"blockType": "reporter",
					"text": "increment [val] by [val2]",
					"arguments": {
						"val": {
							"type": "number",
							"defaultValue": "1"
						}
						"val2": {
							"type": "number",
							"defaultValue": "2"
						}
					}
				}
			]
        }
    }

    do({val},{val2}){
		return val + val2
	}
}

Scratch.extensions.register(new ScratchFetch())