class DeEvent {
    constructor(name, data) {
        name = 'dungeco.' + name;
        console.log("Firing: " + name, data);
        window.dispatchEvent(new CustomEvent(name, {
            'detail': data
        }));
        localStorage.setItem('DungeonEcologyRun', run.serialize());
    }
}

class DeException {
    constructor(message) {
        this.message = message;
    }
}

function database(section, item) {
    if (typeof DungeonEcologyDatabase[section][item] == 'undefined') {
        new DeException("Unexistent key '" + item + "' in container '" + section + "'");
    }
    return DungeonEcologyDatabase[section][item];
}

class Serializable {
    serialize() {
        var obj = "{\"_DeClass\": " + JSON.stringify(this.constructor.name);
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                obj += ",\"" + property + "\": ";
                switch (true) {
                    case (this[property] instanceof Serializable):
                        obj += this[property].serialize();
                        break;
                    case (this[property] instanceof Array):
                        obj += "{\"_DeArray\": [";
                        var first = true;
                        this[property].forEach(function(value) {
                            if (first) {
                                first = false;
                            } else {
                                obj += ",";
                            }
                            if (value instanceof Serializable) {
                                obj += value.serialize();
                            } else {
                                obj += JSON.stringify(value);
                            }
                        });
                        obj += "]}";
                        break;
                    default:
                        obj += JSON.stringify(this[property]);
                        break;
                }
            }
        }
        obj += "}";
        return obj;
    }
}

function unserialize(jsonString) {
    this.parser = function parser(rough) {
        switch (true) {
            case (!(rough instanceof Object)):
                return rough;
            case (typeof rough._DeClass !== 'undefined'):
                var parsed = eval('new ' + rough._DeClass + '();');
                for (var property in rough) {
                    if (property !== '_DeClass' &&
                        rough.hasOwnProperty(property) &&
                        parsed.hasOwnProperty(property)) {
                        parsed[property] = this.parser(rough[property]);
                    }
                }
                return parsed;
            case (typeof rough._DeArray !== 'undefined'):
                parsed = [];
                rough._DeArray.forEach(function(value) {
                    parsed.push(this.parser(value));
                })
                return parsed;
        }
        return rough;
    };

    return this.parser(JSON.parse(jsonString));
}
