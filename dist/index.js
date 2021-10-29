"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = void 0;
function createTheme(name, type) {
    let theme = {
        name,
        type: type || null,
        colors: {},
        set(key, value) {
            if (typeof value === 'string')
                this.colors[key] = value;
            if (typeof key === 'string' && typeof value === 'object' && value.colors)
                this.colors[key] = value.colors[key];
            return this;
        },
        has(key) {
            return this.colors[key] !== undefined;
        },
        get(key, value) {
            if (this.has(key))
                return this.colors[key];
            if (typeof value === 'object')
                return value.get(key);
            if (typeof value === 'string')
                return value;
            return null;
        },
        extend(value, overwrite = false) {
            let colors = value.colors;
            for (let [key, val] of Object.entries(colors)) {
                if (!this.has(key) || overwrite)
                    this.set(key, val);
            }
            return this;
        },
        toString() {
            return JSON.stringify(this);
        }
    };
    return theme;
}
exports.createTheme = createTheme;
