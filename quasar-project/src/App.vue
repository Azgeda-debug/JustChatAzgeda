<template>
  <router-view />
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
</script>
