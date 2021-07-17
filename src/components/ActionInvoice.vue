<template>
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
                    <template
                            v-if="checkAction === 'add'"
                    >
                        <h3>
                            Create Invoice
                        </h3>
                    </template>
                    <template
                            v-else
                    >
                        <h3>
                            Edit Invoice
                        </h3>
                    </template>
                </v-alert>
            </v-col>

            <v-col
                    cols="12"
                    md="12"
                    lg="12"
            >
                <v-card>
                    <v-card-text
                            class="text-left black--text"
                    >
                        <form>
                            <v-row>
                                <v-col
                                        cols="12"
                                        md="6"
                                        lg="6"
                                >
                                    <span>Number:</span>
                                    <v-text-field
                                            v-model="number"
                                            :error-messages="numberErrors"
                                            class="mt-2"
                                            label="Number"
                                            outlined
                                            clearable
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="6"
                                        lg="6"
                                >
                                    <span>Invoice Date:</span>
                                    <v-menu
                                            v-model="menuInvoice"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                    v-model="dateCreate"
                                                    :error-messages="dateCreateErrors"
                                                    class="mt-2"
                                                    label="Invoice Date"
                                                    append-icon="mdi-calendar"
                                                    readonly
                                                    outlined
                                                    clearable
                                                    v-bind="attrs"
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                                v-model="dateCreate"
                                                @input="menuInvoice=false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="6"
                                        lg="6"
                                >
                                    <span>Supply Date:</span>
                                    <v-menu
                                            v-model="menuSupply"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                    v-model="dateSupply"
                                                    :error-messages="dateSupplyErrors"
                                                    class="mt-2"
                                                    label="Supply Date"
                                                    append-icon="mdi-calendar"
                                                    readonly
                                                    outlined
                                                    clearable
                                                    v-bind="attrs"
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                                v-model="dateSupply"
                                                @input="menuSupply=false"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>

                                <v-col
                                        cols="12"
                                        md="12"
                                        lg="12"
                                >
                                    <span>Comment:</span>
                                    <v-textarea
                                            v-model="comment"
                                            :error-messages="commentErrors"
                                            class="mt-2"
                                            label="Comment"
                                            outlined
                                            clearable
                                    >
                                    </v-textarea>
                                </v-col>

                            </v-row>
                        </form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                v-if="checkAction === 'add'"
                                color="primary"
                                width="120"
                                @click="addInvoice"
                        >
                            Save
                        </v-btn>

                        <v-btn
                                v-else
                                color="primary"
                                width="120"
                                @click="editInvoice"
                        >
                            Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "ActionInvoice",
        props: ['checkAction'],
        mixins: [validationMixin],
        validations: {
            number: {required, minLength: minLength(3)},
            dateCreate: {required},
            dateSupply: {required},
            comment: {maxLength: maxLength(160)}
        },
        data() {
            return {
                number: '',
                dateCreate: null,
                dateSupply: null,
                comment: '',
                menuInvoice: false,
                menuSupply: false
            }
        },
        created() {
            if (this.checkAction === 'edit') {
                this.getInvoice();
            }
        },
        computed: {
            ...mapGetters('invoice', ['invoiceGetter']),

            numberErrors() {
                const errors = [];
                if (!this.$v.number.$dirty) return errors;
                !this.$v.number.minLength && errors.push('Number should have at least 3 symbols.');
                !this.$v.number.required && errors.push('Number is required.');

                return errors;
            },

            dateCreateErrors() {
                const errors = [];
                if (!this.$v.dateCreate.$dirty) return errors;
                !this.$v.dateCreate.required && errors.push('Date create is required.');

                return errors;
            },

            dateSupplyErrors() {
                const errors = [];
                if (!this.$v.dateSupply.$dirty) return errors;
                !this.$v.dateSupply.required && errors.push('Date supply is required.');

                return errors;
            },

            commentErrors() {
                const errors = [];
                if (!this.$v.comment.$dirty) return errors;
                !this.$v.comment.maxLength && errors.push('Comment must be at most 160 characters long.');

                return errors;
            },
        },
        methods: {
            ...mapActions('invoice', ['addInvoiceAction', 'getInvoiceAction', 'editInvoiceAction']),

            async addInvoice() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const invoice = {
                    no: this.number,
                    date_create: this.dateCreate,
                    supply: this.dateSupply,
                    comment: this.comment
                };

                await this.addInvoiceAction(invoice)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            async getInvoice() {
                await this.getInvoiceAction(this.$route.params.id)
                    .then(() => {
                        this.filledInvoice();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            filledInvoice() {
                this.number = this.invoiceGetter.no;
                this.dateCreate = this.invoiceGetter.date_create;
                this.dateSupply = this.invoiceGetter.supply;
                this.comment = this.invoiceGetter.comment;
            },

            async editInvoice() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const invoice = {
                    id: this.invoiceGetter.id,
                    no: this.number,
                    date_create: this.dateCreate,
                    supply: this.dateSupply,
                    comment: this.comment
                };

                await this.editInvoiceAction(invoice)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
