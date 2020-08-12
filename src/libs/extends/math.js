'use strict';

const _public = {
    /**
     * 相乘
     * @param  {[type]} num1    [description]
     * @param  {[type]} num2    [description]
     * @return {[type]}         [description]
     */
    mul: function(num1, num2){
        let s1 = "" + num1;
        let s2 = "" + num2;

        let decimal1 = s1.replace(/^[^\.]+\.?/, "");
        let decimal2 = s2.replace(/^[^\.]+\.?/, "");

        let decimalLength = decimal1.length + decimal2.length;

        let val = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, decimalLength);

        return val;
    },
    /**
     * 相除
     * @param  {[type]} num1    [description]
     * @param  {[type]} num2    [description]
     * @return {[type]}         [description]
     */
    div: function(num1, num2){
        let val = num1 / num2;

        return val;
    }
};

export default _public;