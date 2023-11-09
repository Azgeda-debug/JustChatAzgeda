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
          label="Back"
          class="q-my-sm absolute-left lt-sm"
        />
        <div class="absolute-center text-center flex-center">
          <span class="text-h5">{{ pageTitle }}</span> <br />
          <span class="text-subtitle1">{{ lastOnline }}</span>
        </div>
        <q-btn
          v-if="store.userDetails.id"
          rounded
          flat
          no-caps
          dense
          @click="store.firebaseLogoutUser()"
          color="white"
          icon="logout"
          class="q-my-sm absolute-right"
        >
          Logout <br />
          {{ store.userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

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
import UsersPage from "src/pages/UsersPage.vue";
import ChatPage from "src/pages/ChatPage.vue";
import AuthPage from "src/pages/AuthPage.vue";
import { formatDistanceToNow } from "date-fns";

const store = useUsersStore();
const route = useRoute();
const router = useRouter();

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
</style>