import "./style.css";

const GLOBAL_STATE = [];

import json from "../db.json";

import Lodash from "lodash";
import _ from "underscore";

function filterItems() {
    let jsonData = json;
    let grouppedData = _.groupBy(jsonData, "region");
    let date = Object.values(grouppedData);
    for (let item of date) {
        let dateGroupData = _.groupBy(item, "date");
        console.log(dateGroupData);

    }
    let arrDateGroupDate = Object.values(dateGroupDate);
    for (let item of arrDateGroupDate) {
        let femaleArrObj = [];
        let maleArrObj = [];
        let commonObj = {};
        let femaleArr = item.filter(function (item) {
            return item.sex == "female";
        });
        let maleArr = item.filter(function (item) {
            return item.sex == "male";
        });
        let commonFemale = Lodash.sumBy(femaleArr, "value");
        let commonMale = Lodash.sumBy(maleArr, "value");
        let femaleObj = {
            female: commonFemale,
            date: item[0].date,
        };
        let maleObj = {
            male: commonMale,
            date: item[0].date,
        };
        obj = {region: item[0].region};
        let copyFemaleObj = {...femaleObj};
        let copyMaleObj = {...maleObj};
        commonObj = {...obj};
        femaleArrObj.push(copyFemaleObj);
        maleArrObj.push(copyMaleObj);
        maleArrObj.push(copyMaleObj);
        const result = renderHTML(femaleArrObj, maleArrObj, commonObj);
        loadHTML(result);
    }
}

filterItems();

function renderHTML(femaleArr, maleArr, commonObj) {
    GLOBAL_STATE.push(commonObj.region);
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
