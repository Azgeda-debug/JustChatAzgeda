import { defineStore } from 'pinia';
import { db, auth } from 'src/boot/firebase.js'
import { ref as dbRef, set, get, onChildAdded, onChildChanged, update, orderByChild, query, endAt, startAt } from "firebase/database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { ref as vueRef } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const router = useRouter()

  const usersData = vueRef({})
  const userDetails = vueRef({})
  const currentUsers = vueRef({})

  const firebaseRegisterUser = (payLoad, $q) => {
    if (!payLoad.name.trim() || !payLoad.email || !payLoad.password || !payLoad.surname) {
      $q.notify({
        color: 'red-5',
        icon: 'warning',
        message: 'Fill in all fields',
        dark: true
      })
    }
    else {
      $q.loading.show()
      createUserWithEmailAndPassword(auth, payLoad.email, payLoad.password).then(response => {

        const userId = response.user.uid
        set(dbRef(db, `users/${userId}`), {
          name: payLoad.name.charAt(0).toUpperCase() + payLoad.name.slice(1).toLowerCase(),
          surname: payLoad.surname.charAt(0).toUpperCase() + payLoad.surname.slice(1).toLowerCase(),
          fullname: `${payLoad.name.charAt(0).toUpperCase() + payLoad.name.slice(1).toLowerCase()} ${payLoad.surname.charAt(0).toUpperCase() + payLoad.surname.slice(1).toLowerCase()}`,
          email: payLoad.email,
          online: true,
        })

        userDetails.value = {
          name: payLoad.name,
          email: payLoad.email,
          surname: payLoad.surname,
          id: userId
        }

        router.push('/')
      })
        .catch(function (error) {
          $q.loading.hide()
          const errorCode = error.code;

          if (errorCode == 'auth/weak-password') {
            $q.notify({
              color: 'red-5',
              icon: 'warning',
              message: 'Password is too weak',
              dark: true
            })
          } else if (errorCode == 'auth/email-already-in-use') {
            $q.notify({
              color: 'red-5',
              icon: 'warning',
              message: 'Email is already in use',
              dark: true
            })
          }
          else if (errorCode == 'auth/invalid-email') {
            $q.notify({
              color: 'red-5',
              icon: 'warning',
              message: 'Invalid email',
              dark: true
            })
          } else {
            $q.notify({
              color: 'red-5',
              icon: 'warning',
              message: 'Can not create an account',
              dark: true
            })
          }
        });
    }
  }

  const firebaseLoginUser = (payLoad, $q) => {
    $q.loading.show()
    signInWithEmailAndPassword(auth, payLoad.email, payLoad.password)
      .then(response => {
        router.push('/')

      })
      .catch((error) => {
        $q.loading.hide()
        $q.notify({
          color: 'red-5',
          icon: 'warning',
          message: 'Wrong email or password',
          dark: true
        })
      });
  }

  const firebaseLogoutUser = () => {
    signOut(auth)
    currentUsers.value = {}
  }

  const firebaseAuthStateChanged = () => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        get(dbRef(db, `users/${userId}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val()

            userDetails.value = {
              id: userId,
              name: userData.name,
              surname: userData.surname,
              email: userData.email
            }


            firebaseUpdateUsers({
              id: userDetails.value.id,
              updates: {
                online: true
              }
            })

            firebaseGetUsers()
            router.push('/')
          }
        })

      } else {
        firebaseUpdateUsers({
          id: userDetails.value.id,
          updates: {
            online: false,
            lastOnline: Date.now()
          }
        })

        userDetails.value = {}
        router.push('/auth')
      }
    });
  }

  const firebaseGetUsers = () => {
    onChildAdded(dbRef(db, `users`), snapshot => {
      if (snapshot.exists()) {
        usersData.value[snapshot.key] = {
          data: snapshot.val(),
          id: snapshot.key
        }
      }
    })

    onChildChanged(dbRef(db, `users`), snapshot => {
      if (snapshot.exists()) {
        usersData.value[snapshot.key] = {
          data: snapshot.val(),
          id: snapshot.key
        }

        for (let key in currentUsers.value) {
          if (key == snapshot.key) {
            currentUsers.value[key].online = snapshot.val().online
          }
        }
      }
    })

    const usersQuery = query(
      dbRef(db, `users/${userDetails.value.id}/alreadyMessaged`),
      orderByChild("lastMessage"),
    );

    onChildAdded(usersQuery, (snapshot) => {
      get(dbRef(db, `users/${snapshot.val().id}`)).then((data) => {
        const userData = data.val()

        let userWithDate
        if (userDetails.value.id != data.key) {
          userWithDate = {
            chatPath: data.key,
            name: userData.name,
            surname: userData.surname,
            fullname: userData.fullname,
            online: userData.online,
            lastMessage: snapshot.val().lastMessage,
          }
        };

        currentUsers.value[data.key] = userWithDate;
      });
    });

    onChildChanged(usersQuery, (snapshot) => {
      get(dbRef(db, `users/${snapshot.val().id}`)).then(data => {
        const userData = data.val()

        let userWithDate
        if (userDetails.value.id != data.key) {
          userWithDate = {
            chatPath: data.key,
            name: userData.name,
            surname: userData.surname,
            fullname: userData.fullname,
            online: userData.online,
            lastMessage: snapshot.val().lastMessage,
          }
        };

        currentUsers.value[data.key] = userWithDate;
      })
    })
  }

  const firebaseUpdateUsers = (payLoad) => {
    if (payLoad.id == undefined) return
    else update(dbRef(db, `users/${payLoad.id}`), payLoad.updates)
  }

  return {
    usersData,
    userDetails,
    currentUsers,
    firebaseRegisterUser,
    firebaseLoginUser,
    firebaseAuthStateChanged,
    firebaseLogoutUser,
    firebaseGetUsers
  }
});