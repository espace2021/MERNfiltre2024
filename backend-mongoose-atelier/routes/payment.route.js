const express = require('express');
const router = express.Router();

const Stripe = require('stripe')('sk_test_51KtYRUD3HS4vNAwa7ANL32HQqRTywhV3JHWIp3BxAIHv04bWoz22aKlRs9Q1L6znSX2i5fu5i3Xkl9i2Goz7jAkC00LL0T3lTL');

router.post('/', async (req, res) => { 
  
    try {
        const session = await Stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: req.body.cart.map(item => {
           
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.designation,
                },
                unit_amount: item.prix*100,
              },
              quantity: item.qty,
            }
          }),
          success_url: `${process.env.CLIENT_URL}`,
          cancel_url: `${process.env.CLIENT_URL}`,
        })
    

          res.json({ sessionId: session.id })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
  });

 

router.get('/recuperer-details-transaction/:sessionID', async (req, res) => {
 
    try {
            
   /*   const pi = await Stripe.paymentIntents.list({
        limit: 1,
      });
    console.log(pi.data[0].id)
        const paymentIntent = await Stripe.paymentIntents.retrieve(pi.data[0].id);
        const emailClient =paymentIntent.receipt_email
*/
        const sessionID=req.params.sessionID
        
        const session = await Stripe.checkout.sessions.retrieve(
          sessionID
        );
        const nomClient = session.customer_details.name;
        const emailClient = session.customer_details.email;

        res.json({nomClient, emailClient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
