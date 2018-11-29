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

        let vw: string = + toFixed((rpxValue / 750 * 100), this.config.toFixedNum) + 'vw';
        return {
            rpx: text,
            rpxValue: rpxValue,
            vw: vw
        }
    }
}

function toFixed(number: number, precision: number) {
  let multiplier = Math.pow(10, precision + 1),
  wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}