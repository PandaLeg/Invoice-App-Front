<template>
    <div>
        <v-container>
            <v-row
                    justify="start"
                    align="start"
            >
                <v-col
                        cols="12"
                        md="12"
                        lg="12"
                >
                    <v-alert
                            border="left"
                            class="text-left"
                            colored-border
                            color="blue-grey"
                    >
                        <h3>
                            Invoices
                        </h3>
                    </v-alert>
                </v-col>
                <v-col
                        cols="12"
                        md="12"
                        lg="12"
                >
                    <v-card>
                        <v-card-title>Actions</v-card-title>
                        <v-card-actions>
                            <v-btn
                                    color="primary"
                                    width="120"
                                    href="/add-invoice"
                            >
                                Add new
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col
                        cols="12"
                        md="12"
                        lg="12"
                >
                    <v-card>
                        <v-card-title>Invoices</v-card-title>
                        <v-card-text>
                            <v-data-table
                                    :headers="headers"
                                    :items="invoices"
                                    sort-by="calories"
                                    class="elevation-1"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-icon
                                            small
                                            class="mr-2"
                                            @click="redirectToUpdateInvoice(item.id)"
                                    >
                                        mdi-pencil
                                    </v-icon>

                                    <v-icon
                                            small
                                            class="mr-2"
                                            @click="deleteInvoice(item.id)"
                                    >
                                        mdi-delete
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-snackbar
                v-model="snackbar"
                :multi-line="multiLine"
        >
            Deleted successful!
            <template v-slot:action="{ attrs }">
                <v-btn
                        color="red"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Home',
        data() {
            return {
                headers: null,
                invoices: [],
                multiLine: true,
                snackbar: false
            }
        },
        created() {
            this.filledHeaders();
            this.getInvoices();
        },
        methods: {
            ...mapActions('invoice', ['getInvoicesAction', 'deleteInvoiceAction']),
            filledHeaders() {
                this.headers = [
                    {
                        text: 'Create',
                        align: 'start',
                        sortable: false,
                        value: 'dateCreate',
                    },
                    {text: 'No', value: 'number'},
                    {text: 'Supply', value: 'supply'},
                    {text: 'Comment', value: 'comment'},
                    {text: 'Actions', value: 'actions', sortable: false}
                ];
            },

            async getInvoices() {
                await this.getInvoicesAction()
                    .then(invoices => {
                        this.filledInvoices(invoices.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            filledInvoices(invoices) {
                let invoice = {
                    dateCreate: '',
                    number: '',
                    supply: '',
                    comment: ''
                };

                for (let i = 0; i < invoices.length; i++) {
                    invoice = Object.assign({},
                        {id: invoices[i].id},
                        {dateCreate: invoices[i].date_create},
                        {number: invoices[i].no},
                        {supply: invoices[i].supply},
                        {comment: invoices[i].comment},
                    );

                    this.invoices.push(invoice);
                }
            },

            redirectToUpdateInvoice(id) {
                this.$router.push('/edit-invoice/' + id);
            },

            async deleteInvoice(id) {
                await this.deleteInvoiceAction(id)
                    .then(invoice => {
                        const index = this.invoices.findIndex(i => i.id === invoice.data.id);
                        this.invoices.splice(index, 1);

                        this.snackbar = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>
