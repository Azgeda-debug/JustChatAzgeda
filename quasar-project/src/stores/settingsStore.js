import { defineStore } from 'pinia';
import { db, auth } from 'src/boot/firebase.js'
import { ref as dbRef, set, get, onChildAdded, onChildChanged, update } from "firebase/database";
import { updateEmail } from "firebase/auth";
import { ref as vueRef } from 'vue'
import { useUsersStore } from 'src/stores/users'
import { useQuasar } from 'quasar';

export const useSettingsStore = defineStore('settings', () => {

  const $q = useQuasar()

  const showSettings = vueRef(false)

  const usersStore = useUsersStore()

  const getUserId = () => {
    return usersStore.userDetails.id
  }

  const changeSetting = async (payLoad) => {
    const userId = getUserId()
    if (payLoad.name == 'name' || payLoad.name == 'email') {
      update(dbRef(db, `users/${userId}`), {
        [payLoad.name]: payLoad.content
      })
    }

    if (payLoad.name == 'email') {
      try {
        // Aktualizuj adres e-mail
        await updateEmail(auth.currentUser, payLoad.content);

        // Wyślij e-mail weryfikacyjny
        await sendEmailVerification(auth.currentUser);

        console.log('Email updated. Verification email sent.');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const firebaseUpdateAvatar = (payLoad) => {
    const userId = getUserId()

    update(dbRef(db, `users/${userId}`), {
      avatar: payLoad
    }).then(() => {
      $q.notify({
        type: 'positive',
        message: payLoad ? 'Avatar successfully updated.' : 'Avatar successfully removed'
      })

      usersStore.userDetails.avatar = payLoad
    }).catch((error) => {
      $q.notify({
        type: 'negative',
        message: 'Error while updating avatar. Please try again later.'
      })
    });
  }

  const firebaseUpdateActiveStatus = (payLoad) => {
    const userId = getUserId()

    update(dbRef(db, `users/${userId}`), {
      activeStatus: !payLoad
    })

    usersStore.userDetails.activeStatus = !payLoad
  }

  const firebaseUpdateDarkMode = (payLoad) => {
    const userId = getUserId()

    update(dbRef(db, `users/${userId}`), {
      darkMode: !payLoad
    })

    usersStore.userDetails.darkmode = !payLoad
    $q.dark.toggle()
  }

  return {
    showSettings,
    changeSetting,
    firebaseUpdateAvatar,
    firebaseUpdateActiveStatus,
    firebaseUpdateDarkMode,
  }
});

