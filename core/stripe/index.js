require('dotenv').config();
require('../../config/connection');
require('../../config/settings');
const stripe = require('stripe')(process.env.stripe_sk);

var Stripe = {

    createCustomer: async function(email) {

        let customers = await stripe.customers.create({
            email: email,
        });

        if (customers && customers.id) {
            return customers.id;
        } else {
            return null;
        }
    },


    addCard: async function(number, month, year, cvc, customer_id) {

        let token = await stripe.tokens.create({
            card: {
                number: number,
                exp_month: month,
                exp_year: year,
                cvc: cvc,
            },
        });

        if (token && token.id) {
            let card = await stripe.customers.createSource(customer_id, {
                source: token.id
            });

            if (card && card.id) {
                return card;
            } else {
                return null;
            }

        } else {
            return null;
        }
    },

    addMoney: async function(amount, currency, customer_id, card_id, description) {

        let txn = await stripe.charges.create({
            amount: amount * 100,
            currency: currency,
            customer: customer_id,
            card: card_id,
            description: description,
        });

        if (txn && txn.id && txn.status == 'succeeded') {
            return txn.id;
        } else {
            return null;
        }
    },

    deleteCard: async function(customer_id, card_id) {
        await stripe.customers.deleteSource(
            customer_id,
            card_id,
        );

    },

    getCardToken: async function(number, month, year, cvc, email, amount,description,currency) {
        let token = await stripe.tokens.create({
            card: {
                number: number,
                exp_month: month,
                exp_year: year,
                cvc: cvc,
            },
        });

        amount = amount*100;
        let customer =  await stripe.customers.create({
            email: email, 
            source: token.id 
        });

        let charge = await   stripe.charges.create({ 
            amount,
            description: description,
            currency: currency,
            customer: customer.id
        });


        if (charge && charge.id && charge.status == 'succeeded') {
            return charge.id;
        } else {
            return null;
        }
            
    },
}

module.exports = Stripe;

// Stripe.createCustomer('edi@demo.com').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err.message);
// })

