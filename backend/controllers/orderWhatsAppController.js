import twilio from "twilio";

export const sendOrderWhatsApp = async (req, res, skipResponse = false) => {
  try {
    const { cartItems, deliveryDetails, subtotal, paymentId, quantities } =
      req.body;

    let productsText = "";
    cartItems.forEach((item) => {
      productsText += `
🛍️ *${item.name}*
Size: ${item.selectedSize}
Qty: ${quantities[item._id]}
Price: ₹${item.price}

`;
    });

    const messageBody = `
📦 *Order Confirmation*

Hello *${deliveryDetails.name}*,  
Thank you for your purchase! 🎉  

📍 *Delivery Details:*  
Name: ${deliveryDetails.name}  
Phone: ${deliveryDetails.phone}  
Address: ${deliveryDetails.address}  

🛒 *Products Ordered:*  
${productsText}

💰 *Price Summary:*  
Subtotal: ₹${subtotal}  
Delivery: FREE  
*Total: ₹${subtotal}*

🧾 *Payment ID:* ${paymentId}

Thank you for shopping with us ❤️  
`;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${deliveryDetails.phone}`,
      body: messageBody,
    });

    if (!skipResponse) {
      return res.status(200).json({ message: "Order WhatsApp sent!" });
    }
  } catch (error) {
    console.error("WhatsApp error:", error);
    res.status(500).json({ message: "WhatsApp failed", error });
  }
};
