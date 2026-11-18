import env from '../configs/env';

// ─── Shared Partials ────────────────────────────────────────────────────────

const brandHeader = (title: string) => `
  <div style="background-color:#4361ee;padding:32px 24px;text-align:center;border-radius:8px 8px 0 0;">
    <span style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;">
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill="white" fill-opacity="0.18"/>
        <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="22" cy="16" r="2.2" fill="#fff"/>
      </svg>
      <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;font-family:Arial,sans-serif;">
        Client<span style="font-weight:500;opacity:0.8;">White</span>
      </span>
    </span>
    <h1 style="margin:16px 0 0;color:#ffffff;font-size:20px;font-weight:600;font-family:Arial,sans-serif;">${title}</h1>
  </div>
`;

const brandFooter = () => `
  <div style="text-align:center;padding:20px 24px;background-color:#f1f4fb;border-radius:0 0 8px 8px;">
    <p style="color:#9ca3af;font-size:12px;margin:0;font-family:Arial,sans-serif;">
      © ${new Date().getFullYear()} Client White &nbsp;·&nbsp; This is an automated message, please do not reply.
    </p>
  </div>
`;

const wrapper = (content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="font-family:Arial,sans-serif;background-color:#f4f6fb;color:#374151;margin:0;padding:40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:600px;width:100%;box-shadow:0 4px 24px rgba(67,97,238,0.10);border-radius:8px;overflow:hidden;">
          <tr><td>${content}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const bodyBlock = (content: string) => `
  <div style="padding:32px 32px 24px;background-color:#ffffff;">
    ${content}
  </div>
`;

const ctaButton = (href: string, label: string) => `
  <div style="text-align:center;margin:32px 0;">
    <a href="${href}"
      style="display:inline-block;background-color:#4361ee;color:#ffffff;padding:14px 32px;
             text-decoration:none;border-radius:6px;font-weight:700;font-size:15px;
             font-family:Arial,sans-serif;letter-spacing:0.2px;">
      ${label}
    </a>
  </div>
`;

const p = (text: string) =>
  `<p style="margin:0 0 14px;line-height:1.6;font-size:15px;color:#374151;font-family:Arial,sans-serif;">${text}</p>`;

// ─── Templates ───────────────────────────────────────────────────────────────

export const verificationEmailTemp = ({ verificationCode }: { verificationCode: string }) => {
  const verifyUrl = `${env.FRONTEND_URL}/auth/verify-email?verification-code=${verificationCode}`;

  return wrapper(
    brandHeader('Verify Your Email') +
    bodyBlock(
      p('Hello,') +
      p('Thank you for signing up for <strong>Client White</strong>. Please verify your email address by clicking the button below:') +
      ctaButton(verifyUrl, 'Verify Email Address') +
      p('This link will expire in <strong>2 hours</strong> for security reasons.') +
      p('If you did not create an account, you can safely ignore this email.') +
      p('Best regards,<br/><strong>The Client White Team</strong>')
    ) +
    brandFooter()
  );
};

export const passResetReqTemp = ({ resetURL }: { resetURL: string }) => {
  return wrapper(
    brandHeader('Reset Your Password') +
    bodyBlock(
      p('Hello,') +
      p('We received a request to reset the password for your <strong>Client White</strong> account. If you did not make this request, you can safely ignore this email.') +
      p('To reset your password, click the button below:') +
      ctaButton(resetURL, 'Reset My Password') +
      p('This link will expire in <strong>1 hour</strong> for security reasons.') +
      `<div style="background-color:#fff7ed;border-left:4px solid #f59e0b;padding:12px 16px;border-radius:0 4px 4px 0;margin-bottom:14px;">
        <p style="margin:0;font-size:13px;color:#92400e;font-family:Arial,sans-serif;">
          ⚠️ If you did not request a password reset, please contact our support team immediately.
        </p>
      </div>` +
      p('Stay safe,<br/><strong>The Client White Team</strong>')
    ) +
    brandFooter()
  );
};

export const passResetSuccessTemp = () => {
  return wrapper(
    brandHeader('Password Reset Successful') +
    bodyBlock(
      p('Hello,') +
      p('Your <strong>Client White</strong> password has been successfully reset.') +
      `<div style="text-align:center;margin:28px 0;">
        <div style="display:inline-block;background-color:#ecfdf5;border-radius:50%;width:60px;height:60px;line-height:60px;text-align:center;">
          <span style="font-size:28px;">✓</span>
        </div>
      </div>` +
      p('You can now <a href="${env.FRONTEND_URL}/login" style="color:#4361ee;font-weight:600;text-decoration:none;">sign in</a> with your new password.') +
      `<div style="background-color:#eff6ff;border-left:4px solid #4361ee;padding:12px 16px;border-radius:0 4px 4px 0;margin-bottom:14px;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1e40af;font-family:Arial,sans-serif;">Keep your account secure:</p>
        <ul style="margin:0;padding-left:18px;font-size:13px;color:#1e40af;font-family:Arial,sans-serif;">
          <li>Use a strong, unique password</li>
          <li>Never share your password with anyone</li>
          <li>Contact support if you notice unusual activity</li>
        </ul>
      </div>` +
      p('Thank you,<br/><strong>The Client White Team</strong>')
    ) +
    brandFooter()
  );
};

export const welcomeEmailTemp = ({ name }: { name: string }) => {
  return wrapper(
    brandHeader(`Welcome to Client White, ${name}!`) +
    bodyBlock(
      p('Hey there 👋') +
      p('Welcome to <strong>Client White</strong> — your all-in-one workspace for customers, leads, support tickets, and invoices.') +
      p('Here are a few things you can do to get started:') +
      `<ul style="margin:0 0 14px;padding-left:20px;font-size:15px;color:#374151;font-family:Arial,sans-serif;line-height:1.8;">
        <li><strong>Customers</strong> — keep every contact and conversation in one place</li>
        <li><strong>Leads</strong> — move deals through your pipeline</li>
        <li><strong>Tickets</strong> — resolve support requests quickly</li>
        <li><strong>Invoices</strong> — bill clients and track payments</li>
      </ul>` +
      ctaButton(`${env.FRONTEND_URL}/`, 'Open Your Dashboard') +
      p("We're glad to have you on board. Let's get to work!") +
      p('Cheers,<br/><strong>The Client White Team</strong>')
    ) +
    brandFooter()
  );
};

export const errorEmailTemp = (error: { statusCode?: number; message?: string; stack?: string }) => {
  return wrapper(
    `<div style="background:linear-gradient(to right,#ef4444,#b91c1c);padding:24px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="color:white;margin:0;font-size:20px;font-family:Arial,sans-serif;">⚠️ Error Notification</h1>
    </div>` +
    bodyBlock(
      p('Dear Developer,') +
      p('An unhandled error has occurred in the <strong>Client White</strong> application:') +
      `<div style="text-align:center;margin:20px 0;">
        <span style="font-size:28px;font-weight:800;color:#ef4444;font-family:Arial,sans-serif;">
          Error ${error.statusCode ?? 500}
        </span>
      </div>` +
      `<pre style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:14px;
                   font-size:13px;color:#991b1b;overflow-x:auto;white-space:pre-wrap;word-break:break-word;">
${error.message ?? ''}
      </pre>` +
      (error.stack
        ? `<details style="margin-top:12px;">
            <summary style="cursor:pointer;font-size:13px;color:#6b7280;font-family:Arial,sans-serif;">Stack trace</summary>
            <pre style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:12px;
                        font-size:12px;color:#374151;margin-top:8px;overflow-x:auto;white-space:pre-wrap;">
${error.stack}
            </pre>
          </details>`
        : '') +
      p('Please investigate and resolve the issue as soon as possible.') +
      p('Thank you,<br/><strong>The Client White Dev Team</strong>')
    ) +
    brandFooter()
  );
};
