'use strict';

const _public = {
	/**
     * 替换所有匹配的字符/字符串
     * @param String instr 输入的字符串
     * @param String regexp 需要替换的字符/字符串
     * @param String replacement 替换的字符/字符串
     * @return String 替换后的字符串
     */
    replaceAll: function(instr, regexp, replacement){
        let pattern = new RegExp(regexp, "gm");
        let tmp = instr.replace(pattern, replacement);
        pattern = null;
        return tmp;
    },
    /**
     * 替换第一次匹配的字符/字符串
     * @param String instr 输入的字符串
     * @param String regexp 需要替换的字符/字符串
     * @param String replacement 替换的字符/字符串
     * @return String 替换后的字符串
     */
    replaceFirst: function(instr, regexp, replacement){
        let group = new RegExp("("+ regexp + ")", "gm").exec(instr);
        let tmp = instr;
        if (null !== group){
            tmp = instr.substring(0, group.index)
                .concat(replacement)
                .concat(instr.substring(group.index+group[1].length));
        }
        group = null;
        return tmp;
    },
    /**
     * 匹配字符串是否以prefix开头
     * @param String instr 输入的字符串
     * @param String prefix 前缀
     * @param Number offset 起始的偏移位置
     * @return Boolean true/false
     */
    startsWith: function(instr, prefix, offset){
        offset = typeof(offset) == "number" ? offset : 0;
        if (instr.length >= (prefix.length + offset)){
            return (instr.substr(offset, prefix.length) == prefix);
        }else{
            return false;
        }
    },
    /**
     * 匹配字符串是否以suffix结尾
     * @param String instr 输入的字符串
     * @param String suffix
     * @return Boolean true/false
     */
    endsWith: function(instr, suffix){
        if (instr.length >= suffix.length){
            return (instr.substr((instr.length - suffix.length), suffix.length) == suffix);
        }else{
            return false;
        }
    },
     /**
     * 去两端空字符
     * @param String instr 输入的字符串
     * @return String 去空后的字符串
     */
    trim: function(instr){
        let pattern = /^([\s ]+)|([\s ]+)$/gmi;
        let tmp = instr.replace(pattern, "");
        pattern = null;
        return tmp;
    },
    /**
     * 去左空字符
     * @param String instr 输入的字符串
     * @return String 去空后的字符串
     */
    trimLeft: function(instr){
        let pattern = /^[\s ]+/gmi;
        let tmp = instr.replace(pattern, "");
        pattern = null;
        return tmp;
    },
    /**
     * 去右空字符
     * @param String instr 输入的字符串
     * @return String 去空后的字符串
     */
    trimRight: function(instr){
        let pattern = /[\s ]+$/gmi;
        let tmp = instr.replace(pattern, "");
        pattern = null;
        return tmp;
    },
    /**
     * 字符串长度，将中文看成两个字符计算
     * @param String instr 输入的字符串
     * @return Number 字符串长度
     */
    length: function(instr){
        return instr.replace(/[^\u0000-\u00FF]/gmi, "**").length;
    },
    /**
     * 前导填充
     * @param String instr 输入的字符串
     * @param String chr 填充的字符
     * @param Number bit 位数
     * @return String 填充后的字符串
     */
    fillBefore: function(instr, chr, bit){
        let len = instr.length;
        let shift = bit - len + 1;
        let str = instr;
        if(shift > 0){
            let a = new Array(shift);
            str = a.join(chr) + str;
            a = null;
        }
        return str;
    },
    /**
     * 向后填充
     * @param String instr 输入的字符串
     * @param String chr 填充的字符
     * @param Number bit 位数
     * @return String 填充后的字符串
     */
    fillAfter: function(instr, chr, bit){
        let len = instr.length;
        let shift = bit - len + 1;
        let str = instr;
        if(shift > 0){
            let a = new Array(shift);
            str = str + a.join(chr);
            a = null;
        }
        return str;
    },
    /**
     * 千分位格式化
     * @param String currency 货币金额
     * @param Boolean trimTailZero 是否过滤小数位后的未尾0
     * @return String 转换后的货币
     */
    formatMaskCurrency: function(currency, trimTailZero){
        if(null == currency){
            return "??";
        }
        let dotIndex = -1;
        let hasDot = -1 != (dotIndex = currency.indexOf("."));
        let prefix = hasDot ? currency.substring(0, dotIndex) : currency;
        let suffix = hasDot ? currency.substring(dotIndex) : "";

        if(suffix.length > 0 && true == trimTailZero){
            suffix = suffix.replace(/0+$/g, "");
            if("." == suffix){
                suffix = "";
            }
        }

        let formatCurrent = prefix.replace(/([a-zA-Z\d\?\*])(?=(?:[a-zA-Z\d\?\*]{3})+$)/g, "$1,") + suffix;

        return formatCurrent;
    },
    /**
     * 转换成货币格式(支持超大金额)
     * @param String amount 输入的字符串
     * @param int digit 小数位数
     * @param Boolean round  小数处理，true: 4舍5入 false: 丢弃
     * @param Boolean trimTailZero 是否过滤小数位后的未尾0
     * @return String 转换后的货币
     */
    toCurrency: function(amount, digit, round, trimTailZero){
        amount = amount + "";

        if(!isNaN(Number(amount))){
            let str = amount;
            let hasDot = str.indexOf(".") !== -1;
            let group = str.split(".");
            let prefix = group[0];
            let suffix = group[1] || "";
            let len = suffix.length;

            // 小数位位数处理
            digit = Number(digit);
            // 非数字时，判断分割出来的suffix长度，最大取2位，最小0位
            // 否则取设置的长度，最大为6位
            digit = isNaN(digit) ? Math.min(len, 2) : Math.min(digit, 6);

            // 如果没有小数位，但是设置的小数位大于0时，进行0补位
            if(!suffix && digit > 0){
                suffix = new Array(digit + 1).join("0");
            }

            // 如果小数位的位数小于设置的保留位，那么进行0补位
            if (suffix.length < digit) {
                suffix += (new Array(digit + 1 - suffix.length).join("0"));
            }

            len = suffix.length;

            // 丢弃指定小数位后的数值，截取小数位后直接返回
            if (false === round) {
                suffix = suffix.substring(0, digit);

                return this.formatMaskCurrency(suffix ? prefix + "." + suffix : prefix, true === trimTailZero);
            }

            // 如果小数位等于小数保留位，那么直接返回
            if (suffix.length === digit) {
                return this.formatMaskCurrency(suffix ? prefix + "." + suffix : prefix, true === trimTailZero);
            }

            let last = parseInt(suffix.substring(digit, digit + 1), 10);

            suffix = suffix.substring(0, digit);

            // 如果保留小数位后一位的数字小于5，那么直接返回
            if (last < 5) {
                return this.formatMaskCurrency(suffix ? prefix + "." + suffix : prefix, true === trimTailZero);
            }

            let a = [];
            let n = 0;
            let p = 1;

            // 小数进位处理
            for(let i = suffix.length - 1; i >= 0; i--){
                n = parseInt(suffix.charAt(i), 10) + p;

                if(n === 10){
                    p = 1;
                    a.unshift('0');
                }else{
                    p = 0;
                    a.unshift('' + n);
                }
            }

            suffix = [...a].join("");

            //整数部分进位处理
            if(p === 1){
                a = [];
                for(let j = prefix.length - 1; j >= 0; j--){
                    n = parseInt(prefix.charAt(j), 10) + p;
                    console.log(n, true)

                    if(n === 10){
                        p = 1;
                        a.unshift('0');
                    }else{
                        p = 0;
                        a.unshift('' + n);
                    }
                }

                if (p === 1) {
                    a.unshift("1");
                }

                prefix = a.join("");
            }

            return this.formatMaskCurrency(suffix ? prefix + "." + suffix : prefix, true === trimTailZero);
        }

        return this.formatMaskCurrency(amount, true === trimTailZero);
    },
    /**
     * 将字符串转换成十六进制
     * @param String str 原串
     * @return String hex
     */
    string2hex: function(str){
        let len = str.length;
        let hex = '';
        let code = 0;

        for(let i = 0; i < len; i++){
            code = str.charCodeAt(i);

            if(code < 127){
                hex += "00" + code.toString(16);
            }else{
                hex += code.toString(16);
            }
        }

        return hex;
    },
    /**
     * 将十六进制转换成字符串
     * @param String hex 十六进制串
     * @return String str
     */
    hex2string: function(hex){
        let len = hex.length;
        let str = "";
        let code = 0;

        for(let i = 0; i < len; i += 4){
            code = parseInt(hex.substr(i, 4), 16);
            str += String.fromCharCode(code);
        }

        return str;
    }
}

export default _public;
