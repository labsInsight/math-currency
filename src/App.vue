<template>
  <div id="app">
    <h1>currency Demo</h1>
    <h2 v-for="(testData, index) in testArray" :key="index">
      <ul v-for="(item, itemIndex) in testData" :key="itemIndex">
        <li>{{item}}</li>
      </ul>
    </h2>
  </div>
</template>

<script>
import CurrencyUtil from "./libs/currency.js";

export default {
  name: 'app',
  data () {
    return {
      testArray: []
    }
  },
  created () {
    // 转换货币格式(支持超大金额)
    const amount1 = 111111.2233;
    const toAmount1 = CurrencyUtil.to(amount1, 1, 'round', 0)
    this.testArray.push(['转换货币格式(支持超大金额)：', `转换前：${amount1}`, `转换后：${toAmount1}`])
    // 转换前：111111.2233   转换后：111,111.2

    // 从格式化的货币金额转换成普通格式
    const amount2 = '111,111.2233';
    const toAmount2 = CurrencyUtil.from(amount2)
    this.testArray.push(['从格式化的货币金额转换成普通格式：', `转换前：${amount2}`, `转换后：${toAmount2}`])
    // 转换前：111,111.2233   转换后：111111.2233

    // 取整数部分
    const amount3 = '111111.2233';
    const toAmount3 = CurrencyUtil.trunc(amount3)
    this.testArray.push(['取整数部分：', `转换前：${amount3}`, `转换后：${toAmount3}`])
    // 转换前：111111.2233   转换后：111111

    // 获取根单位，如：万，千万，万亿等
    const amount4 = 111111.2233;
    const toAmount4 = CurrencyUtil.unit(amount4)
    this.testArray.push(['获取根单位，如：万，千万，万亿等：', `转换前：${amount4}`, `转换后：${toAmount4}`])
    // 转换前：111111.2233   转换后：十万

    // 将金额转换成中文大写
    const amount5 = 111111.2233;
    const toAmount5 = CurrencyUtil.cny(amount5)
    this.testArray.push(['将金额转换成中文大写：', `转换前：${amount5}`, `转换后：${toAmount5}`])
    // 转换前：111111.2233   转换后：壹拾壹万壹仟壹佰壹拾壹元贰角贰分叁厘叁毫

    // fen to yuan
    const amount6 = 111111.2233;
    const toAmount6 = CurrencyUtil.fen2yuan(amount6)
    this.testArray.push(['fen to yuan：', `转换前：${amount6}`, `转换后：${toAmount6}`])
    // 转换前：111111.2233   转换后：1,111.11

    // yuan to fen
    const amount7 = 111111.2233;
    const toAmount7 = CurrencyUtil.yuan2fen(amount7)
    this.testArray.push(['yuan to fen', `转换前：${amount7}`, `转换后：${toAmount7}`])
    // 转换前：111111.2233  转换后：11,111,122
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 60px;
}

h1 {
  font-weight: normal;
  font-size: 60px;
}

h2 {
  margin-top: 50px;
}

ul {
  list-style-type: none;
}

li {
  font-size: 20px;
  line-height: 25px;
}

</style>
