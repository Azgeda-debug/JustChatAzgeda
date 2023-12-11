<template>
  <q-dialog
    v-model="settingsStore.showSettings"
    transition-show="slide-right"
    transition-hide="slide-left"
    transition-duration="750"
  >
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
                  >Changing your display name will update how other users see
                  and recognize you.</q-item-label
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
                  >Choosing an avatar will let other users see the avatar you
                  have selected.</q-item-label
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
                  Disabling this option will prevent you from seeing other
                  users' online status and other users will not be able to see
                  your activity
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-toggle v-model="activeStatus" />
              </q-item-section>
            </q-item>

            <q-separator />
            <q-item-label header>Others</q-item-label>

            <q-item
              @click="UsersStore.firebaseLogoutUser"
              tag="label"
              clickable
              v-ripple
            >
              <q-item-label>Logout</q-item-label>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-dialog
          v-model="showChangeSettingsDialog"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Change {{ settingItem }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="settingItemContent"
                autofocus
                @keyup.enter="prompt = false"
                :type="settingItem == 'email' ? 'email' : 'text'"
              />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                @click="changeItem"
                flat
                v-close-popup
                :label="`Change ${settingItem}`"
                class="text-primary"
              />
              <q-btn flat label="Cancel" class="text-red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog
          v-model="showAvatarDialog"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="q-pa-md" flat bordered>
            <q-item class="column col">
              <q-item-section>
                <q-item-label class="text-h6 q-pb-md text-center"
                  >Choose Your Avatar</q-item-label
                >
              </q-item-section>
              <q-item-section>
                <q-list class="flex flex-center">
                  <q-item
                    clickable
                    v-ripple
                    v-for="n in 6"
                    :key="n"
                    class="avatar"
                    @click="changeAvatar(n)"
                    v-close-popup
                  >
                    <q-avatar>
                      <img :src="`https://cdn.quasar.dev/img/avatar${n}.jpg`" />
                    </q-avatar>
                  </q-item>
                </q-list>
              </q-item-section>
            </q-item>

            <q-card-actions align="right">
              <q-btn
                v-if="UsersStore.userDetails.avatar"
                @click="removeAvatar"
                flat
                v-close-popup
                label="Remove avatar"
                class="text-red"
              />
              <q-btn flat label="Cancel" class="text-red" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useSettingsStore } from "src/stores/settingsStore";
import { useUsersStore } from "src/stores/users";

const $q = useQuasar();

const settingsStore = useSettingsStore();
const UsersStore = useUsersStore();

const showAvatarDialog = ref(false);
const showChangeSettingsDialog = ref(false);
const settingItem = ref("");
const settingItemContent = ref("");

const activeStatus = ref(true);
const darkMode = ref(false);
const changeSettings = (value) => {
  if (value == "password" || value == "username" || value == "email") {
    showChangeSettingsDialog.value = true;
    settingItem.value = value;
  } else if (value == "avatar") {
    showAvatarDialog.value = true;
  } else if (value == "darkMode") {
    settingsStore.firebaseUpdateDarkMode(darkMode.value);
  } else if (value == "activeStatus") {
    settingsStore.firebaseUpdateActiveStatus(activeStatus.value);
  }
};

const changeItem = () => {
  const itemToChange = {
    name: settingItem.value,
    content: settingItemContent.value,
  };

  settingsStore.changeSetting(itemToChange);
  settingItemContent.value = "";
};

const changeAvatar = (value) => {
  const selectedAvatar = `https://cdn.quasar.dev/img/avatar${value}.jpg`;
  settingsStore.firebaseUpdateAvatar(selectedAvatar);
};

const removeAvatar = () => {
  settingsStore.firebaseUpdateAvatar(false);
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

.avatar {
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.35);
  }
}
</style>