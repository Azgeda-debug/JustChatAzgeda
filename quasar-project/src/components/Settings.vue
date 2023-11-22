<template>
  <div class="settings">
    <div class="position-relative">
      <q-scroll-area class="absolute full-height full-width">
        <q-list bordered padding>
          <q-item-label header>Profile settings</q-item-label>
          <q-separator />

          <q-item @click="changeSettings('username')" clickable v-ripple>
            <q-item-section>
              <q-item-label>Username</q-item-label>
              <q-item-label caption
                >Changing your display name will update how other users see and
                recognize you.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item @click="changeSettings('email')" clickable v-ripple>
            <q-item-section>
              <q-item-label>Email</q-item-label>
            </q-item-section>
          </q-item>

          <q-item @click="changeSettings('password')" clickable v-ripple>
            <q-item-section>
              <q-item-label>Password</q-item-label>
              <q-item-label caption
                >Changing your password or email will require logging in with
                the updated credentials.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item @click="changeSettings('avatar')" clickable v-ripple>
            <q-item-section>
              <q-item-label>Avatar</q-item-label>
              <q-item-label caption
                >Choosing an avatar will let other users see the avatar you have
                selected.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item
            @click="changeSettings('darkMode')"
            tag="label"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>Dark Mode</q-item-label>
              <q-item-label caption>
                {{ darkMode ? "On" : "Off" }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle v-model="darkMode" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header>Privacy and Activity Settings</q-item-label>

          <q-item
            @click="changeSettings('activeStatus')"
            tag="label"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>Active Status</q-item-label>
              <q-item-label caption>
                Disabling this option will prevent you from seeing other users'
                online status and other users will not be able to see your
                activity
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle v-model="activeStatus" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const activeStatus = ref(false);
const darkMode = ref(true);

const changeSettings = (value) => {
  if (value == "username" || value == "email" || value == "password") {
    $q.dialog({
      dark: true,
      message: `Type your new ${value}`,
      prompt: {
        model: "",
        type: value == "email" ? "email" : "text",
      },
      cancel: true,
      persistent: true,
    }).onOk((data) => {
      // console.log('>>>> OK, received', data)
    });
  } else if (value == "avatar") {
    $q.dialog({});
  } else if (value == "darkMode") {
    // firebaseUpdateSettings('darkMode')
  } else if (value == "activeStatus") {
    // firebaseUpdateSettings('activeStatus')
  }
};
</script>

<style lang="scss">
.settings {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 6.2%;
  width: 50%;
  height: 100vh;
  background: $grey-5;
  z-index: 2;
}
</style>