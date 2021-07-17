const API_URL = 'http://localhost:3000/api/invoices/';
import axios from "axios";

export const invoice = {
    namespaced: true,
    state: {
        invoice: null
    },
    mutations: {
        setInvoiceMutation(state, invoice) {
            state.invoice = invoice.data;
        }
    },
    actions: {
        async getInvoicesAction({commit}) {
            const response = await axios.get(API_URL);
            const data = await response.data;

            if (data) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        },

        async addInvoiceAction({commit}, invoice) {
            const response = await axios.post(API_URL, invoice);
            const data = await response.data;

            if (data) {
                return Promise.resolve();
            } else {
                return Promise.reject(data);
            }
        },

        async editInvoiceAction({commit}, invoice) {
            const response = await axios.put(API_URL + invoice.id, invoice);
            const data = await response.data;

            if (data) {
                return Promise.resolve();
            } else {
                return Promise.reject(data);
            }
        },

        async getInvoiceAction({commit}, id) {
            const response = await axios.get(API_URL + id);
            const data = await response.data;

            if (data) {
                commit('setInvoiceMutation', data)
            } else {
                return Promise.reject(data);
            }
        },

        async deleteInvoiceAction({commit}, id) {
            const response = await axios.delete(API_URL + id);
            const data = await response.data;

            if (data) {
                return Promise.resolve(data);
            } else {
                return Promise.reject(data);
            }
        }
    },
    getters: {
        invoiceGetter: state => {
            return state.invoice
        }
    }
};
