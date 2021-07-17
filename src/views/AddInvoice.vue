<template>
    <div>
        <ActionInvoice :checkAction="'add'"/>
    </div>
</template>

<script>
    import ActionInvoice from "../components/ActionInvoice";

    export default {
        name: 'AddInvoice',
        components:{
            ActionInvoice
        }
    }
</script>
