import { EmailTempType } from "../type";

export const EmailTemplate = ({ name, email, message }: EmailTempType) => (
  <div>
    <h3>Welcome, {name}!</h3>
    <i>Mail: {email}</i>
    <p>Message: {message}</p>
  </div>
);
