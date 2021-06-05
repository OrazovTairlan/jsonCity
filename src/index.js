import "./style.css";

import json from "../db.json";

import Lodash from "lodash";
import _ from "underscore";

function filterItems() {
    let arr = [];
    let jsonData = json;
    let grouppedData = _.groupBy(jsonData, "region");
    let arrDate = [];
    let date = Object.values(grouppedData);
    for (let item of date) {
        let dateGroupData = _.groupBy(item, "date");
        arrDate = Object.values(dateGroupData);
        for (let i = 0; i < arrDate.length; i++) {
            let femaleArr = _.filter(arrDate[i], function (item) {
                return item.sex == "female";
            });
            let femaleSum = Lodash.sumBy(femaleArr, "value");
            let femaleObj = {
                female: femaleSum,
                date: femaleArr[0].date,
            };
            let maleArr = _.filter(arrDate[i], function (item) {
                return item.sex == "male";
            });
            let maleSum = Lodash.sumBy(maleArr, "value");
            let maleObj = {
                male: maleSum,
                date: maleArr[0].date,
            };
            arr.push(femaleObj, maleObj);
            if (i == arrDate.length - 1) {
                let readyFemaleArr = _.filter(arr, function (item) {
                    for (let key in item) {
                        return key == "female";
                    }
                });
                let readyMaleArr = _.filter(arr, function (item) {
                    for (let key in item) {
                        return key == "male";
                    }
                });
                arr = [];
                const result = renderHTML(readyFemaleArr, readyMaleArr, femaleArr[0].region);
                loadHTML(result);
            }
        }
    }
}

filterItems();

function renderHTML(femaleArr, maleArr, region) {
    console.log(femaleArr);
    console.log(maleArr);
    let city = `<td rowspan="3">${region}</td>`
    let femaleColumn = ``;
    for (let item of femaleArr) {
        femaleColumn += `
         <div class="cell">
              <div class="data">
               ${item.date}
              </div>
              <div class="count">
               ${item.female}
              </div>
        </div>
        `
    }
    let maleColumn = ``;
    for (let item of maleArr) {
        maleColumn += ` 
 <div class="cell">
      <div class="data">
       ${item.date}
      </div>
      <div class="count">
        ${item.male}
      </div>
    </div>`
    }

    return (`
   <div class="data-ref">
  <div class="definition">
    Женщины
  </div>
  <div class="row">
  ${femaleColumn}
  </div>
</div>
<div class="data-ref">
  <div class="definition">
    Мужчины
  </div>
  <div class="row">
  ${maleColumn}
  </div>
</div>
`);
}

function loadHTML(html) {
    const $table = document.querySelector(".headerRow");
    $table.insertAdjacentHTML("beforeend", html);
}
