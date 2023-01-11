const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require("firebase-admin/database");

const DB_ID_PATH = process.env.DB_ID_PATH;
const DB_NAME_PATH = process.env.DB_NAME_PATH;
const DB_DATA_PATH = process.env.DB_DATA_PATH;

const fbApp = initializeApp({
  databaseURL: process.env.FIREBASE_RT_URI
});
const db = getDatabase(fbApp);

const getStopIdIndex = (stopId, callback) => {
  const ref = db.ref(DB_ID_PATH);
  ref.orderByValue().equalTo(stopId).limitToLast(1).on('value', (snapshot) => {

    if (snapshot.numChildren() === 1){
      snapshot.forEach((data) => {
        const childKey = data.key;
        callback(childKey)
      });
    } else {
      callback(0); //TODO: graceful error handling
    }
  }, (res) => {
    console.error('Error', res)
    callback(0) //TODO: graceful error handling
  });

}

const getStopNameByIndex = (dbIndex, callback) => {
  const ref = db.ref(`${DB_NAME_PATH}${dbIndex}`);
  ref.once('value', (data) => {
    callback(data.val())
  }, (res) => {
    console.error('Error', res)
    callback([])
  });
}

const getStopDataByIndex = (dbIndex, callback) => {
  const ref = db.ref(`${DB_DATA_PATH}${dbIndex}`);
  ref.once('value', (data) => {
    console.log('data.val()', data.val())

    callback(data.val())
  }, (res) => {
    console.error('Error', res)
    callback([])
  });
}

module.exports = {
    getStopIdIndex,
    getStopNameByIndex,
    getStopDataByIndex,
};
