const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue, equalTo, query, orderByKey, orderByValue, child, get } = require("firebase/database");

const DB_ID_PATH = process.env.DB_ID_PATH;
const DB_NAME_PATH = process.env.DB_NAME_PATH;
const DB_DATA_PATH = process.env.DB_DATA_PATH;
const fbApp = initializeApp({
  projectId: 'next-stop-app',
  databaseURL: process.env.RT_URL
});
const db = getDatabase(fbApp);

const getStopIdIndex = (stopId, callback) => {
  const indexRef = query(ref(db, DB_ID_PATH), orderByValue(), equalTo(stopId));
  onValue(indexRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      callback(childKey)
    });
  }, {
    onlyOnce: true
  });
}

const getStopNameByIndex = (dbIndex, callback) => {
  get(ref(db, `${DB_NAME_PATH}${dbIndex}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      callback(snapshot.val())
    } else {
      console.log("No stopname available");
      callback('')

    }
  }).catch((error) => {
    console.error(error);
  });
}

const getStopDataByIndex = (dbIndex, callback) => {
  get(ref(db, `${DB_DATA_PATH}${dbIndex}`)).then((snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val())
    } else {
      console.log("No stopdata available");
      callback([])
    }
  }).catch((error) => {
    console.error(error);
  });
}

module.exports = {
    getStopIdIndex,
    getStopNameByIndex,
    getStopDataByIndex
};
