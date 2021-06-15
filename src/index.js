import "./style.css";

import json from "../db.json";
import config from "../config.json";
import params from "../params.json";

import Lodash from "lodash";
import _ from "underscore";

main();


function createAssoc() {
    let mainSplitter = _.pluck(config, "key")[0];
    let startSubSplitter = _.pluck(config, "key")[1];
    let endSubSplitter = _.pluck(config, "key")[2];
    return [mainSplitter, startSubSplitter, endSubSplitter];
}

function getGroupsLength(startSubSplitter, flag = false) {
    if (flag) {
        return Lodash.uniq(_.pluck(json, startSubSplitter));
    }
    return Lodash.uniq(_.pluck(json, startSubSplitter)).length;
}

function canSumElems() {
    return params.sum;
}

createAssoc();

function main() {
    let headerData = getHeaderData();
    let headerHTML = renderHeaderHTML(headerData);
    loadHTML(headerHTML, ".iksweb", "afterbegin");
    let [mainSplitter, startSubSplitter, endSubSplitter] = createAssoc();
    filterItems(mainSplitter, startSubSplitter, endSubSplitter);
}

function groupBy(jsonArr, conditionStr, flag = false) {
    if (flag) {
        return Object.values(_.groupBy(jsonArr, conditionStr));
    }
    return _.groupBy(jsonArr, conditionStr);
}

function filterItems(mainSplitter, startSplitter, endSplitter) {
    let arr = [];
    let duplicatedArr = [];
    let obj = {};
    let jsonData = json;
    let arrGrouppedRegionByDate = [];
    let arrGrouppedByRegion = groupBy(jsonData, mainSplitter, true);
    for (let arrElems of arrGrouppedByRegion) {
        for (let i = 0; i < arrElems.length; i++) {
            let grouppedByEndSplitter = groupBy(arrElems, endSplitter, true);
            for (let arrElem of grouppedByEndSplitter) {
                let grouppedByStartSplitter = groupBy(arrElem, startSplitter, true);
                for (let elem of grouppedByStartSplitter) {
                    obj = {...elem[0]};
                    sumObj(obj, elem);
                    duplicatedArr.push(obj);
                }
            }
            if (i == arrElems.length - 1) {
                let result = Lodash.sortBy(Lodash.uniqWith(duplicatedArr, _.isEqual), "sex");
                let mainSplitterId = result[0].region;
                result = groupBy(result, "sex", true);
                loadHTML(renderDataHTML(result, mainSplitter, mainSplitter, startSplitter, endSplitter), ".headerRow", "afterend");
                duplicatedArr = [];
            }
        }
    }
}

function sumObj(obj, arr) {
    for (let item of canSumElems()) {
        for (let key in obj) {
            if (key == item) {
                obj[key] = Lodash.sumBy(arr, item);
            }
        }
    }
}


function getHeaderData() {
    return _.pluck(config, "label");
}

function renderHeaderHTML(arr) {
    let html = ``;
    html += `<tbody class = "headerRow"><tr>`;
    for (let item of arr) {
        html += `<td>${item}</td>`;
    }
    html += `</tr></tbody>`;
    return html;
}

function resetArr(arr) {
    arr = [];
}
    
function loadHTML(html, elem, position) {
    const $elem = document.querySelector(elem);
    $elem.insertAdjacentHTML(position, html);
}


function renderDataHTML(arr, mainSplitterId, mainSplitter, startSplitter, endSplitter) {
    console.log(arr);
    console.log(mainSplitter);
    console.log(startSplitter);
    console.log(endSplitter);
    let html = `<tbody>`;
    let firstData = ``;
    let firstColumn = ``;
    let resultHTML = ``;
    let htmlResult = ``;
    console.log(arr[0][0])
    for (let arrElem of arr) {
        for (let i = 0; i < arrElem.length; i++) {
            if (i == 0) {
                firstData += `<tr>`
                for (let key in arrElem[i]) {
                    if (key == startSplitter) {
                        firstData += `<td rowspan="${arrElem.length}">${arrElem[i][startSplitter]}</td>`;
                    }
                    if (key !== startSplitter && key !== mainSplitter) {
                        firstData += `<td>${arrElem[i][key]}</td>`
                    }
                }
                firstData += `</tr>`
            }
            if (i !== 0) {
                firstColumn += `<tr>`
                for (let key in arrElem[i]) {
                    if (key !== startSplitter && key !== mainSplitter) {
                        firstColumn += `<td>${arrElem[i][key]}</td>`;
                    }
                }
                firstColumn += `</tr>`
            }
            if (arrElem.length - 1 == i) {
                html += firstData;
                html += firstColumn;
                firstData = ``;
                firstColumn = ``;
            }
        }
    }
    html += `
   </tbody>`;
    return html;
}

