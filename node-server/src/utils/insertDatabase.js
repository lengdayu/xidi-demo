const mysql = require("mysql2");

const connections = mysql.createPool({
  host: "localhost",
  port: "3306",
  database: "xidi",
  user: "root",
  password: "DAyu0428@123",
});

const Pool = connections.promise();

const { shoppClassifyInfo } = require("../../public/mainHtml.json");

const statment1 = "INSERT INTO commodity_classify SET ?";
let result_classify = [];
let currentIndex = 0;
shoppClassifyInfo.map((item, index) => {
  let parentCid = currentIndex;
  parentCid++;
  result_classify.push({
    cId: currentIndex + 1,
    parentCid: 0,
    title: item.title,
  });
  currentIndex++;
  item.children.map((secItem, secIndex) => {
    result_classify.push({
      cId: currentIndex + 1,
      parentCid: parentCid,
      title: secItem.title,
    });
    currentIndex++;
  });
});
result_classify.map((item) => {
  Pool.execute(statment1, [item]);
});
