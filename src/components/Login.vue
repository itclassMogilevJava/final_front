<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <h1 v-if="showMessage">{{responseMessage}}</h1>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom></v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    v-model="loginRequest.username"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="loginRequest.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import api from "../api/backend-api.js";
import LocalStorageService from "../service/LocalStorageService.js";

const localStorageService = LocalStorageService.getService();

export default {
  data: () => ({
    loginRequest: {
      username: "",
      password: ""
    },
    responseMessage: "",
    showMessage: false
  }),
  methods: {
    login() {
      api
        .login(this.loginRequest)
        .then(result => {
          localStorageService.setToken(result.data.id_token);
          this.$router.push('/');
        })
        .catch(err => {
          this.responseMessage = "Неправильный логин или пароль";
          this.showMessage = true;
          console.log(err);
        });
    }
  }
};
</script>