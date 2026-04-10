export const emailVerifTemplateHTML = (
  username: string,
  verificationLink: string,
  email: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background-color: #f4f4f4;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
            }
            .header {
                background: #1a73e8;
                padding: 40px 20px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                color: #ffffff;
                margin: 0;
            }
            .content {
                padding: 40px 30px;
            }
            h1 {
                color: #333333;
                font-size: 24px;
                margin-bottom: 20px;
            }
            p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .username {
                color: #1a73e8;
                font-weight: 600;
            }
            .verify-button {
                display: inline-block;
                padding: 16px 40px;
                background: #1a73e8;
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 20px 0;
            }
            .button-container {
                text-align: center;
                margin: 30px 0;
            }
            .alt-link {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 30px 0;
                word-break: break-all;
            }
            .alt-link p {
                margin: 0 0 10px 0;
                font-size: 14px;
            }
            .link-text {
                color: #1a73e8;
                font-size: 14px;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #999999;
                font-size: 14px;
                margin: 5px 0;
            }
            .warning {
                background-color: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
            }
            .warning p {
                color: #856404;
                margin: 0;
                font-size: 14px;
            }
            .divider {
                height: 1px;
                background-color: #e9ecef;
                margin: 30px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1 class="logo">🚀 YourApp</h1>
            </div>
            
            <div class="content">
                <h1>Verify Your Email Address</h1>
                
                <p>Hi <span class="username">${username}</span>,</p>
                
                <p>Thanks for signing up for YourApp! We're excited to have you on board.</p>
                
                <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
                
                <div class="button-container">
                    <a href="${verificationLink}" class="verify-button">Verify My Email</a>
                </div>
                
                <div class="alt-link">
                    <p>Or copy and paste this link into your browser:</p>
                    <p class="link-text">${verificationLink}</p>
                </div>
                
                <div class="divider"></div>
                
                <div class="warning">
                    <p><strong>⚠️ Important:</strong> This verification link will expire in 24 hours. If you didn't request this email verification, please ignore this message.</p>
                </div>
                
                <p>Once verified, you'll have full access to all features on our platform.</p>
                
                <p>If you have any trouble, feel free to contact our support team.</p>
                
                <p>Best regards,<br>
                <strong>The YourApp Team</strong></p>
            </div>
            
            <div class="footer">
                <p>This email was sent to ${email}</p>
                <p>© 2024 YourApp. All rights reserved.</p>
                <p>123 Example Street, Jakarta, Indonesia</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
