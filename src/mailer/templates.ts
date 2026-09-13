/** Plain, inline-styled HTML email bodies — no template engine needed for a handful of transactional emails. */

function wrapper(bodyHtml: string): string {
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#15181a;">
    <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#e2711d;font-weight:700;">Animalife USA</p>
    ${bodyHtml}
    <p style="margin-top:32px;font-size:12px;color:#8b9190;">Animalife USA &middot; Affiliate Program</p>
  </div>`;
}

export function approvalEmail(params: { fullName: string; loginUrl: string; tempPassword: string; referralLink: string }) {
  return {
    subject: 'Your Animalife affiliate account is approved',
    html: wrapper(`
      <h1 style="font-size:20px;">Welcome to the program, ${params.fullName}!</h1>
      <p>Your affiliate application has been approved. Here's how to get started:</p>
      <p><b>Portal:</b> <a href="${params.loginUrl}">${params.loginUrl}</a><br/>
      <b>Temporary password:</b> ${params.tempPassword}</p>
      <p>You'll be asked to set a new password the first time you log in.</p>
      <p><b>Your referral link:</b> <a href="${params.referralLink}">${params.referralLink}</a></p>
    `),
  };
}

export function newCommissionEmail(params: { fullName: string; orderNumber: string; commissionAmount: string; dashboardUrl: string }) {
  return {
    subject: `You earned a new commission — ${params.commissionAmount}`,
    html: wrapper(`
      <h1 style="font-size:20px;">Nice work, ${params.fullName}!</h1>
      <p>Order <b>${params.orderNumber}</b> was just referred by your link, earning you <b>${params.commissionAmount}</b> in commission.</p>
      <p><a href="${params.dashboardUrl}">View your dashboard →</a></p>
    `),
  };
}

export function payoutSentEmail(params: { fullName: string; amount: string; method: string; dashboardUrl: string }) {
  return {
    subject: `You've been paid ${params.amount}`,
    html: wrapper(`
      <h1 style="font-size:20px;">You've been paid, ${params.fullName}!</h1>
      <p><b>${params.amount}</b> was just sent to you via ${params.method === 'stripe_connect' ? 'Stripe' : 'manual payout'}.</p>
      <p><a href="${params.dashboardUrl}">View your payout history →</a></p>
    `),
  };
}

export function verificationEmail(params: { fullName: string; verifyUrl: string }) {
  return {
    subject: 'Confirm your email for the Animalife affiliate program',
    html: wrapper(`
      <h1 style="font-size:20px;">One more step, ${params.fullName}</h1>
      <p>Please confirm this is your email address so we can reach you about your application and, if approved, your account.</p>
      <p><a href="${params.verifyUrl}">${params.verifyUrl}</a></p>
    `),
  };
}

export function passwordResetEmail(params: { fullName: string; resetUrl: string }) {
  return {
    subject: 'Reset your Animalife affiliate password',
    html: wrapper(`
      <h1 style="font-size:20px;">Password reset requested</h1>
      <p>Hi ${params.fullName}, click below to set a new password. This link expires in 1 hour.</p>
      <p><a href="${params.resetUrl}">${params.resetUrl}</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `),
  };
}
