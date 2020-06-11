<template>
  <v-container>
    <h1 v-if="!isCartNotEmpty">У вас нет товаров</h1>
    <v-card v-for="good in cartGoods" v-bind:key="good.id" class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{good.title}}</v-list-item-title>
          <v-list-item-subtitle>{{good.price}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <div v-if="isCartNotEmpty">
      <h1>Total price: {{totalPrice}}</h1>
      <v-btn @click="makeOrder">Make order</v-btn>
    </div>
  </v-container>
</template>

<script>
import api from "../api/backend-api.js";

export default {
  data: () => ({
    cartGoods: [],
    totalPrice: 0,
    isCartNotEmpty: true
  }),

  methods: {
    loadGoodsFromCart() {
      var goods = JSON.parse(localStorage.getItem("cartGoods"));
      if (goods && goods.length != 0) {
        this.cartGoods = goods;
        this.isCartNotEmpty = true;
      } else {
        this.isCartNotEmpty = false;
      }
    },
    getTotalPrice() {
      this.cartGoods.forEach(e => {
        this.totalPrice += e.price;
      });
    },
    makeOrder() {
      api
        .createOrder(this.cartGoods)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  },

  created() {
    this.loadGoodsFromCart();
    this.getTotalPrice();
  }
};
</script>
