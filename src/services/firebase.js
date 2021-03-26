import { firebase, FieldValue } from '../lib/firebase';

export async function isUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  console.log(result);

  return result.docs.map(user => user.data().length > 0);
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map(item => {
    return { ...item.data(), docId: item.id };
  });

  return user;
}

// export async function getProjects() {
//   const result = await firebase.firestore().collection('projects').get();
//   const projects = result.docs.map(item => {
//     return { ...item.data(), projectId: item.id };
//   });

//   return projects;
// }
