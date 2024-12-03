class FetchExtension {
    constructor() {
    }

    getInfo() {
        return {
            "id": "Fetch",
            "name": "Fetch",
            "blocks": [
                        {
                            "opcode": "fetchURL",
                            "blockType": "reporter",
                            "text": "fetch data from [url]",
                            "arguments": {
                                "url": {
                                    "type": "string",
                                    "defaultValue": "https://api.weather.gov/stations/KNYC/observations"
                                },
                            }
                        },
                        {
                            "opcode": "jsonExtract",
                            "blockType": "reporter",
                            "text": "extract [name] from [data]",
                            "arguments": {
                                "name": {
                                    "type": "string",
                                    "defaultValue": "temperature"
                                },
                                "data": {
                                    "type": "string",
                                    "defaultValue": '{"temperature": 12.3}'
                                },
                            }
                        },
                ]
        }
    }

    jsonExtract({name,data}) {
        var parsed = JSON.parse(data)
        if (name in parsed) {
            var out = parsed[name]
            var t = typeof(out)
            if (t == "string" || t == "number")
                return out
            if (t == "boolean")
                return t ? 1 : 0
            return JSON.stringify(out)
        }
        else {
            return ""
        }
    }
    fetchURL({url}) {
        return fetch(url).then(response => response.text())
    }
}

Scratch.extensions.register(new FetchExtension())
