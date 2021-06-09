import "./style.css";

import json from "../db.json";
import config from "../config.json";

import Lodash from "lodash";
import _ from "underscore";


function main() {
    const jsonData = json;
    const configData = config;
}

function renderHTML(header, data) {
    return `
    <div class="data">
        <table class="iksweb">
            ${renderHeaderHTML(header)}
            ${renderDataByCondition(data)}
        </table>
    </div>
    `
}


function renderDataByCondition(arr) {
    let html = ``;
    html += `<tbody>`
    for (let item of arr) {
        html += `<tr>
                    <td>${item}</td>
                 </tr>`
    }
    html += `</tbody>`
    return html;
}

function renderHeaderHTML(item) {
    let html = ``;
    html += `<tbody>`;
    html += `
                <tr>
                  <td${item}</td>
                </tr>
                `
    html += ` </tbody>`
    return html;
}

function findAllByCondition(arr, config) {
    return _.pluck(arr, config);
}


main();


// function renderHeaderHTML(arr) {
//     let html = ``;
//     html += `
//         <tbody class="headerRow">
//         <tr>
//         `
//     for (let item of arr) {
//         html += `
//             <td>${item}</td>
//         `
//     }
//     html += ` </tr>
//         </tbody>`
//     return html;
// }

function groupBy(jsonArr, conditionStr, flag = false) {
    if (flag) {
        return Object.values(_.groupBy(jsonArr, conditionStr));
    }
    return _.groupBy(jsonArr, conditionStr);
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
        <td rowspan="${sexArr.length + 1}">${sexArr[0].sexHeader}</td>
        ${firstSexData}
        </tr>
        ${sexColumn}
    </tbody>
    `;
    return html;
}

// function renderHTML(femaleArr, maleArr, region) {
//     if (maleArr.length == 0) {
//         return renderSexHTML(femaleArr, region)
//     }
//     if (femaleArr.length == 0) {
//         return renderSexHTML(maleArr, region);
//     }
//     let femaleLength = femaleArr.length;
//     let maleLength = maleArr.length;
//     let html = ``;
//     let firstFemale = ``;
//     let firstMale = ``;
//     let femaleColumn = ``;
//     let maleColumn = ``;
//
//     for (let i = 0; i < femaleArr.length; i++) {
//         for (let key in femaleArr[i]) {
//             if (i == 0 && key !== "sexHeader") {
//                 firstFemale += `<td>${femaleArr[i][key]}</td>`;
//             }
//         }
//     }
//     for (let i = 0; i < maleArr.length; i++) {
//         for (let key in maleArr[i]) {
//             if (i == 0 && key !== "sexHeader") {
//                 firstMale += `<td>${maleArr[i][key]}</td>`;
//             }
//         }
//     }
//
//     for (let i = 0; i < femaleArr.length; i++) {
//
//     }
//
//     html += `
//         <tbody>
//         <tr>
//         <td rowspan="999">${region}</td>
//         <td rowspan="${femaleLength}">Женщина</td>
//         ${firstFemale}
//         </tr>
//         ${femaleColumn}
//         <tr>
//         <td rowspan="${maleLength}">Мужчина</td>
//         ${firstMale}
//         </tr>
//         ${maleColumn}
//         </tbody>
//     `;
//     return html;
// }

function loadHTML(html, elem, position) {
    const $elem = document.querySelector(elem);
    $elem.insertAdjacentHTML(position, html);
}

