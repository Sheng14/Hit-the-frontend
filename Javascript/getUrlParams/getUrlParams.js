/**
 * @description 分析url标签获得其键值对形式的信息
 * @author 参考：https://zhuanlan.zhihu.com/p/72581171
 */


function getUrlParams(name) { // 不传name就返回整个解析完的数组，传就返回对应的值
    let url = window.location.search; // 拿到要解析的url
    if (url.indexOf('?') === 1) { return false; } // 处理url有多个？的情况，一般可以不管
    url = url.substr(1); // 把？给截掉剩下的就都是&隔开的=表示的键值对
    url = url.split('&');
    let result = '';
    for(let i = 0; i < url.length; i++) { // 将url变成对象数组，每个数组元素就是一个包含键值对的对象
        let info = url[i].split('=');
        let obj = {};
        obj[info[0]] = decodeURI(info[1]);
        url[i] = obj;
    }
    if (name) { // 找属于name的值
        for(let i = 0; i < url.length; i++) {
            for(const key in url[i]) {
                if (key == name) result = url[i][key];
            }
        }
    } else {
        result = url;
    }
    return result;
}

// --------------------- 测试结果 ---------------------------
/*
(13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {query: "JS分析url参数方法"}
1: {_ast: "1630720741"}
2: {_asf: "www.sogou.com"}
3: {w: "01029901"}
4: {hdq: "sogou-addr-cc9657884708170e"}
5: {duppid: "1"}
6: {cid: ""}
7: {s_from: "result_up"}
8: {sut: "1620"}
9: {sst0: "1630720748009"}
10: {lkt: "0%2C0%2C0"}
11: {sugsuv: "1598697381814232"}
12: {sugtime: "1630720748009"}
length: 13__proto__: Array(0)
*/