import * as AWS from "aws-sdk";

const configuration = {
  region: "us-east-1",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_SECRET_ACCESS_ID,
};

AWS.config.update(configuration);

const docClient = new AWS.DynamoDB.DocumentClient();

export const getRandomId = () => {
  const ret = (Math.random() * Date.now()).toString(36);
  console.log(ret);
  return (Math.random() * Date.now()).toString(36);
};

//Where tableName is "admin_announcements", "users", or "hoursLog"
//Grabs all of the data in the table
export const fetchData = async (tableName) => {
  var params = {
    TableName: tableName,
  };

  let result = await docClient
    .scan(params, function (err, data) {
      if (!err) {
        return data.Items;
      }
    })
    .promise()
    .then((data) => {
      return data;
    });
  return result;
};

//Where tableName is "admin_announcements", "users", or "hoursLog"
//data is the item to be stored in the database
export const putData = (tableName, data) => {
  console.log("PUTDATA");
  console.log(data);
  var params = {
    TableName: tableName,
    Item: data,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};

//Where tableName is "admin_announcements", "users", or "hoursLog"
// itemKey is the the actually primary key identifier
// itemKeyName is the name of the primary key
// for admin_announcements table - primary_id
// for hoursLog table - primary_logId
// for users - username
export const deleteItem = (tableName, itemKey, itemKeyName) => {
  var params = {
    TableName: tableName,
    Key: {
      itemKeyName: itemKey,
    },
  };

  docClient.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};
