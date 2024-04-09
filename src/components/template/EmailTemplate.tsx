import { Html, Text } from '@react-email/components';

type Props = {
  message: string;
  email: string;
};

const EmailTemplate = ({ message, email }: Props) => {
  return (
    <Html lang="en">
      <Text>Hi, contact us {email}</Text>
      <Text>{message}</Text>
    </Html>
  );
};

export default EmailTemplate;
