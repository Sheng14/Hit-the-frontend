/**
 * @description 简易手写千分位
 * @author Sheng14
 */

function thousandth(str) {
 /* let res = []; 用数组来写其实就很蠢，因为合并成字符串的话每一个数都会保留一个，
  for(let i = str.length - 1; i >= 0; i--) {
    if ((str.length  -1 - i) % 3 === 0 && i !== 0) {
      console.log(i);
      res.unshift(',');
    }
    res.unshift(str[i]);
  }
  return res.join();*/
  let res = ''; // 直接改用字符串相加
  for(let i = str.length - 1; i >= 0; i--) {
    if ((str.length  -1 - i) % 3 === 0 && i !== str.length - 1) { // 注意考虑到相加后的字符串长度不稳定，改用源字符串判定逗号应该存在的位置且最后一个无逗号！
      res = ',' + res;
    }
    res = str[i] + res;
  }
  return res;
}
console.log(thousandth('123456789'));