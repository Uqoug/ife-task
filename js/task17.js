/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
function chartdata(x,y){
  var data = new Array();
  for(var i=0;i<91;i++){
    data.push([x[i],y[i]]);
  }
  return data;
}
var beijing = chartdata(Object.getOwnPropertyNames(aqiSourceData.北京),Object.values(aqiSourceData.北京));
var shanghai = chartdata(Object.getOwnPropertyNames(aqiSourceData.上海),Object.values(aqiSourceData.上海));
var guangzhou = chartdata(Object.getOwnPropertyNames(aqiSourceData.广州),Object.values(aqiSourceData.广州));
var shenzhen = chartdata(Object.getOwnPropertyNames(aqiSourceData.深圳),Object.values(aqiSourceData.深圳));
var chengdu = chartdata(Object.getOwnPropertyNames(aqiSourceData.成都),Object.values(aqiSourceData.成都));
var xian = chartdata(Object.getOwnPropertyNames(aqiSourceData.西安),Object.values(aqiSourceData.西安));
var fuzhou = chartdata(Object.getOwnPropertyNames(aqiSourceData.福州),Object.values(aqiSourceData.福州));
var xiamen = chartdata(Object.getOwnPropertyNames(aqiSourceData.厦门),Object.values(aqiSourceData.厦门));
var shenyang = chartdata(Object.getOwnPropertyNames(aqiSourceData.沈阳),Object.values(aqiSourceData.沈阳));
var chartData = {beijing,shanghai,guangzhou,shenzhen,chengdu,xian,fuzhou,xiamen,shenyang};
console.log(chartData);


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 'beijing',
  nowGraTime: "day"
}


/**
 * 渲染图表
 */
function renderChart(arr) {
  for(var i=0;i<arr.length;i++){
    var div = document.createElement('div');
    div.style.height = arr[i][1]+'px';
    switch(true){
      case arr[i][1]>0 && arr[i][1]<=100: div.style.backgroundColor = '#6c7cbb';break;
      case arr[i][1]>100 && arr[i][1]<=200: div.style.backgroundColor = '#8c9ed5';break;
      case arr[i][1]>200 && arr[i][1]<=300: div.style.backgroundColor = '#ded8ec';break;
      case arr[i][1]>300 && arr[i][1]<=400: div.style.backgroundColor = '#766b76';break;
      case arr[i][1]>400 && arr[i][1]<=500: div.style.backgroundColor = '#362c34';break;
      default: console.log(arr[i][1]);
    }
    var li = document.createElement('li');
    li.appendChild(div);
    document.getElementsByClassName('aqi-chart-wrap')[0].getElementsByTagName('ul')[0].appendChild(li);
    }
}
renderChart(beijing);
changeClassname();
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(){
  console.log(this);
  pageState.nowGraTime = this.getAttribute('value');
  console.log(pageState.nowGraTime);
  var handleArr = datahandle();
  document.getElementsByClassName('aqi-chart-wrap')[0].getElementsByTagName('ul')[0].innerHTML = '';
  renderChart(handleArr);
  changeClassname();
  console.log(document.getElementsByClassName('aqi-chart-wrap')[0])
}
for(var i=0;i<3;i++){
  document.getElementById('form-gra-time').getElementsByTagName('input')[i].onclick = graTimeChange;
}
function datahandle(){
  if(pageState.nowGraTime === 'day'){
    var x = pageState.nowSelectCity;
    console.log(chartData[x]);
    return chartData[x];
  }
  else if(pageState.nowGraTime === 'week'){
    var x = pageState.nowSelectCity;
    var Arr = chartData[x];
    var weekArr = new Array();
    for(var i=0;i<13;i++){
      var aqi = Math.ceil((Arr[i*7+0][1]+Arr[i*7+1][1]+Arr[i*7+2][1]+Arr[i*7+3][1]+Arr[i*7+4][1]+Arr[i*7+5][1]+Arr[i*7+6][1])/7);
      weekArr.push(['week'+(i+1),aqi]);
    }
    console.log(weekArr);
    return weekArr;
  }
  else if(pageState.nowGraTime === 'month'){
    console.log(213);
    var x = pageState.nowSelectCity;
    var arr = chartData[x];
    var monthArr = new Array();
    var aqi1,aqi2,aqi3
    var num1=0;
    var num2=0;
    var num3=0;
    for(var i=0;i<31;i++){
      num1=num1+arr[i][1];
      num3=num3+arr[i+60][1];
    }
    for(var i=0;i<29;i++){
      num2=num2+arr[i+31][1];
    }
    aqi1=Math.ceil(num1/31);
    aqi2=Math.ceil(aqi2=num2/29);
    aqi3=Math.ceil(aqi3=num3/31);
    monthArr.push(['month1',aqi1],['month2',aqi2],['month3',aqi3]);
    return monthArr;
  }
}
function changeClassname(){
  if(pageState.nowGraTime === 'day'){
    for(var i=0;i<document.getElementsByClassName('excel')[0].getElementsByTagName('li').length;i++){
    document.getElementsByClassName('excel')[0].getElementsByTagName('li')[i].className = 'day';
    }
  }
  else if(pageState.nowGraTime === 'week'){
    for(var i=0;i<document.getElementsByClassName('excel')[0].getElementsByTagName('li').length;i++){
    document.getElementsByClassName('excel')[0].getElementsByTagName('li')[i].className = 'week';
    }
  }
  else if(pageState.nowGraTime === 'month'){
    for(var i=0;i<document.getElementsByClassName('excel')[0].getElementsByTagName('li').length;i++){
    document.getElementsByClassName('excel')[0].getElementsByTagName('li')[i].className = 'month';
    }
  }
}
/**
 * select发生变化时的处理函数
 */
function graCityChange(){
  citySelectChange();
  var handleArr = datahandle();
  document.getElementsByClassName('aqi-chart-wrap')[0].getElementsByTagName('ul')[0].innerHTML = '';
  renderChart(handleArr);
  changeClassname();
  console.log(document.getElementsByClassName('aqi-chart-wrap')[0]);
}
function citySelectChange(){
  // 确定是否选项发生了变化 
  switch(document.getElementById('city-select').value){
    case 'beijing':
      pageState.nowSelectCity = 'beijing';
      break;
    case 'shanghai':
      pageState.nowSelectCity = 'shanghai';
      break;
    case 'guangzhou':
      pageState.nowSelectCity = 'guangzhou';
      break;
    case 'shenzhen':
      pageState.nowSelectCity = 'shenzhen';
      break;
    case 'chengdu':
      pageState.nowSelectCity = 'chengdu';
      break;
    case 'xian':
      pageState.nowSelectCity = 'xian';
      break;
    case 'fuzhou':
      pageState.nowSelectCity = 'fuzhou';
      break;
    case 'xiamen':
      pageState.nowSelectCity = 'xiamen';
      break;
    case 'shenyang':
      pageState.nowSelectCity = 'shenyang';
      break;
    default:
      console.log(document.getElementById('city-select').value);
  }
  // 设置对应数据
 console.log(pageState.nowSelectCity);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
