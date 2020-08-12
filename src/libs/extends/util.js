'use strict';

const _public = {
    /**
     * 位校验
     * @param int fixedValue 固定的源值
     * @param int inValue 传入的值
     * @return Boolean
     * @example Util.bitCheck(7, 2) => true
     *          Util.bitCheck(7, 8) => false
     */
    bitCheck: function(fixedValue, inValue){
        return (!!(fixedValue & inValue) && inValue > 0)
    },
    /**
     * 格式化模板数据
     * @param String tpl 模板数据
     * @param Object metaData 元数据
     * @param String preifx 模板数据前缀标识，默认为$
     * @return String str 格式化后的字符串
     */
    formatData: function(tplData, metaData, prefix){
        let str = "";
        let reg = null;
        let meta = null;

        prefix = (undefined === prefix ? "\\$" : (prefix ? "\\" + prefix : ""));
        prefix = prefix.replace(/\\\\/g, "\\");
        tplData = tplData || "";

        for(let key in metaData){
            if(metaData.hasOwnProperty(key)){
                meta = metaData[key];

                reg = new RegExp(prefix + "\\!?\\{" + key.replace(/\./g, "\\.") + "\\}", "gm");
                str = (tplData = tplData.replace(reg, meta));
                reg = null;
            }
        }

        str = str || tplData;

        // console.info("output: " + str);
        //----------------------------------
        reg = new RegExp(prefix + "\\!\\{[^\\{\\}]+\\}", "gm");
        str = str.replace(reg, "");
        reg = null;
        //----------------------------------
        return str;
    },
    /**
     * 格式化代码
     * @param String code 需要格式化的代码
     * @param String formatter 格式，如：4, 4-4-2, 3-3-8-4, 3-4-4
     *                         如果代码超过格式设置的值，那么后面的格式形式以最后一个格式方式为准
     *                         默认值为：4
     * @param String chr 格式间隔字符，默认为值为：英文空格字符
     * @return String code
     */
    formatCode: function(code, formatter, chr){
        let scode = (code || "") + "";
        let sformatter = formatter || "4";
        let schr = chr || " ";
        let len = scode.length;

        let __a = sformatter.split("-");
        let formatterArray = [];
        let formatterIndex = 0;
        let formatterValue = 0;
        let formatterLatestIndex = __a.length - 1;
        let tmp = null;
        let codeItems = [];

        for(let i = 0; i < __a.length; i++){
            formatterArray.push(Number(__a[i]));
        }

        do{
            formatterValue = formatterArray[formatterIndex];
            tmp = scode.substr(0, formatterValue);
            scode = scode.substring(formatterValue);
            len = scode.length;

            codeItems.push(tmp);

            ++formatterIndex;

            if(formatterIndex > formatterLatestIndex){
                formatterIndex = formatterLatestIndex;
            }
        }while(!!len);

        return codeItems.join(schr);
    },
    /**
     * 重置格式化代码
     * @param String code 已格式化的代码
     * @param String chr 格式间隔字符，默认为值为：英文空格字符
     * @return String code
     */
    revertCode: function(code, chr){
        let scode = (code || "") + "";
        let schr = chr || " ";

        return scode.replace(new RegExp("\\" + schr, "g"), "");
    }
};

export default _public;
