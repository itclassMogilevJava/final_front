<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn @click="goToMainPage" primary>На главную</v-btn>
      <v-btn @click="goToLoginPage" style="margin-left:10px">Войти</v-btn>
      <v-btn @click="goToRegisterPage" style="margin-left:10px">Зарегистрироваться</v-btn>
      <v-btn @click="logout" style="margin-left:10px">Выйти</v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import LocalStorageService from "./service/LocalStorageService.js";

const localStorageService = LocalStorageService.getService();
export default {
  methods: {
    goToLoginPage() {
      this.$router.push('/login')},
    goToRegisterPage() {
      this.$router.push('/register')},
    goToMainPage() {
      this.$router.push('/')},
    logout() {
      localStorageService.clearToken();
      this.$router.push("/register");
    }
  }
};
</script>
