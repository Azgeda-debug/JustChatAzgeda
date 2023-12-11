<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="q-px-sm">
      <q-toolbar>
        <q-btn
          v-show="route.path.includes('/chat')"
          rounded
          flat
          no-caps
          dense
          @click="router.push('/')"
          color="white"
          icon="arrow_back"
          class="q-my-sm absolute-left lt-sm"
        />
        <q-btn
          v-show="
            (route.name == 'UsersPage' && $q.screen.width < 600) ||
            $q.screen.width > 599
          "
          flat
          round
          color="white"
          dense
          icon="settings"
          @click="settingsStore.showSettings = true"
        />
        <div class="absolute-center text-center flex-center">
          <span class="text-h5">{{ pageTitle }}</span> <br />
          <span
            v-if="otherUserDetails && otherUserDetails.data.activeStatus"
            class="text-subtitle1"
            >{{ lastOnline }}</span
          >
        </div>
        <q-btn
          v-if="route.path.includes('/chat')"
          flat
          rounded
          color="white"
          dense
          icon="info"
          class="absolute-right"
          @click="settingsStore.showSettings = true"
        />
      </q-toolbar>
    </q-header>

    <Settings />

    <q-page-container>
      <div
        class="row gt-xs"
        v-show="$q.screen.width > 599 && store.userDetails.id"
      >
        <div class="col col-sm-4 col-md-3">
          <UsersPage />
        </div>
        <div class="col-12 col-sm-8 col-md-9">
          <ChatPage />
        </div>
      </div>
      <div v-show="$q.screen.width > 599 && !store.userDetails.id">
        <AuthPage />
      </div>
      <router-view class="lt-sm" v-show="$q.screen.width < 599" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUsersStore } from "stores/users";
import { useOtherUserDetails } from "src/composables/otherUserDetails";
import { useSettingsStore } from "src/stores/settingsStore";
import UsersPage from "src/pages/UsersPage.vue";
import ChatPage from "src/pages/ChatPage.vue";
import AuthPage from "src/pages/AuthPage.vue";
import { formatDistanceToNow } from "date-fns";
import Settings from "src/components/Settings";

const store = useUsersStore();
const route = useRoute();
const router = useRouter();

const settingsStore = useSettingsStore();

const { otherUserDetails } = useOtherUserDetails();
const pageTitle = computed(() => {
  if (route.path == "/") {
    return "JustChat";
  } else if (route.path.includes("/auth")) {
    return "Login";
  } else if (otherUserDetails.value) {
    return otherUserDetails.value.data.name;
  }
});

// Determines the user's online status or calculates the time since the user was last online
const lastOnline = computed(() => {
  if (otherUserDetails.value && !otherUserDetails.value.data.online) {
    return `online ${formatDistanceToNow(
      otherUserDetails.value.data.lastOnline,
      {
        addSuffix: true,
      }
    )}`;
  } else if (otherUserDetails.value && otherUserDetails.value.data.online) {
    return "online now";
  }
});

onUnmounted(() => {
  if (store.userDetails.id) {
    router.push("/");
  } else if (!route.path.startsWith("/auth")) {
    router.push("/auth");
  }
});
</script>

<style lang="scss" scoped>
.absolute-right {
  line-height: 1;
}

.text-subtitle1 {
  line-height: 0.5rem;
}
</style>