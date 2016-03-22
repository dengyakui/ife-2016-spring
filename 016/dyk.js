/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    var value = document.getElementById("aqi-value-input").value;
    if (!city || !value) {
        return false;
    }
    //去空格处理
    if (city.trim) {
        city = city.trim();
        value = value.trim();
    }
    else {
        city = city.replace(/^\s*/, "").replace(/\s*$/g, "");
        value = value.replace(/^\s*/, "").replace(/\s*$/g, "");
    }

    //验证city是否为中英文
    var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/
    if (!reg.test(city)) {
        alert("城市名只能包含中文和英文字母")
        return false;
    }
    if (!(city in aqiData)) {
        aqiData[city] = value;
    }

    //判断value是否为整数
    if (!/^\d+$/.test(value) || isNaN(value) || !isFinite(value)) {
        alert("数值必须为整数");
        return false;
    }
    
    return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    // clear内容
    table.innerHTML = "";
    var str = "";

    // 生成表头
    if (aqiData.length > 0) {
        table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    }

    //生成数据
    for (var key in aqiData) {
        str += "<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button data-city='" + key + "'>删除</button></td></tr>";
    }

    // 将内容填充到table
    table.innerHTML += str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {

    if (addAqiData()) {
        renderAqiList();
    }

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // 获取事件对象及事件源对象
    var event = e || window.event;
    var srcElement = event.srcElement || event.target;

    // 判断如果点击的是删除按钮，则执行删除操作
    if (srcElement.nodeType > 0 && srcElement.nodeName === "BUTTON" && srcElement.innerText === "删除") {
        var city = srcElement.getAttribute("data-city");
        if (city in aqiData) {
            delete aqiData[city];
        }
    }

    // 重新渲染表格
    renderAqiList();
}

function init() {

    // 给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle);

    // 给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", delBtnHandle);
}

init();