"use strict";

///////////////指向標籤/////////////////
var heightInfo = document.querySelector('.heightInfo'); //輸入身高值

var weightInfo = document.querySelector('.weightInfo'); //輸入體重值

var getResult = document.querySelector('.getResult'); //看結果按鈕

var removeBtn = document.querySelector('.remove'); //垃圾桶按鈕

var showResult = document.querySelector('.showResult'); //顯示BMI計算結果區域

var record = document.querySelector(".record"); //資料的位置

var warning = document.querySelector(".warning"); //錯誤時的警告內容

var cleanAllBtn = document.querySelector(".cleanAll"); //刪除全部按鈕
//取出application上的資料傳回到頁面上，否則空集

var data = JSON.parse(localStorage.getItem('data')) || []; //頁面開啟時更新

upallData(data); ///////////////監聽動作/////////////////
//監聽點擊『看結果』按鈕

getResult.addEventListener('click', function () {
  var heightNum = Number(heightInfo.value);
  var weightNum = Number(weightInfo.value);

  if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0 || heightNum >= 1000 || weightNum >= 1000) {
    alert('請輸入數字且最大不超過999');
    warning.style.display = "flex";
  } else {
    cheakBMI(); //跳成showResult 隱藏自己

    changeDisplay();
    showResultinner(data);
    warning.style.display = "none";
  }
}, false); //監聽點擊『垃圾桶』按鈕--並執行刪除

record.addEventListener('click', function remove(e) {
  if (e.target.nodeName !== "I") {
    return;
  }

  ;

  if (confirm('確定要刪除這筆紀錄嗎？')) {
    var num = e.target.dataset.num;
    data.splice(num, 1);
    localStorage.setItem('data', JSON.stringify(data));
    upallData(data);
  }
}, false); //監聽點擊『loop』按鈕--跳回看結果按鈕

showResult.addEventListener('click', changeBack, false);
cleanAllBtn.addEventListener('click', cleanAll, false); ////////////////////////////////////////
///////////////各種行為/////////////////
//取得日期

function getDate() {
  var today = new Date();
  var day = '';
  var month = '';

  if (today.getDate() < 10) {
    day = "0" + today.getDate();
  } else {
    day = today.getDate();
  }

  if (today.getMonth() + 1 < 10) {
    month = "0" + (today.getMonth() + 1);
  } else {
    month = today.getMonth() + 1;
  }

  var year = today.getFullYear();
  var nowDate = day + '-' + month + '-' + year;
  return nowDate;
} // 抓輸入的值計算並傳到後台


function cheakBMI() {
  var weight = weightInfo.value;
  var height = heightInfo.value;
  var BMINumAll = weight / (height / 100 * (height / 100));
  var BMINum = BMINumAll.toFixed(2);
  var BMILevel = '';
  var BMILevelColor = '';

  switch (true) {
    case BMINum < 18.5:
      BMILevel = "過輕";
      BMILevelColor = "#86D73F";
      break;

    case 18.5 <= BMINum && BMINum < 24:
      BMILevel = "理想";
      BMILevelColor = "#31BAF9";
      break;

    case 24 <= BMINum && BMINum < 27:
      BMILevel = "過重";
      BMILevelColor = "#FF982D";
      break;

    case 27 <= BMINum && BMINum < 30:
      BMILevel = "輕度肥胖";
      BMILevelColor = "#FF6C03";
      break;

    case 30 <= BMINum && BMINum < 35:
      BMILevel = "中度肥胖";
      BMILevelColor = "#FF6C03";
      break;

    case BMINum >= 35:
      BMILevel = "重度肥胖";
      BMILevelColor = "#FF1200";
      break;

    default:
      console.log("不正常");
      break;
  }

  ;
  var newData = {
    BMILevelColor: BMILevelColor,
    BMILevel: BMILevel,
    BMI: BMINum,
    weight: weight,
    height: height,
    date: getDate()
  };
  data.push(newData);
  localStorage.setItem('data', JSON.stringify(data));
  upallData(data);
} //更新資料到頁面上


function upallData(items) {
  var str = "";
  var len = items.length;

  for (var i = 0; len > i; i++) {
    str += '<div class="recordText" style="border-left: 5px solid ' + items[i].BMILevelColor + ';"><span class="recordLevel">' + items[i].BMILevel + '</span><div class="recordTextTitle">BMI <span class="recordBMI">' + items[i].BMI + '</span></div><div class="recordTextTitle">weight <span class="recordWeight">' + items[i].weight + 'kg</span></div><div class="recordTextTitle">height<span class="recordHeight">' + items[i].height + 'cm</span></div><div class="recordDate">' + items[i].date + '</div><i class="material-icons remove" data-num=' + i + '>delete</i></div>';
  }

  record.innerHTML = str; //增加判斷是否有資料來決定刪除全部的按鈕出現與否

  if (str == "") {
    cleanAllBtn.style.display = "none";
  } else {
    cleanAllBtn.style.display = "flex";
  }
} //切換到BMI計算結果-改變style的display，並做計算和修改showResult內容


function changeDisplay() {
  getResult.style.display = "none";
  showResult.style.display = "flex";
} //點擊看結果按鈕後，依結果將內容塞入跳轉後的showResult


function showResultinner(items) {
  var str = '<p><span class="result-BMINum">' + items[0].BMI + '</span><br>BMI</p><i class="material-icons backBtn">loop</i><span  class="resultText">' + items[0].BMILevel + '</span>';
  showResult.innerHTML = str;
  document.documentElement.style.setProperty('--change-color', items[0].BMILevelColor);
} //切回『看結果』按鈕


function changeBack(e) {
  if (e.target.nodeName !== "I") {
    return;
  }

  ;
  getResult.style.display = "block";
  showResult.style.display = "none";
  heightInfo.value = "";
  weightInfo.value = "";
} // //刪除全部


function cleanAll() {
  if (confirm('確定要刪除全部紀錄嗎？')) {
    localStorage.clear('data');
    data = [];
    upallData(data);
  }
}