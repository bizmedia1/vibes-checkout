export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
     body: JSON.stringify({
  amount: 12000,
  currency: "NGN",
  reference: "ref_" + Date.now(), // ✅ ADD THIS LINE
  customer: {
    email: "nulhexu@email.com"
  }
})
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
