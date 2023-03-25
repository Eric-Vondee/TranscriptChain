import FormData from "form-data";
import Mailgun from "mailgun.js";
import { MAILGUN_API_KEY, MAILGUN_EMAIL_DOMAIN } from "../../config/index.js";
const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: MAILGUN_EMAIL_DOMAIN,
  key: MAILGUN_API_KEY,
});

const emailService = async ({ text, subject, recipient, name }) => {
  try {
    const info = await mg.messages.create(MAILGUN_EMAIL_DOMAIN, {
      from: "ericvondee5@gmail.com",
      to: recipient,
      subject: subject,
      text: text,
    });
    return info;
  } catch (e) {
    console.log(e);
  }
};

export default emailService;
