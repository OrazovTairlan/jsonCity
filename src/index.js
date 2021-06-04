import "./style.css";

const GLOBAL_STATE = [];

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
        console.log(dateGroupData);
        arrDate = Object.values(dateGroupData);
        for (let i = 0; i < arrDate.length; i++) {
            console.log(arrDate[i]);
            console.log(arrDate.length);
            let femaleArr = _.filter(arrDate[i], function (item) {
                return item.sex == "female";
            });
            let femaleSum = Lodash.sumBy(femaleArr, "value");
            let femaleObj = {
                female: femaleSum,
                date: femaleArr[0].date
            }
            let maleArr = _.filter(arrDate[i], function (item) {
                return item.sex == "male";
            });
            let maleSum = Lodash.sumBy(maleArr, "value");
            let maleObj = {
                male: maleSum,
                date: maleArr[0].date
            };
            arr.push(femaleObj, maleObj);
            if (i == arrDate.length-1) {
                console.log("end");
                let readyFemaleArr = [];
                let re
                console.log(arr, femaleArr[0].region);
                arr = [];
            }
        }
    }
}

filterItems();

function renderHTML(femaleArr, maleArr, region) {
    let femaleColumn = ``;
    let maleColumn = ``;
    for (let item of femaleArr) {
        femaleColumn += `Женщин ${item.female} в ${item.date} <br> <br>`
    }
    for (let item of maleArr) {
        maleColumn += `Мужчин ${item.male} в ${item.date} <br> <br>`
    }
    let html = `${femaleColumn} <br> ${maleColumn}`
    return html;
//         `
//    <tr>
//    <td rowspan="6">Город/td>
//    <td rowspan="3">Мужчины</td>
//    <td>Д</td>
//    <td>К</td>
// </tr>
// <tr>
//    <td>Д</td>
//    <td>К</td>
// </tr>
// <tr>
//    <td>Д</td>
//    <td>К</td>
// </tr>
// <tr>
//    <td rowspan="3">Ж</td>
//    <td>Д</td>
//    <td>К</td>
// </tr>
// <tr>
//    <td>Д</td>
//    <td>К</td>
// </tr>
// <tr>
//    <td>Д</td>
//    <td>К</td>
// </tr>
//     `;
}

function loadHTML(html) {
    const $table = document.querySelector(".headerRow");
    $table.insertAdjacentHTML("beforeend", html);
}
