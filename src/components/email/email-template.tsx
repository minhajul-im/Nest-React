interface Props {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({ name, email, message }: Props) => (
  <div>
    <h3>Welcome, {name}!</h3>
    <i>Mail: {email}</i>
    <p>Message: {message}</p>
  </div>
);
