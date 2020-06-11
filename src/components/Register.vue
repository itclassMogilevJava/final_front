<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration form</v-toolbar-title>
                <h1 v-if="showMessage">{{responseMessage}}</h1>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="registerRequest.username"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="registerRequest.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-checkbox v-model="registerRequest.isAdmin" :label="`Is admin`"></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Register</v-btn>
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

export default {
  data: () => ({
    registerRequest: {
      username: "",
      password: "",
      admin: true
    },
    responseMessage: "",
    showMessage: false
  }),
  methods: {
    register() {
      api
        .register(this.registerRequest)
        .then(result => {
          console.log(result);
          if (result.data.success) {
            this.$router.push("/login");
          } else {
            this.responseMessage = result.data.response;
            this.showMessage = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.responseMessage = err;
          this.showMessage = true;
        });
    }
  }
};
</script>