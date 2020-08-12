# math-currency
一个用于金额计算的JS库



```
// 转换货币格式(支持超大金额)   
const amount1 = 111111.2233;    
const toAmount1 = CurrencyUtil.to(amount1, 1, 'round', 0)   
// 转换前：111111.2233   转换后：111,111.2
```



```
// 从格式化的货币金额转换成普通格式.   
const amount2 = '111,111.2233';    
const toAmount2 = CurrencyUtil.from(amount2)
// 转换前：111,111.2233   转换后：111111.2233
```


```
// 取整数部分
const amount3 = '111111.2233';    
const toAmount3 = CurrencyUtil.trunc(amount3)
// 转换前：111111.2233   转换后：111111
```



```
// 获取根单位，如：万，千万，万亿等
const amount4 = 111111.2233;
const toAmount4 = CurrencyUtil.unit(amount4)
// 转换前：111111.2233   转换后：十万
```



```
// 将金额转换成中文大写
const amount5 = 111111.2233;
const toAmount5 = CurrencyUtil.cny(amount5)
// 转换前：111111.2233   转换后：壹拾壹万壹仟壹佰壹拾壹元贰角贰分叁厘叁毫
```



```
// fen to yuan
const amount6 = 111111.2233;
const toAmount6 = CurrencyUtil.fen2yuan(amount6)
// 转换前：111111.2233   转换后：1,111.11
```



```
// yuan to fen
const amount7 = 111111.2233;
const toAmount7 = CurrencyUtil.yuan2fen(amount7)
// 转换前：111111.2233  转换后：11,111,122
```


