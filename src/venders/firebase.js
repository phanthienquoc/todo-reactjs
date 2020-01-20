import * as firebase from "firebase";
import { sectionModel, todoModel } from "../model/model.todo";
let database;
export const init = () => {
  let config = {
    apiKey: "AIzaSyBHsvj30Wo8vlsFgfvhuFem2O7dcaU-BFM",
    authDomain: "todos-alexander.firebaseapp.com",
    databaseURL: "https://todos-alexander.firebaseio.com",
    projectId: "todos-alexander",
    storageBucket: "todos-alexander.appspot.com",
    messagingSenderId: "358736590618",
    appId: "1:358736590618:web:bca0edb2b6d8764b165ea3",
    measurementId: "G-88V4EK0YM4"
  };
  firebase.initializeApp(config);
  database = firebase.database();
};

// retrieve from firebase
// return promise object
export const getSectionsDB = () => {
  return database.ref("/").once("value");
};
// get specified section
export const getTodoDB = sectionId => {
  return database.ref(`/${sectionId}`).once("value");
};
// add new section
export const addSection = name => {
  let key = database.ref("/").push().key;
  let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP);
  return database.ref("/" + key).set(model);
};
// add new todo item into specified section
export const addTodoItem = (id, name) => {
  return new Promise((resolve, reject) => {
    database
      .ref(`/${id}`)
      .once("value")
      .then(todo => {
        let todos = todo.val().todos || [];
        let key = database.ref(`/${id}`).push().key;
        todos.push(
          todoModel(key, name, firebase.database.ServerValue.TIMESTAMP)
        );
        database
          .ref(`/${id}/todos`)
          .set(todos)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};
