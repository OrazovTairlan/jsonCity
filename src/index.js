import _ from "underscore";
import "./style.css";

import jsonData from "../db.json";
import Lodash from "lodash";

// async function fetchData(path) {
//     let result = await fetch(path);
//     result = await result.json();
//     console.log(result)
//     return result;
// }

async function loadItems() {
    const $table = document.querySelector(".headerRow");
    const json = groupJson();
    const html = json.map((item) => {
        return renderItems(item);
    });
    $table.insertAdjacentHTML("afterend", html.join(""));
}

async function filterItems() {
    const jsonData = jsonData;
    let date = jsonData[0].date;
    const result = jsonData.every((item) => {
        return item.date == date;
    });
    return result;
}

function iterateObj(obj) {
    let html = "";
    for (let key in obj) {
        if (key == "female" || key == "male"){
            html += `${key}:${obj[key]} <br>`
        }
        if (key !== "female" && key !== "male") {
            console.log(typeof key);
            html += `${key}:${obj[key]} <br>`;
        }
    }
    return html;
}

function renderItems(item) {
    const html = iterateObj(item);
    return html;
    // const html = item.return(
   //      `
   // <tbody class="row" data-name = ${item.name}>
   //   <tr>
   //       <td rowspan="2" class="cityName">${item.name}</td>
   //       <td class="maleSex">Мужчина</td>
   //       <td class="date">${item.date}</td>
   //       <td class="countMale">${item.male}</td>
   //   </tr>
   //   <tr>
   //       <td class="femaleSex">Женщина</td>
   //       <td class="date">${item.date}</td>
   //       <td class="countFemale">${item.female}</td>
   //   </tr>
   //   <tr>
   //   </tbody>`

}

function groupJson() {
    let arr = [];
    let obj = {};
    const json = jsonData;
    const grouppedData = _.groupBy(json, "name");
    for (let item of json) {
        for (let key in item) {
            obj[key] = null;
        }
    }
    for (let key in grouppedData) {
        for (let i = 0; i < grouppedData[key].length; i++) {
            if (grouppedData[key].length > 1) {
                for (let prop in grouppedData[key][i]) {
                    if (typeof grouppedData[key][i][prop] == "number") {
                        obj[prop] += grouppedData[key][i][prop];
                    } else {
                        obj[prop] = grouppedData[key][i][prop];
                    }
                }
                console.log(obj, i, grouppedData[key].length);
                let copyObj = {...obj};
                arr.push(copyObj);
                if (grouppedData[key].length - 1 == i) {
                    for (let item of json) {
                        for (let key in item) {
                            obj[key] = null;
                        }
                    }
                }
            } else {
                for (let prop in grouppedData[key][i]) {
                    obj[prop] = grouppedData[key][i][prop];
                }
                let copyObj = {...obj};
                arr.push(copyObj);
                for (let item of json) {
                    for (let key in item) {
                        obj[key] = null;
                    }
                }
            }
        }
    }
    let result = Lodash.uniqBy(arr, "name");
    arr = _.groupBy(arr, "name");
    let arrResult = [];
    for (let key in arr) {
        arrResult.push(arr[key][arr[key].length - 1]);
    }
    return arrResult;
}


function isMore(arr, length) {
    if (arr.length > length) {
        return true;
    }
    return false;
}

loadItems();


