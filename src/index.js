// import _ from "underscore";
// import "./style.css";
//
// import jsonData from "../db.json";
// import Lodash from "lodash";
//
// function loadItems() {
//     const $table = document.querySelector(".iksweb");
//     const json = groupJson(); // отфильтрованный массив объектов
//     const html = json.map((item) => {
//         return renderItems(item);
//     });
//     $table.insertAdjacentHTML("afterend", html.join(""));
// }
//
// function renderItems(item) {
//     let html = ``;
//     let largeColumn = ``;
//     for (let key in item) {
//         if (key == "name") {
//             largeColumn = (`
//             <div class="largeColumn">
//                 ${item.name}
//             </div>`)
//             continue;
//         }
//         html += (`
//          <div class="twospan">
//             <div class="half-span">
//             ${item[key]}
//             </div>
//             <div class="half-span">
//              ${item[key]}
//             </div>
//           </div>`);
//     }
//     let readyHTML = (`
//         <div class="row">
//         ${largeColumn}
//         ${html}
//         </div>`);
//     return readyHTML;
// }
//
// // фильтрует массив с объектами
// function groupJson() {
//     let arr = [];
//     let arrResult = [];
//     const json = jsonData;
//     const grouppedData = _.groupBy(json, "name");
//     let obj = copyObjNull(json);
//     for (let key in grouppedData) {
//         for (let i = 0; i < grouppedData[key].length; i++) {
//             if (isMore(grouppedData[key], 1)) {
//                 for (let prop in grouppedData[key][i]) {
//                     if (typeof grouppedData[key][i][prop] == "number") {
//                         obj[prop] += grouppedData[key][i][prop];
//                     } else {
//                         obj[prop] = grouppedData[key][i][prop];
//                     }
//                 }
//                 let copyObj = {...obj};
//                 arr.push(copyObj);
//                 if (grouppedData[key].length - 1 == i) {
//                     obj = copyObjNull(json);
//                 }
//             } else {
//                 for (let prop in grouppedData[key][i]) {
//                     obj[prop] = grouppedData[key][i][prop];
//                 }
//                 let copyObj = {...obj};
//                 arr.push(copyObj);
//                 obj = copyObjNull(json);
//             }
//         }
//     }
//     arr = _.groupBy(arr, "name");
//     for (let key in arr) {
//         let maxElement = _.last(arr[key]);
//         arrResult.push(maxElement);
//     }
//     return arrResult;
// }
//
// // создает копию объекта, но значения null
// function copyObjNull(json) {
//     let obj = {};
//     for (let item of json) {
//         for (let key in item) {
//             obj[key] = null;
//         }
//     }
//     return obj;
// }
//
// function isMore(arr, length) {
//     if (arr.length > length) {
//         return true;
//     }
//     return false;
// }
//
// let obj = {
//     'a':  1,
//     'b':  2,
//     'c':  3,
//     'cc': {
//         'a':  1,
//         'b':  2,
//     }
// }
//
// console.log(nestedLoop(obj));
//
//
// // Рендерит дополнительные элементы
// function renderMiscHTML(obj) {
//     let row = ``;
//     for (let key in obj) {
//         console.log(obj);
//         row += `
//         <tr>
//           <td>${obj[key]}</td>
//         </tr>
//         `;
//     }
//     let html = `
//           <tbody>${row}</tbody>
//         `;
//     console.log(html);
//     return html;
// }
//
// loadItems();

import _ from "underscore";
import "./style.css";

import jsonData from "../db.json";
import Lodash from "lodash";
import group from "underscore/modules/_group";

function loadItems() {
    const $table = document.querySelector(".headerRow");
    const json = groupJson(); // отфильтрованный массив объектов
    const html = json.map((item) => {
        return renderItems(item);
    });
    $table.insertAdjacentHTML("beforeend", html.join(""));
}

function renderItems(item){
    return (`
    <table class="iksweb">
  <tbody>
    <tr>
      <td rowspan="5">Г</td>
      <td rowspan="3">Ж</td>
      <td>Д</td>
      <td>К</td>
    </tr>
    <tr>
      <td>Д</td>
      <td>К</td>
    </tr>
    <tr>
      <td>Д</td>
      <td>К</td>
    </tr>
    <tr>
      <td rowspan="2">М</td>
      <td>Д</td>
      <td>К</td>
    </tr>
    <tr>
      <td>Д</td>
      <td>К</td>
    </tr>
  </tbody>
</table>;


    `)
}

// фильтрует массив с объектами
function groupJson() {
    const jsonData = jsonData;
    console.log(jsonData);
    // let arr = [];
    // let arrResult = [];
    // const json = jsonData;
    // const grouppedData = _.groupBy(json, "name");
    // let obj = copyObjNull(json);
    // for (let key in grouppedData) {
    //     for (let i = 0; i < grouppedData[key].length; i++) {
    //         if (isMore(grouppedData[key], 1)) {
    //             for (let prop in grouppedData[key][i]) {
    //                 if (typeof grouppedData[key][i][prop] == "number") {
    //                     obj[prop] += grouppedData[key][i][prop];
    //                 } else {
    //                     obj[prop] = grouppedData[key][i][prop];
    //                 }
    //             }
    //             let copyObj = {...obj};
    //             arr.push(copyObj);
    //             if (grouppedData[key].length - 1 == i) {
    //                 obj = copyObjNull(json);
    //             }
    //         } else {
    //             for (let prop in grouppedData[key][i]) {
    //                 obj[prop] = grouppedData[key][i][prop];
    //             }
    //             let copyObj = {...obj};
    //             arr.push(copyObj);
    //             obj = copyObjNull(json);
    //         }
    //     }
    // }
    // arr = _.groupBy(arr, "name");
    // for (let key in arr) {
    //     let maxElement = _.last(arr[key]);
    //     arrResult.push(maxElement);
    // }
    // return arrResult;
}

function copyObjNull(json) {
    let obj = {};
    for (let item of json) {
        for (let key in item) {
            obj[key] = null;
        }
    }
    return obj;
}

function isMore(arr, length) {
    if (arr.length > length) {
        return true;
    }
    return false;
}
