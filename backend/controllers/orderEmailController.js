import nodemailer from "nodemailer";

export const sendOrderEmail = async (req, res, skipResponse = false) => {
  try {
    const { cartItems, deliveryDetails, subtotal, paymentId, quantities } =
      req.body;

    let itemsHtml = "";

    cartItems.forEach((item) => {
      itemsHtml += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ${item.name} (Size: ${item.selectedSize})<br/>
            Qty: ${quantities[item.id]}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">
            ₹${item.price}
          </td>
        </tr>
      `;
    });

    const mailOptions = {
      from: `"Your Store" <${process.env.EMAIL_USER}>`,
      to: deliveryDetails.email,
      subject: `Order Confirmation - Payment ID: ${paymentId}`,
      html: `
        <div style="font-family:Arial; padding:20px; color:#333;">
          <h2>Order Confirmation</h2>

          <p>Hello <strong>${deliveryDetails.name}</strong>,</p>
          <p>Thank you for your order! Below are your order details:</p>

          <h3 style="margin-top:20px;">Delivery Details</h3>
          <p><strong>Name:</strong> ${deliveryDetails.name}</p>
          <p><strong>Phone:</strong> ${deliveryDetails.phone}</p>
          <p><strong>Email:</strong> ${deliveryDetails.email}</p>
          <p><strong>Address:</strong> ${deliveryDetails.address}</p>

          <h3 style="margin-top:20px;">Ordered Products</h3>

          <table style="width:100%; border-collapse: collapse;" cellpadding="6">
            <thead>
              <tr>
                <th style="text-align:left; border-bottom:1px solid #ddd;">Product</th>
                <th style="text-align:left; border-bottom:1px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <h3 style="margin-top:20px;">Price Summary</h3>
          <p><strong>Subtotal:</strong> ₹${subtotal}</p>
          <p><strong>Delivery Charges:</strong> FREE</p>
          <p><strong>Total:</strong> ₹${subtotal}</p>

          <p style="margin-top:20px;">
            <strong>Payment ID:</strong> ${paymentId}
          </p>

          <p style="margin-top:20px;">Thank you for shopping with us!</p>
        </div>
      `,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    if (!skipResponse) {
      return res.status(200).json({ message: "Order email sent!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed", error });
  }
};
