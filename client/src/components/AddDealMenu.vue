<script lang="ts">
import { defineComponent } from 'vue';
    export default defineComponent({
        methods: {
            handleSubmit(e: Event) {
                e.preventDefault();
               alert("Worked")
            }
        }
    })
</script>

<template>
    <div id="add-deal-menu">
        <form :on-submit="(e) => handleSubmit(e)">
            <label>Account Name: </label>
            <input type="text" />
            <label>Relationship Manager:</label>
            <input type="text" />
            <label>Deal Balance: </label>
            <input type="text" />
            <button :on-click="(e) => {
                handleSubmit(e);
            }">Submit</button>
        </form>
    </div>
</template>

<style>
    #add-deal-menu {
        top: 6vh;
        right: 22vw;
        position: absolute;
        z-index: 1;
        width: 1000px;
        height: 500px;
        background-color: blue;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input[type="text"] {
        display: block;
        margin: 10%;
        
    }

    
</style>