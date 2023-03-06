import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token) {
  console.log("le llega este token", token);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, picture, email } = ticket.getPayload();
    console.log(ticket.getPayload());
    return {
      nombre: name,
      img: picture,
      email,
    };
  } catch (error) {
    console.error("Error verifying Google token:", error.message);
    throw new Error("Invalid Google token");
  }
}
googleVerify().catch(console.error);

export { googleVerify };
