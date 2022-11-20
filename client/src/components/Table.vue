<script lang="ts">
    import { defineComponent } from 'vue';
    import type {Deal} from '../../interfaces';

    export default defineComponent({
        // Define types as shown below
        props: {
            deals: Array<Deal>
        }
    })
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>Account Name</th>
                <th>Relationship Manager</th>
                <th>Balance</th>
                <th>Deal Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="deal in deals" key="deal.id">
                <td>{{deal.id}}</td>
                <td>{{deal.accountName}}</td>
                <td>{{deal.relationshipManager}}</td>
                <td>${{deal.balance.toLocaleString()}}</td>
                <td>{{deal.dealDate.toLocaleDateString()}}</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}
td, th {
    border-bottom: 1px solid #ddd;
    padding: 10px;
}
tr:hover {
    background-color: rgba(221, 221, 221, 0.266);
}
</style>