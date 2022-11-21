<script lang="ts">
    import { defineComponent } from 'vue';
    import type {Deal} from '../../interfaces';

    export default defineComponent({
        // Define types as shown below
        props: {
            deals: Array<Deal>
        },
        data() {
            return {
                dealsTotal: 0
            }
        },
        methods:  {
            getTotal() {
                let total = 0;
                this.deals?.map(deal => {
                    total += deal.balance;
                })
                this.dealsTotal = total;
            }
        },
        mounted() {
            this.getTotal();
        },
        watch: {
            deals() {
                this.getTotal();
            }
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
                <td><a href="#">{{deal.accountName}}</a></td>
                <td>{{deal.relationshipManager}}</td>
                <td>${{deal.balance.toLocaleString()}}</td>
                <td>{{new Date(deal.dealDate).toDateString()}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td><strong>${{dealsTotal.toLocaleString()}}</strong></td>
                <td></td>
            </tr>
        </tfoot>
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