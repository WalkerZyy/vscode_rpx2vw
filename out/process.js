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
        let vw = +(rpxValue / 750 * 100).toFixed(this.config.toFixedNum) + 'vw';
        return {
            rpx: text,
            rpxValue: rpxValue,
            vw: vw
        };
    }
}
exports.default = Process;
// module.exports = function() {
//     this.regRpxAll = /([-]?[\d.]+)rpx/g;
//     let _this = this;
//     this.convertAll = function(text) {
//         if (!text) return text;
//         return text.replace(_this.regRpxAll, (word) => {
//             const res = _this.rpx2vw(word);
//             if (res) return res.vw;
//             return word;
//         });
//     }
//     this.rpx2vw = function(text) {
//         const rpxValue = parseFloat(text);
//         let vw = +(rpxValue / 750 * 100).toFixed(2) + 'vw';
//         return {
//             rpx: text,
//             rpxValue: pxValue,
//             vw: vw
//         }
//     }
// }
//# sourceMappingURL=process.js.map