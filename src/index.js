import "./style.css";

import json from "../db.json";
import config from "../config.json";
import params from "../params.json";

import _ from "underscore";
import Lodash from "lodash";

main();

function main() {
    console.log(json);
    console.log(params);
    console.log(config);
    console.log(groupJSON(json, "region", true));
}

function groupJSON(json, condition, flag = false) {
    return groupBy(json, condition, flag)
}

function groupBy(arr, condition, flag = false) {
    if (flag) {
        return Object.values(_.groupBy(arr, condition));
    }
    return _.groupBy(arr, condition);
}