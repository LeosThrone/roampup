import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  code: string;
  name?: string;
}

export const ResetPasswordEmail = ({
  code = "123456",
  name = "Adventurer",
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your RoamPup verification code: {code}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Bar */}
          <Section style={headerBar}>
            <Text style={logoText}>🐾 RoamPup</Text>
          </Section>

          {/* Email Content Body */}
          <Section style={contentSection}>
            <Heading style={heading}>Forgot your password?</Heading>
            <Text style={paragraph}>Hey {name},</Text>
            <Text style={paragraph}>
              We received a request to reset your RoamPup account password. Use the
              verification code below to complete your password reset:
            </Text>

            {/* Verification Code Box */}
            <Section style={codeContainer}>
              <Text style={codeText}>{code}</Text>
            </Section>

            <Text style={expiryText}>
              ⏱️ This verification code is valid for <strong>15 minutes</strong>.
            </Text>

            <Hr style={hr} />

            <Text style={securityNotice}>
              If you did not request a password reset, you can safely ignore this
              email — your password will remain unchanged and your account is secure.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} RoamPup. Road trips & waypoint adventures.
            </Text>
            <Text style={footerText}>
              Need help? Contact{" "}
              <Link href="mailto:support@roampup.io" style={footerLink}>
                support@roampup.io
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

// Neobrutalist Email Styles
const main: React.CSSProperties = {
  backgroundColor: "#fbf9f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "3px solid #1b1c1a",
  borderRadius: "16px",
  boxShadow: "6px 6px 0px #1b1c1a",
  maxWidth: "520px",
  margin: "0 auto",
  overflow: "hidden",
};

const headerBar: React.CSSProperties = {
  backgroundColor: "#ffe500",
  borderBottom: "3px solid #1b1c1a",
  padding: "16px 24px",
};

const logoText: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#1b1c1a",
  margin: "0",
  letterSpacing: "-0.5px",
};

const contentSection: React.CSSProperties = {
  padding: "32px 32px 24px 32px",
};

const heading: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "800",
  color: "#1b1c1a",
  margin: "0 0 16px 0",
  letterSpacing: "-0.5px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4b4731",
  margin: "0 0 14px 0",
};

const codeContainer: React.CSSProperties = {
  backgroundColor: "#f5f3f0",
  border: "2px solid #1b1c1a",
  borderRadius: "10px",
  boxShadow: "4px 4px 0px #1b1c1a",
  margin: "24px 0",
  padding: "18px 0",
  textAlign: "center" as const,
};

const codeText: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: "800",
  color: "#1b1c1a",
  letterSpacing: "8px",
  margin: "0",
  fontFamily: 'monospace, "Courier New", Courier',
};

const expiryText: React.CSSProperties = {
  fontSize: "13px",
  color: "#726600",
  fontWeight: "600",
  margin: "0 0 20px 0",
  textAlign: "center" as const,
};

const hr: React.CSSProperties = {
  borderTop: "2px dashed #cec7aa",
  borderBottom: "none",
  borderLeft: "none",
  borderRight: "none",
  margin: "20px 0",
};

const securityNotice: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#7d775f",
  margin: "0",
};

const footer: React.CSSProperties = {
  backgroundColor: "#efeeeb",
  borderTop: "2px solid #1b1c1a",
  padding: "16px 24px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  fontSize: "12px",
  color: "#7d775f",
  margin: "4px 0",
};

const footerLink: React.CSSProperties = {
  color: "#1b1c1a",
  fontWeight: "700",
  textDecoration: "underline",
};
