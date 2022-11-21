<script lang="ts">
import { defineComponent } from 'vue';
import type { Deal } from 'interfaces';
export default defineComponent({
  data() {
    return {
      accountName: '',
      relationshipManager: '',
      balance: '',
    };
  },
  methods: {
    async onsubmit(e: Event) {
      e.preventDefault();
      const dealData = {
        accountName: this.accountName.toUpperCase(),
        relationshipManager: this.relationshipManager.toUpperCase(),
        balance: this.balance,
      };
      if (!dealData.accountName || !dealData.relationshipManager || !dealData.balance) {
        return alert("Please enter values in all inputs.")
      }
      const res = await fetch('http://localhost:8080/api/deals', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dealData),
      });
      const data = await res.json();
      if (data.success === true) {
        this.accountName = '';
        this.relationshipManager = '';
        this.balance = '';
      } else {
        alert(data.error);
      }
    },
    oninput(e: Event) {
      const { target } = e;
      const { value, name }: any = target;
      if (name === 'accountName') {
        this.accountName = value;
      } else if (name === 'relationshipManager') {
        this.relationshipManager = value;
      } else if (name === 'balance') {
        this.balance = value;
      }
    },
  },
});
</script>

<template>
  <div id="add-deal-menu">
    <form v-on:submit="onsubmit">
      <label>Account Name: </label>
      <input
        :value="accountName"
        @input="oninput"
        type="text"
        name="accountName"
      />
      <label>Relationship Manager:</label>
      <input
        :value="relationshipManager"
        @input="oninput"
        type="text"
        name="relationshipManager"
      />
      <label>Deal Balance: </label>
      <input :value="balance" @input="oninput" type="text" name="balance" />
      <button>Submit</button>
    </form>
  </div>
</template>

<style>
#add-deal-menu {
  top: 10vh;
  right: 17vw;
  position: absolute;
  z-index: 1;
  width: 1000px;
  height: 500px;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  label {
    color: #fff;
  }

form {
  display: flex;
  flex-direction: column;
}

input[type='text'] {
  display: block;
  margin: 10%;
  padding: 10px;
  width: 100%;
}
button {
    cursor: pointer;
}
</style>
