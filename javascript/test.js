const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const calculation = document.querySelector('.calculation');
const result = document.querySelector('.result');
const resultBMI = document.querySelector('.result-number');
const resultText = document.querySelector('.result-text');
const reset = document.querySelector('.reset');
const record = document.querySelector('.record');
let title = '<h1>BMI 紀錄</h1>';
let outputResult = '';
let color = '';
let date = '';
let nowData = [];
let oldData = JSON.parse(localStorage.getItem('data'));
checkOldData(oldData);
getDate();

calculation.addEventListener('click',function(){
  if (isNaN(Number(height.value)) || isNaN(Number(weight.value)) || Number(height.value) <= 0 || Number(weight.value) <= 0) {
    alert('身高/體重 的數值不正確')
  } else {
    BMI(height.value,weight.value);
  }
  record.innerHTML = title;
  loadData();
});

reset.addEventListener('click',function() {
  calculation.style.opacity = '1';
  calculation.style.zIndex = '1';
  result.style.opacity = '0';
  result.style.zIndex = '0';
  height.value = '';
  weight.value = '';
});

record.addEventListener('click',function(e) {
  if (e.target.nodeName = 'IMG') {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
          nowData.splice(e.target.dataset.num,1);
          let data = JSON.stringify(nowData);
          localStorage.setItem('data',data);
          record.innerHTML = '';
          let BMITitle = '<h1>BMI 紀錄</h1>';
          record.innerHTML = BMITitle;
          loadData();
    }
  }
})

function BMI(inputHeight,inputWeight) {
  let h = Number(inputHeight)/100;
  let w = Number(inputWeight)*100/100;
  let BMI = w/(h*h);
  BMI = BMI.toFixed(2);
  hideCalculation();
  BMIResult(BMI);
}

function hideCalculation() {
  calculation.style.opacity = '0';
  calculation.style.zIndex = '0';
  result.style.opacity = '1';
  result.style.zIndex = '1';
}

function BMIResult(BMI) {
  resultBMI.innerHTML = BMI;
  outputColorResult(BMI);
  result.style.borderColor = color;
  result.style.color = color;
  resultText.innerHTML = outputResult;
  reset.style.backgroundColor = color;
  let recordData = {
    color: color,
    result: outputResult,
    BMI: BMI,
    weight: weight.value,
    height: height.value,
    date: date, 
  }
  nowData.push(recordData);
  let data = JSON.stringify(nowData);
  localStorage.setItem('data',data);
}

function outputColorResult(BMI) {
  switch (true) {
    case BMI < 18.50 :
      outputResult = '過輕';
      color = '#31BAF9';
      break
    case BMI >= 18.50 && BMI <= 25.00 :
      outputResult = '理想';
      color = '#86D73F';
      break
    case BMI > 25.00 && BMI <= 30.0 :
      outputResult = '過重';
      color = '#FF982D';
      break
    case BMI > 30.00 && BMI <= 35.00 :
      outputResult = '輕度肥胖';
      color = '#FF6C03';
      break
    case BMI > 35.00 && BMI <= 40.00 :
      outputResult = '中度肥胖';
      color = '#FF6C03';
      break
    case BMI > 40.00 :
      outputResult = '重度肥胖';
      color = '#FF1200';
      break
  }
}

function getDate() { 
  let Today = new Date();
  let month = Today.getMonth() + 1;
  let todayMonth = '';
  if (month < 10) {
    todayMonth = `0${month}`;
  } else {
    todayMonth = month;
  }
  date = `${todayMonth}-${Today.getDate()}-${Today.getFullYear()}`;
}

function checkOldData(oldData) {
  if (oldData !== null) {
    oldDataLength = oldData.length;
    for(let i = 0;i < oldDataLength;i++) {
      nowData.push(oldData[i]);
    }
    loadData();
  }
}

function loadData() {
  let getNewData = JSON.parse(localStorage.getItem('data'));
  let newDataLength = getNewData.length;
  for(let i = 0;i < newDataLength;i++) {
    let recordItem = document.createElement('div');
    recordItem.setAttribute('class', 'record-item');
    recordItem.setAttribute('id', `record-${i}`);

    let itemMask = document.createElement('div');
    itemMask.setAttribute('class', 'item-mask');
    itemMask.setAttribute('id', `mask-${+i}`);

    let deleteBtn = document.createElement('img');
    deleteBtn.setAttribute('data-num', i);
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.setAttribute('src', './images/iconfinder_basket_1814090.png');
    
    var itemResult = document.createElement('div');
    itemResult.setAttribute('class', 'item-result');
    itemResult.setAttribute('id', `result-${i}`);
    itemResult.textContent = getNewData[i].result;

    const BMIsection = document.createElement('div');
    BMIsection.setAttribute('class', 'item-section');
    BMIsection.classList.add('ml-30');
    BMIsection.setAttribute('id', `BMI-${i}`);

    const BMItitle = document.createElement('span');
    BMItitle.setAttribute('class', 'title');
    BMItitle.textContent = 'BMI';

    const BMInumber = document.createElement('span');
    BMInumber.setAttribute('class','number');
    BMInumber.textContent = getNewData[i].BMI;

    const weightSection = document.createElement('div');
    weightSection.setAttribute('class', 'item-section');
    weightSection.classList.add('ml-42');
    weightSection.setAttribute('id', `weight-${i}`);

    const weightTitle = document.createElement('span');
    weightTitle.setAttribute('class', 'title');
    weightTitle.textContent = 'weight';

    const weightNumber = document.createElement('span');
    weightNumber.setAttribute('class', 'number');
    weightNumber.textContent = getNewData[i].weight+'kg';

    const heightSection = document.createElement('div');
    heightSection.setAttribute('class', 'item-section');
    heightSection.classList.add('ml-42');
    heightSection.setAttribute('id', `height-${i}`);

    const heightTitle = document.createElement('span');
    heightTitle.setAttribute('class', 'title');
    heightTitle.textContent = 'height';

    const heightNumber = document.createElement('span');
    heightNumber.setAttribute('class', 'number');
    heightNumber.textContent = getNewData[i].height+'cm';

    const recordDate = document.createElement('div');
    recordDate.setAttribute('class', 'item-date');
    recordDate.textContent = getNewData[i].date;

    record.appendChild(recordItem);
    document.querySelector(`#record-${i}`).appendChild(itemMask);
    document.querySelector(`#record-${i}`).appendChild(deleteBtn);
    document.querySelector(`#mask-${i}`).style.backgroundColor = getNewData[i].color;
    document.querySelector(`#record-${i}`).appendChild(itemResult);
    document.querySelector(`#record-${i}`).appendChild(BMIsection);
    document.querySelector(`#BMI-${i}`).appendChild(BMItitle);
    document.querySelector(`#BMI-${i}`).appendChild(BMInumber);
    document.querySelector(`#record-${i}`).appendChild(weightSection);
    document.querySelector(`#weight-${i}`).appendChild(weightTitle);
    document.querySelector(`#weight-${i}`).appendChild(weightNumber);
    document.querySelector(`#record-${i}`).appendChild(heightSection);
    document.querySelector(`#height-${i}`).appendChild(heightTitle);
    document.querySelector(`#height-${i}`).appendChild(heightNumber);
    document.querySelector(`#record-${i}`).appendChild(recordDate);
  }
}