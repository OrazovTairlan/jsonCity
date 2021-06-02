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

function renderItems(item) {
    return (
        `
   <tbody class="row" data-name = ${item.name}>
     <tr>
         <td rowspan="2" class="cityName">${item.name}</td>
         <td class="maleSex">Мужчина</td>
         <td class="date">${item.date}</td>
         <td class="countMale">${item.count.male}</td>
     </tr>
     <tr>
         <td class="femaleSex">Женщина</td>
         <td class="date">${item.date}</td>
         <td class="countFemale">${item.count.female}</td>
     </tr>
     <tr>
     </tbody>`
    );
}

function groupJson() {
    let arr = [];
    const json = jsonData;
    const grouppedData = _.groupBy(json, "name");
    console.log(grouppedData);
    let obj = {
        name: null,
        date: null,
        count: {
            female: null,
            male: null
        }
    };
    for (let key in grouppedData) {
        for (let i = 0; i < grouppedData[key].length; i++) {
            if (isMore(grouppedData[key], 1)) {
                obj.name = grouppedData[key][i].name;
                obj.date = grouppedData[key][i].date;
                obj.count.female += grouppedData[key][i].count.female;
                obj.count.male += grouppedData[key][i].count.male; // finished creating obj
                const copyObj = {...obj};
                arr.push(copyObj);
                console.log(obj);
                if (i == grouppedData[key].length-1) {
                    obj = {
                        name: null,
                        date: null,
                        count: {
                            female: null,
                            male: null
                        }
                    };
                }
            } else {
                obj.name = (grouppedData[key][i].name);
                obj.date = grouppedData[key][i].date;
                obj.count.female = grouppedData[key][i].count.female;
                obj.count.male = grouppedData[key][i].count.male; // finished creating obj
                const copyObj = {...obj};
                arr.push(copyObj);
                obj = {
                    name: null,
                    date: null,
                    count: {
                        female: null,
                        male: null
                    }
                };
            }
            console.log(arr);
        }
    }
    const result = Lodash.uniqBy(arr, "name");
    return result;
}


function isMore(arr, length) {
    if (arr.length > length) {
        return true;
    }
    return false;
}

loadItems();


