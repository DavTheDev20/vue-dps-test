<script lang="ts">
import { defineComponent } from 'vue';
import Table from "./components/Table.vue";
import AddDealMenu from './components/AddDealMenu.vue';
import type { Deal } from 'interfaces';

export default defineComponent({
  components: {
    Table,
    AddDealMenu
  },
  data() {
    return {
      dealsArr: <Deal[]>[],
      showMenu: false
    }
  },
  methods: {
    handleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    async getDealData() {
      const res = await fetch("http://localhost:8080/api/deals");
      const data: any = await res.json();
      this.dealsArr = data.deals;
    },
  },
  mounted() {
    this.getDealData();
  },
  watch: {
    showMenu() {
      this.getDealData();
    }
  }
})
</script>

<template>
  <h1>Vue DPS</h1>
  <button v-if="!showMenu" class="add-deals-btn" v-bind:onClick="handleShowMenu">Add Deals</button>
  <button v-else class="view-deals-btn" v-bind:onClick="handleShowMenu">View Deals</button>
  <Table :deals="dealsArr" />
  <AddDealMenu v-if="showMenu"/>
</template>

<style scoped>
  h1 {
    text-align: center;
    margin: 1% 0;
  }

  .add-deals-btn {
    padding: 10px;
    margin: 0 0 1% 2%;
    background-color: #33b249;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.05rem;
  }
  .view-deals-btn {
    padding: 10px;
    margin: 0 0 1% 2%;
    background-color: rgb(24, 109, 255);
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.05rem;
  }
</style>
