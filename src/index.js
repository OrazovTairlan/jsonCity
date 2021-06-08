import "./style.css";

import json from "../db.json";

import Lodash from "lodash";
import _ from "underscore";


function main() {
    const jsonData = json;
    const result = renderHeaderHTML(jsonData[0].headers);
    loadHTML(result, ".iksweb", "afterbegin")
    filterItems();
}


main();

function renderHeaderHTML(obj) {
    let html = ``;
    html += `
        <tbody class="headerRow">
        <tr>
        `
    for (let key in obj) {
        html += `
            <td>${obj[key]}</td>
        `
    }
    html += ` </tr>
        </tbody>`
    return html;
}

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

function filterItems() {
    let arr = [];
    let jsonData = json;
    let arrGrouppedRegionByDate = [];
    let arrGrouppedByRegion = groupBy(jsonData, "region", true);
    for (let item of arrGrouppedByRegion) {
        arrGrouppedRegionByDate = groupBy(item, "date", true);
        for (let i = 0; i < arrGrouppedRegionByDate.length; i++) {
            let region = arrGrouppedRegionByDate[i][0].region;
            let femaleObjArr = _.filter(
                arrGrouppedRegionByDate[i],
                filterObjByFemale
            );
            let femaleSum = Lodash.sumBy(femaleObjArr, "value");
            let femaleObj;
            if (femaleObjArr.length > 0) {
                femaleObj = {
                    date: femaleObjArr[0].date,
                    female: femaleSum,
                    sexHeader: femaleObjArr[0].sexHeader
                };
            }
            let maleObjArr = _.filter(arrGrouppedRegionByDate[i], filterObjByMale);
            let maleSum = Lodash.sumBy(maleObjArr, "value");
            let maleObj;
            if (maleObjArr.length > 0) {
                maleObj = {
                    date: maleObjArr[0].date,
                    male: maleSum,
                    sexHeader: maleObjArr[0].sexHeader
                };
            }
            arr.push(femaleObj, maleObj);
            if (i == arrGrouppedRegionByDate.length - 1) {
                arr = Lodash.compact(arr);
                console.log(arr);
                let readyFemaleArr = _.filter(arr, function (item) {
                    return item.sexHeader == "Женщина";
                });
                let readyMaleArr = _.filter(arr, function (item) {
                    return item.sexHeader == "Мужчина";
                });
                console.log(readyMaleArr);
                console.log(readyFemaleArr);
                arr = [];
                const result = renderHTML(readyFemaleArr, readyMaleArr, region);
                loadHTML(result, ".headerRow", "afterend");
            }
        }
    }
}

function renderSexHTML(sexArr, region) {
    let firstSexData = ``;
    let sexColumn = ``;
    for (let i = 0; i < sexArr.length; i++) {
        if (i == 0) {
            for (let key in sexArr[i]) {
                if (key !== "sexHeader") {
                    firstSexData += `<td>${sexArr[i][key]}</td>`;
                }
            }
        }
    }
    for (let i = 0; i < sexArr.length; i++) {
        sexColumn += `<tr>`
        if (i !== 0) {
            for (let key in sexArr[i]) {
                if (key !== "sexHeader") {
                    sexColumn += `<td>${sexArr[i][key]}</td>`
                }
            }
        }
        sexColumn += `</tr>`
    }
    let html = `
    <tbody>
        <tr>
        <td rowspan="99">${region}</td>
        <td rowspan="${sexArr.length+1}">${sexArr[0].sexHeader}</td>
        ${firstSexData}
        </tr>
        ${sexColumn}
    </tbody>
    `;
    return html;
}

function renderHTML(femaleArr, maleArr, region) {
    if (maleArr.length == 0) {
        return renderSexHTML(femaleArr, region)
    }
    if (femaleArr.length == 0) {
        return renderSexHTML(maleArr, region);
    }
    let femaleLength = femaleArr.length;
    let maleLength = maleArr.length;
    let html = ``;
    let firstFemale = ``;
    let firstMale = ``;
    let femaleColumn = ``;
    let maleColumn = ``;

    for (let i = 0; i < femaleArr.length; i++) {
        for (let key in femaleArr[i]) {
            if (i == 0 && key !== "sexHeader") {
                firstFemale += `<td>${femaleArr[i][key]}</td>`;
            }
        }
    }
    for (let i = 0; i < maleArr.length; i++) {
        for (let key in maleArr[i]) {
            if (i == 0 && key !== "sexHeader") {
                firstMale += `<td>${maleArr[i][key]}</td>`;
            }
        }
    }

    for (let i = 0; i < femaleArr.length; i++) {

    }

    html += `
        <tbody>
        <tr>
        <td rowspan="999">${region}</td>
        <td rowspan="${femaleLength}">Женщина</td>
        ${firstFemale}
        </tr>
        ${femaleColumn}
        <tr>
        <td rowspan="${maleLength}">Мужчина</td>
        ${firstMale}
        </tr>
        ${maleColumn}
        </tbody>
    `;
    return html;
}

function loadHTML(html, elem, position) {
    const $elem = document.querySelector(elem);
    $elem.insertAdjacentHTML(position, html);
}

