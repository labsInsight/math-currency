'use strict';

import StringUtil from "./extends/string.js";
import MathUtil from "./extends/math.js";
import Util from "./extends/util.js";

const Currency = {
    /**
     * 转换成货币格式(支持超大金额)
     * @param String amount 输入的字符串
     * @param int digit 小数位数
     * @param Boolean round  小数处理，true: 4舍5入 false: 丢弃
     * @param Boolean trimTailZero 是否过滤小数位后的未尾0
     * @return String 转换后的货币
     */
    to(amount, digit, round, trimTailZero){
        return StringUtil.toCurrency("" + amount, digit, round, trimTailZero);
    },
    /**
     * 从格式化的货币金额转换成普通格式
     * @param String currency
     * @return String amount
     */
    from(currency){
        return currency.replace(/,/g, "");
    },
    /**
     * 取整数部分
     * @param  {[type]} currency [description]
     * @return {[type]}          [description]
     */
    trunc(currency){
        return currency.replace(/\.[^\.]*$/, "");
    },
    /**
     * 获取根单位，如：万，千万，万亿等
     * @param String amount 金额
     * @param startPoint 起始位置
     * @param upperCase 是否为中文大写
     * @return String 单位
     */
    unit(amount, startPoint, upperCase){
        let value = "" + amount;
        let integer = "";
        let flag = "";

        amount = Number(value);
        startPoint = Number(startPoint);
        startPoint = isNaN(startPoint) ? 2 : startPoint;

        if(isNaN(amount)){
            return "";
        }
        
        const units = ["元", "十", "百", "千", "万", "十万", "百万", "千万", "亿", "十亿", "百亿", "千亿", "万亿", "十万亿", "百万亿", "千万亿", "万万亿"];
        const upUnits = ["圆", "拾", "佰", "仟", "万", "拾万", "佰万", "仟万", "亿", "拾亿", "佰亿", "仟亿", "万亿", "拾万亿", "佰万亿", "仟万亿", "万万亿"];

        const _units = true === upperCase ? upUnits : units;

        if(StringUtil.startsWith(value, "-") || StringUtil.startsWith(value, "+")){
            flag = ({"-": "负"})[value.charAt(0)] || "";
            value = value.substring(1);
        }

        let parts = value.split(".");

        integer = parts[0];

        let size = integer.length - 1;

        if(size < startPoint){
            return "";
        }
        if(size > _units.length - 1){
            return flag + _units[_units.length - 1];
        }

        return flag + _units[size];
    },
    /**
     * 将金额转换成中文大写
     * @param String amount 金额
     * @return String 转换后的金额
     */
    cny(amount){
        let value = "" + amount;
        let digit = "";
        let integer = "";
        let flag = "";

        amount = Number(value);

        if(isNaN(amount)){
            return "";
        }

        const digitUnits = ["角", "分", "厘", "毫"];
        const baseUnits  = ["仟", "佰", "拾", ""];
        const groupUnits = ["", "万", "亿", "万亿", "万万亿"];
        const nums       = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        const end        = "元";

        if(StringUtil.startsWith(value, "-") || StringUtil.startsWith(value, "+")){
            flag = ({"-": "负"})[value.charAt(0)] || "";
            value = value.substring(1);
        }

        let parts = value.split(".");

        integer = parts[0];
        digit = parts[1] || "";

        let format = Util.formatCode(integer.split("").reverse().join(""), "4");
        let group = format.split(" ");
        let buf = [];
        let zero = 0;

        digit.split("").forEach((n, i) => {
            n = Number(n);
            buf.push(nums[n]);
            buf.push(digitUnits[i]);            
        });

        if(!digit){
            buf.unshift("整");
        }

        buf.unshift(end);
        group.forEach((items, index) => {
            let ns = items.split("").reverse();

            let tmp = [];
            let diff = 4 - ns.length;
            zero = 0;
            ns.forEach((n, i) => {
                n = Number(n);

                if(n === 0){
                    zero++;
                }else{
                    if(zero > 0){
                        tmp.push(nums[0]);
                        zero = 0;
                    }

                    tmp.push(nums[n]);
                    tmp.push(baseUnits[i + diff]);                                    
                }
            }); 

            tmp.push(groupUnits[index]);
            if(zero > 0){
                tmp.push(nums[0]);
                zero = 0;
            }

            buf.unshift(tmp.join(""));
        });

        let str = buf.join("");

        str = str.replace("零元", "元");

        return str;
    },
    /**
     * [fen2yuan description]
     * @param  {[type]} amount [description]
     * @param  {[type]} round  [description]
     * @return {[type]}        [description]
     */
    fen2yuan(amount, round){
        let val = MathUtil.div(amount, 100);

        return this.to(val, 2, round || false);
    },
    /**
     * [yuan2fen description]
     * @param  {[type]} amount [description]
     * @param  {[type]} round  [description]
     * @return {[type]}        [description]
     */
    yuan2fen(amount, round){
        let val = MathUtil.mul(amount, 100);

        return this.to(val, 0, round || false);
    }
};

export default Currency;