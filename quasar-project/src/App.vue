<template>
  <router-view
  />
  <!-- v-if="Object.keys(currentUsers).length || route.path == '/auth'" -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUsersStore } from "stores/users";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useUsersStore();

onMounted(() => {
  store.firebaseAuthStateChanged();
});

const currentUsers = ref({});
store.$subscribe((mutation, state) => {
  currentUsers.value = store.currentUsers;
});
</script>
