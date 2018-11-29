"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Process {
    constructor(config) {
        this.config = config;
        this.regRpx = /([-]?[\d.]+)rp(x)?/;
        this.regRpxAll = /([-]?[\d.]+)rpx/g;
    }
    convert(text) {
        let match = text.match(this.regRpx);
        if (!match)
            return '';
        return this.rpx2vw(match[1]);
    }
    convertAll(text) {
        if (!text)
            return text;
        return text.replace(this.regRpxAll, (word) => {
            const res = this.rpx2vw(word);
            if (res)
                return res.vw;
            return word;
        });
    }
    rpx2vw(text) {
        const rpxValue = parseFloat(text);
        let vw = +toFixed((rpxValue / 750 * 100), this.config.toFixedNum) + 'vw';
        return {
            rpx: text,
            rpxValue: rpxValue,
            vw: vw
        };
    }
}
exports.default = Process;
function toFixed(number, precision) {
    let multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
}
//# sourceMappingURL=process.js.map