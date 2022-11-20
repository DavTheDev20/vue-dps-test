<script lang="ts">
import { defineComponent } from 'vue';
import Table from "./components/Table.vue";
import AddDealMenu from './components/AddDealMenu.vue';

const sampleDeals = [
        {
          id: 1,
          accountName: "WILMINGTON TRUST NA",
          relationshipManager: "DAVIN REID",
          balance: 1000000,
          dealDate: new Date(2005, 6, 23)
        }
      ];

export default defineComponent({
  components: {
    Table,
    AddDealMenu
  },
  data() {
    return {
      dealsArr: sampleDeals
    }
  },
  methods: {
    handleAddNewDeal() {
      return alert("Worked")
    }
  }
})
</script>

<template>
  <h1>Vue DPS</h1>
  <button class="add-deals-btn" v-bind:onClick="handleAddNewDeal">Add Deals</button>
  <Table :deals="dealsArr" />
  <AddDealMenu />
</template>

<style scoped>
  h1 {
    text-align: center;
    margin: 1% 0;
  }

  .add-deals-btn {
    padding: 7px;
    margin: 0 0 1% 2%;
    background-color: #33b249;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
