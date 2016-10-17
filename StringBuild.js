"use strict"
module.exports = class StringBuild {
constructor(string) {
    this.d = [];
    if (string) this.d.push(string)
}
        append(text) {
            this.d.push(text)
            
        }
        toString() {
            return this.d.join("")
            
        }
        }
