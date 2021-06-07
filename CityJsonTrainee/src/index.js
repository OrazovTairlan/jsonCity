import "./style.css";

import json from "../db.json";

import Lodash from "lodash";
import _ from "underscore";

function groupBy(jsonArr, conditionStr, flag = false) {
    if (flag) {
        return Object.values(_.groupBy(jsonArr, conditionStr));
    }
    return _.groupBy(jsonArr, conditionStr);
}

function filterByFemale(item) {
    for (let key in item) {
        return key == "female";
    }
}

function filterByMale(item) {
    for (let key in item) {
        return key == "male";
    }
}

function filterObjByFemale(item) {
    return item.sex == "female";
}

function filterObjByMale(item) {
    return item.sex == "male";
}

function iterateArr(arr, conditionStr) {
    arr.forEach(function (item) {
        let arrGrouppedRegionByDate = groupBy(item, "date", true);
        arrGrouppedRegionByDate.forEach(function (elem) {
            let femaleObjArr = _.filter(
                arrGrouppedRegionByDate[elem],
                filterObjByFemale
            );
            let femaleSum = Lodash.sumBy(femaleObjArr, "value");
            let femaleObj = {
                female: femaleSum,
                date: femaleObjArr[0].date,
            };
        });
    });
}

function createSexObj(obj, value, date) {
    let copyObj = {...obj};
    for (let key in copyObj) {
        copyObj[key] = value;
        copyObj.date = date;
    }
    return copyObj;
}

function filterItems() {
    let arr = [];
    let jsonData = json;
    let arrGrouppedRegionByDate = [];
    let arrGrouppedByRegion = groupBy(jsonData, "region", true);
    for (let item of arrGrouppedByRegion) {
        arrGrouppedRegionByDate = groupBy(item, "date", true);
        for (let i = 0; i < arrGrouppedRegionByDate.length; i++) {
            let femaleObjArr = _.filter(
                arrGrouppedRegionByDate[i],
                filterObjByFemale
            );
            let femaleSum = Lodash.sumBy(femaleObjArr, "value");
            let femaleObj = {
                female: femaleSum,
                date: femaleObjArr[0].date,
            };
            let maleObjArr = _.filter(arrGrouppedRegionByDate[i], filterObjByMale);
            let maleSum = Lodash.sumBy(maleObjArr, "value");
            if (maleObjArr.length == 0) {
            }
            let maleObj = {
                male: maleSum,
                date: maleObjArr[0].date,
            };
            arr.push(femaleObj, maleObj);
            if (i == arrGrouppedRegionByDate.length - 1) {
                console.log(arr);
                let readyFemaleArr = _.filter(arr, filterByFemale);
                let readyMaleArr = _.filter(arr, filterByMale);
                arr = [];
                const result = renderHTML(
                    readyFemaleArr,
                    readyMaleArr,
                    femaleObjArr[0].region
                );
                loadHTML(result);
            }
        }
    }
}

filterItems();

function renderHTML(femaleArr, maleArr, region) {
    let femaleCell = ``;
    for (let item of femaleArr) {
        femaleCell += `
        <div class="cell">
          <div class="d">
          ${item.date}
          </div>
          <div class="c">
            ${item.female}
          </div>
        </div>
        `
    }
    let maleCell = ``;
    for (let item of maleArr) {
        maleCell += `
         <div class="cell">
          <div class="d">
          ${item.date}
          </div>
          <div class="c">
            ${item.male}
          </div>
        </div>
        `
    }
    let html = `
    <div class="row">
      <div class="female">
        Женщина
      </div>
      <div class="data">
      ${femaleCell}
      </div>
    </div>
    <div class="row">
      <div class="female">
        Мужчина
      </div>
      <div class="data">
      ${maleCell}
      </div>
    </div>
`;
    return html;
}

function loadHTML(html) {
    const $table = document.querySelector(".header");
    $table.insertAdjacentHTML("beforeend", html);
}
