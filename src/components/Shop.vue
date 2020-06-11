<template>
  <v-container>
    <h1 v-if="showMessage" style="color: red">{{message}}</h1>
    <div v-if="cartGoods.length != 0">
      Total goods: {{cartGoods.length}}
      <v-btn @click="goToCart">Go to cart</v-btn>
    </div>
    <v-alert v-model="showError" dense outlined type="error" dismissible>Ошибка загрзки данных</v-alert>
    <div v-if="goodsLoaded">
      <v-card v-for="good in goods" v-bind:key="good.id" class="mx-auto" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{good.title}}</v-list-item-title>
            <v-list-item-subtitle>{{good.price}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn @click="addToCart(good)" text>Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import api from "../api/backend-api.js";

export default {

  data: () => ({
    goods: "asd",
    showError: false,
    goodsLoaded: false,
    cartGoods: [],
    showMessage: false,
    message: ""
  }),

  methods: {
    loadGoods() {
      api
        .hello()
        .then(result => {
          console.log(result);
          if (result.data.success) {
            this.goodsLoaded = true;
            this.goods = result.data.response;
          } else {
            this.showError = true;
          }
        })
        .catch(err => {
          if (err.success === false) {
            this.showMessage = true;
            this.message = err.message;
          }
          this.result = err;
        });
    },
    addToCart(good) {
      this.cartGoods.push(good);
      localStorage.setItem('cartGoods', JSON.stringify(this.cartGoods))
    },
    goToCart() {
      this.$router.push('/cart')
    }
  },
  created() {
    this.loadGoods();
  }

};
</script>
