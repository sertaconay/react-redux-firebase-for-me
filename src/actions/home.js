import { firebaseDB, imagesRef, dbRefs } from 'core/firebase';
import { browserHistory } from 'react-router';
import { GET_ONE_HOME_POST, GET_ALL_HOME_POST, CLEAR_HOME_POST, DELETE_HOME_POST } from 'core/actionTypes';
import * as firebase from 'firebase';


const dbHomeRef = firebaseDB.ref().child(dbRefs.home);

export function getAllHomePosts() {
  return ((dispatch) => {
    dbHomeRef.on('value', ((data) => {
      dispatch({
        type: GET_ALL_HOME_POST,
        data: data.val(),
        length: data.numChildren(),
      });
    }));
  });
}

export function getOneHomePost(slug) {
  return ((dispatch) => {
    dbHomeRef.orderByChild('slug').equalTo(slug).on('child_added', ((data) => {
      dispatch({
        type: GET_ONE_HOME_POST,
        data: data.val(),
        key: data.key,
      });
    }));
  });
}

export function addHomePost(data, image) {
  return (() => {
    const imageFileName = `${Math.floor(Math.random() * 100000)}-${image.name}`;
    imagesRef.child(`${dbRefs.home}/${imageFileName}`).put(image)
      .then((snap) => {
        dbHomeRef.push({
          ...data,
          image: snap.downloadURL,
          date: firebase.database.ServerValue.TIMESTAMP,
        })
          .then(() => {
            browserHistory.push(`/management/${dbRefs.home}`);
          })
          .catch((error) => {
            console.error(error);
            throw (error);
          });
      })
      .catch((error) => {
        console.error(error);
        throw (error);
      });
  });
}

function editHomePostCommon(data, key, image = null) {
  dbHomeRef.child(key).update({
    ...data,
    image: image || data.image,
    date: firebase.database.ServerValue.TIMESTAMP,
  })
    .then(() => {
      console.log('updated');
      browserHistory.push(`/management/${dbRefs.home}`);
    })
    .catch((error) => {
      console.error(error);
      throw (error);
    });
}

export function editHomePost(data, key, image = null) {
  return (() => {
    if (image) {
      const imageFileName = `${Math.floor(Math.random() * 100000)}-${image.name}`;
      imagesRef.child(`${dbRefs.home}/${imageFileName}`).put(image)
        .then((snap) => {
          editHomePostCommon(data, key, snap.downloadURL);
        })
        .catch((error) => {
          console.error(error);
          throw (error);
        });
    } else {
      editHomePostCommon(data, key);
    }
  });
}

export function deleteHomePost(key) {
  return ((dispatch) => {
    dbHomeRef.child(key).remove();
    dispatch({
      type: DELETE_HOME_POST,
      key,
    });
  });
}

export function clearHomePost() {
  return ((dispatch) => {
    dispatch({
      type: CLEAR_HOME_POST,
    });
  });
}
