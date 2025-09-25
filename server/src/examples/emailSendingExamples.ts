// Test file for Gmail API email sending functionality
// This demonstrates how to use the new email sending endpoint

// Example 1: Simple text email
const simpleTextEmail = {
    to: "recipient@example.com",
    subject: "Hello from CMS System",
    textBody: "This is a simple text email sent via Gmail API integration."
};

// Example 2: HTML email with CC
const htmlEmail = {
    to: "recipient@example.com",
    cc: "manager@example.com",
    subject: "Weekly Report - HTML Format",
    htmlBody: `
        <h2>Weekly Report</h2>
        <p>Dear Team,</p>
        <p>This is our <strong>weekly report</strong> with HTML formatting.</p>
        <ul>
            <li>Tasks completed: 15</li>
            <li>Tasks pending: 3</li>
            <li>Issues resolved: 8</li>
        </ul>
        <p>Best regards,<br>CMS System</p>
    `,
    textBody: "Weekly Report - Tasks completed: 15, Tasks pending: 3, Issues resolved: 8"
};

// Example 3: Email with attachment
const emailWithAttachment = {
    to: "client@example.com",
    subject: "Invoice Attached",
    textBody: "Please find the attached invoice for your recent purchase.",
    attachments: [
        {
            filename: "invoice.pdf",
            content: "JVBERi0xLjQKJdP...", // Base64 encoded file content
            contentType: "application/pdf"
        }
    ]
};

// API Usage Examples:

// Using fetch (frontend)
async function sendEmailFromFrontend(emailData: any) {
    try {
        const response = await fetch('/api/v1/emails/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Your JWT token
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();
        console.log('Email sent:', result);
        return result;
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

// Using axios (Node.js/backend)
const axios = require('axios');

async function sendEmailFromBackend(emailData: any) {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/emails/send', emailData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Your JWT token
            }
        });

        console.log('Email sent:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to send email:', error?.response?.data || error.message);
    }
}

// Example usage:
// sendEmailFromFrontend(simpleTextEmail);
// sendEmailFromBackend(htmlEmail);
// sendEmailFromBackend(emailWithAttachment);

export { simpleTextEmail, htmlEmail, emailWithAttachment, sendEmailFromFrontend, sendEmailFromBackend };