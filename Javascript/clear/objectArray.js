/**
 * @description 对象数组去重
 */

// 针对对象某一属性（这里是id）进行去重
let obj = [
    {id: 1, name: 'hanke1'},
    {id: 2, name: 'hanke2'},
    {id: 3, name: 'hanke3'},
    {id: 1, name: 'hanke4'},
    {id: 3, name: 'hanke5'},
    {id: 4, name: 'hanke6'}
]
let result = {}; // 类似map的作用来暂存目前遇到的id值，后续对象元素的id如果已经在result有了就不添加到结果中
obj = obj.reduce((item, next) => { // item就是一开始传入的[]，当然后续就是被修改后返回的item，next是当前值
    result[next.id] ? '' : result[next.id] = true && item.push(next); // map已经有这个id就不操作，没有就标记为true添加到map，并且把对象放入item作为下一个的初始值
    return item;
}, []);
console.log(obj);


// 针对对象多个属性（这里是id和name）进行去重
let obj = [
    {id: 1, name: 'hanke1'},
    {id: 2, name: 'hanke1'},
    {id: 3, name: 'hanke3'},
    {id: 1, name: 'hanke4'},
    {id: 3, name: 'hanke5'},
    {id: 4, name: 'hanke6'}
]
let result1 = {};
let result2 = {};
obj = obj.reduce((item, next) => {
    if (!result1[next.id] && !result2[next.name]) {
        result1[next.id] = true;
        result2[next.name] = true;
        item.push(next);
    }
    return item;
},[]);
console.log(obj);