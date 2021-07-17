<template>
    <div>
        <ActionInvoice :checkAction="'edit'"/>
    </div>
</template>

<script>
    import ActionInvoice from "../components/ActionInvoice";

    export default {
        name: "EditInvoice",
        components: {
            ActionInvoice
        }
    }
</script>

<style scoped>

</style>
