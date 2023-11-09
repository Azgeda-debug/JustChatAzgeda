<template>
  <div class="q-pa-md">
    <q-form @submit="submitForm" autofocus class="q-gutter-md">
      <q-input
        v-if="props.tab == 'Register'"
        dense
        :rules="[(val) => (val && val.length > 0) || 'Fill in the field']"
        lazy-rules
        outlined
        v-model="formData.name"
        type="text"
        autocomplete
        label="Name *"
      />

      <q-input
        v-if="props.tab == 'Register'"
        dense
        :rules="[(val) => (val && val.length > 0) || 'Fill in the field']"
        lazy-rules
        outlined
        v-model="formData.surname"
        type="text"
        autocomplete
        label="Surname *"
      />

      <q-input
        dense
        :rules="[(val) => (val && val.length > 0) || 'Fill in the field']"
        lazy-rules
        outlined
        v-model="formData.email"
        type="email"
        autocomplete
        label="Email *"
      />

      <q-input
        dense
        :rules="[(val) => (val && val.length > 0) || 'Fill in the field']"
        lazy-rules
        outlined
        v-model="formData.password"
        type="password"
        autocomplete
        label="Password *"
      />

      <div class="row justify-center">
        <q-btn
          :label="props.tab"
          @click.prevent="submitForm"
          type="submit"
          no-caps
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useUsersStore } from "stores/users";
import { useQuasar } from "quasar";

const $q = useQuasar();

const store = useUsersStore();

const props = defineProps({
  tab: String,
});

const formData = ref({
  name: "adam",
  surname: "",
  email: "adam@op.pl",
  password: "adam123",
});

const submitForm = () => {
  if (props.tab == "Login") {
    store.firebaseLoginUser(formData.value, $q);
  } else {
    store.firebaseRegisterUser(formData.value, $q);
  }
};
</script>