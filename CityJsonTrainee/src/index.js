import _ from "underscore";
import "./style.css";

import jsonData from "../db.json";
import group from "underscore/modules/_group";

 // async function fetchData(path) {
 //     let result = await fetch(path);
 //     result = await result.json();
 //     console.log(result)
 //     return result;
 // }

 async function loadItems() {
     const $table = document.querySelector(".headerRow");
     const json = jsonData;
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
     const json = jsonData;
     const grouppedData = _.groupBy(json, "name");
     console.log(grouppedData);
     return grouppedData;
 }





 groupJson();

 loadItems();


