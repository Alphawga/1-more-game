interface EmailTemplateData {
  name?: string;
  link: string;
}

export const emailTemplates = {
  verification: (data: EmailTemplateData): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Verify your email</title>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Welcome to 1MoreGame${data.name ? `, ${data.name}` : ''}!</h2>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${data.link}" class="button">Verify Email</a>
          <p>If you didn't create an account with us, you can safely ignore this email.</p>
          <div class="footer">
            <p>This link will expire in 24 hours.</p>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p>${data.link}</p>
          </div>
        </div>
      </body>
    </html>
  `,

  resetPassword: (data: EmailTemplateData): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset your password</title>
        <style>
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to choose a new password:</p>
          <a href="${data.link}" class="button">Reset Password</a>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <div class="footer">
            <p>This link will expire in 1 hour.</p>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p>${data.link}</p>
          </div>
        </div>
      </body>
    </html>
  `,
}; 