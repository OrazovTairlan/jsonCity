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
                loadHTML(renderDataHTML(result, mainSplitterId, mainSplitter, startSplitter, endSplitter), ".headerRow", "afterend");
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
    console.log(mainSplitter, "mainSplitter");
    console.log(startSplitter);
    console.log(endSplitter);
    console.log(arr);
    let html = `<tbody>`;
    let firstData = ``;
    let firstColumn = ``;
    let resultHTML = ``;
    let htmlResult = ``;
    for (let arrElem of arr) {
        console.log(arrElem);
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
    console.log(html);
    return html;
}

// function renderDataHTML(femaleArr, maleArr, region) {
//     let html = ``;
//     let firstFemale = ``;
//     let firstMale = ``;
//     let femaleColumn = ``;
//     let maleColumn = ``;
//     if (femaleArr.length == 0) {
//         return renderSexHTML(maleArr, region);
//     }
//     if (maleArr.length == 0) {
//         return renderSexHTML(femaleArr, region);
//     }
//     for (let i = 0; i < femaleArr.length; i++) {
//         if (i == 0) {
//             firstFemale = `
//                             <td>${femaleArr[i].date}</td>
//                             <td>${femaleArr[i].female}</td>
//                            `;
//         }
//     }
//     for (let i = 0; i < maleArr.length; i++) {
//         firstMale = `
//                     <td>${maleArr[i].date}</td>
//                     <td>${maleArr[i].male}</td>
//                      `;
//     }
//     for (let i = 0; i < femaleArr.length; i++) {
//         if (i !== 0) {
//             femaleColumn += `<tr>
//                          <td>${femaleArr[i].date}</td>
//                          <td>${femaleArr[i].female}</td>
//                          </tr>`;
//         }
//     }
//     for (let i = 0; i < maleArr.length; i++) {
//         if (i !== 0) {
//             maleColumn += `<tr>
//                          <td>${maleArr[i].date}</td>
//                          <td>${maleArr[i].male}</td>
//                          </tr>`;
//         }
//     }
//     html += `
//     <tbody>
// <tr>
// <td rowspan="9999999">${region}</td>
// <td rowspan="${femaleArr.length}">Женщина</td>
// ${firstFemale}
// </tr>
// ${femaleColumn}
// <tr>
// <td rowspan="${maleArr.length}">Мужчина</td>
// ${firstMale}
// </tr>
// ${maleColumn}
// </tbody>
//     `;
//     return html;
// }

function renderSexHTML(sexArr, region) {
    let firstSexData = ``;
    let sexColumn = ``;
    for (let i = 0; i < sexArr.length; i++) {
        if (i == 0) {
            for (let key in sexArr[i]) {
                if (key !== "sex") {
                    firstSexData += `<td>${sexArr[i][key]}</td>`;
                }
            }
        }
    }
    for (let i = 0; i < sexArr.length; i++) {
        sexColumn += `<tr>`;
        if (i !== 0) {
            for (let key in sexArr[i]) {
                if (key !== "sex") {
                    sexColumn += `<td>${sexArr[i][key]}</td>`;
                }
            }
        }
    }
    sexColumn += `</tr>`;
    let html = `
    <tbody>
   
    </tbody>
    `;
    return html;
}
