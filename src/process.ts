export default class Process {
    constructor(private config: any) { }
    private regRpx: RegExp = /([-]?[\d.]+)rp(x)?/;
    private regRpxAll: RegExp = /([-]?[\d.]+)rpx/g;

    convert(text: string) {
        let match = text.match(this.regRpx)
        if (!match) return '';
        return this.rpx2vw(match[1]);
    }

    convertAll(text: string): string {
        if (!text) return text;
        return text.replace(this.regRpxAll, (word: string) => {
            const res = this.rpx2vw(word);
            if (res) return res.vw;
            return word;
        });
    }

    private rpx2vw(text: string) {
        const rpxValue = parseFloat(text);

        let vw: string = +(rpxValue / 750 * 100).toFixed(this.config.toFixedNum) + 'vw';
        return {
            rpx: text,
            rpxValue: rpxValue,
            vw: vw
        }
    }
}

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