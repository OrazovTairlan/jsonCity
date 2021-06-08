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

function iterateByGrouppingDate(arr) {
    let count = 0;
    arr.forEach(function (item) {
    });
}

function iterateByGrouppingRegion(arr) {
    let count = 0;
    arr.forEach(function (item) {
        let arrGrouppedRegionByDate = groupBy(item, "date", true);
        console.log(arrGrouppedRegionByDate);
        iterateByGrouppingDate(item);
    });
}


function renderFemaleHTML(femaleArr, region) {
    let firstFemale = ``;
    for (let i = 0; i < femaleArr.length; i++) {
        for (let key in femaleArr) {
            if (i == 0) {
                firstFemale += `<td>${femaleArr[i][key]}</td>`;
            }
        }
        let femaleColumn = ``;
        for (let item of femaleArr) {
            for (let key in item) {
                femaleColumn += `
                <tr>
                    <td>${femaleArr[key]}</td>
                    <td>${femaleArr[key]}</td>
                </tr>
                `
            }
        }
    }
}

function filterItems() {
    let arr = [];
    let jsonData = json;
    let arrGrouppedRegionByDate = [];
    console.log(_.groupBy(jsonData, "region"));
    let arrGrouppedByRegion = groupBy(jsonData, "region", true);
    iterateByGrouppingRegion(arrGrouppedByRegion);
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
                    female: femaleSum,
                    date: femaleObjArr[0].date,
                };
            }
            let maleObjArr = _.filter(arrGrouppedRegionByDate[i], filterObjByMale);
            let maleSum = Lodash.sumBy(maleObjArr, "value");
            let maleObj;
            if (maleObjArr.length > 0) {
                maleObj = {
                    male: maleSum,
                    date: maleObjArr[0].date,
                };
            }
            arr.push(femaleObj, maleObj);
            console.log(i, arrGrouppedRegionByDate.length);
            if (iterateIsEnded(arrGrouppedRegionByDate, i)) {
                let readyFemaleArr = _.filter(arr, filterByFemale);
                let readyMaleArr = _.filter(arr, filterByMale);
                resetArr(arr);
                const result = renderHTML(readyFemaleArr, readyMaleArr, region);
                loadHTML(result);
            }
        }
    }
}

function resetArr(arr) {
    arr = [];
}

function iterateIsEnded(arr, i) {
    if (arr.length - 1 == i) {
        return true;
    }
}

filterItems();

function isEmptyFemale(femaleArr, region) {
    let femaleColumn = ``;
    let firstFemale = `
        <td>${femaleArr[0].date}</td>
        <td>${femaleArr[0].female}</td>
        `;
    for (let i = 0; i < femaleArr.length; i++) {
        if (i == 0) {
            continue;
        }
        femaleColumn += `
            <tr>
                <td>${femaleArr[i].date}</td>
                <td>${femaleArr[i].female}</td>
            </tr>
            `;
    }
    let html = `
<tbody>
<tr>
<td rowspan="99">${region}</td>
<td rowspan="999">Женщина</td>
${firstFemale}
</tr>
${femaleColumn}
</tbody>
    `;
    return html;
}

function isEmptyMale(maleArr, region) {
    let maleColumn = ``;
    let firstMale = `
        <td>${maleArr[0].date}</td>
        <td>${maleArr[0].male}</td>
        `;
    for (let i = 0; i < maleArr.length; i++) {
        if (i == 0) {
            continue;
        }
        maleColumn += `
            <tr>
                <td>${maleArr[i].date}</td>
                <td>${maleArr[i].male}</td>
            </tr>
            `;
    }
    let html = `
<tbody>
<tr>
<td rowspan="7">${region}</td>
<td rowspan="999">Мужчина</td>
${firstMale}
</tr>
${maleColumn}
</tbody>
    `;
    return html;
}

function renderHTML(femaleArr, maleArr, region) {
    if (maleArr.length == 0) {
        return isEmptyFemale(femaleArr, region);
    }
    if (femaleArr.length == 0) {
        return isEmptyMale(maleArr, region);
    }
    let femaleLength = femaleArr.length;
    let maleLength = maleArr.length;
    let html = ``;
    let firstFemale = ``;
    let firstMale = ``;
    let femaleColumn = ``;
    let maleColumn = ``;
    firstFemale += `
    <td>${femaleArr[0].date}</td>
    <td>${femaleArr[0].female}</td>
    `;
    firstMale += `
    <td>${maleArr[0].date}</td>
    <td>${maleArr[0].male}</td>
    `;
    for (let i = 0; i < femaleArr.length; i++) {
        if (i == 0) {
            continue;
        }
        femaleColumn += `
        <tr>
            <td>${femaleArr[i].date}</td>
            <td>${femaleArr[i].female}</td>
        </tr>
        `;
    }
    for (let i = 0; i < maleArr.length; i++) {
        if (i == 0) {
            continue;
        }
        maleColumn += `
        <tr>
            <td>${maleArr[i].date}</td>
            <td>${maleArr[i].male}</td>
        </tr>
        `;
    }
    html += `
        <tbody>
        <tr>
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

function loadHTML(html) {
    const $table = document.querySelector(".headerRow");
    $table.insertAdjacentHTML("afterend", html);
}
