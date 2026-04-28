# Privacy Policy

**Effective Date:** 24 April 2026  
**Last Updated:** 24 April 2026

**Contact:** admin@atikayda.au  
**Operator:** Wagmi Labs Pty Ltd (ACN 696 024 987), Brisbane, Australia

---

## What This Policy Covers

This privacy policy describes how Wagmi Labs ("we", "us") collects, uses, and protects information when you use:

- The Sigil Auth mobile app (iOS and Android)
- The Sigil Auth desktop app (macOS, Windows, Linux)
- The push relay service at `relay.sigilauth.com`
- The website at `sigilauth.com`

**If you self-host Sigil Auth:** This policy does NOT apply to your self-hosted deployment. You become the data controller for any information processed by your instance. Sigil Auth is open-source software licensed under AGPL-3.0 — you are responsible for your own privacy compliance when operating the software.

This policy applies only to Wagmi Labs-operated services.

---

## What We Don't Collect

Let's start here, because it matters.

Sigil Auth is designed to authenticate devices, not identify people. We **do not collect**:

- Your name
- Your email address
- Your phone number
- Any government-issued identifier
- Biometric templates (Face ID, Touch ID, fingerprint scans — these stay on your device)
- Location data
- Browsing history
- Usage analytics or telemetry
- Crash reports
- Any personally identifiable information in the traditional sense

There are no user accounts. There is no marketing database. There are no analytics pixels. We built it this way on purpose.

---

## What We Do Collect

When you use Sigil Auth, we collect the minimum information necessary to route push notifications to your device:

### 1. Device Public Key
When you register a device, the app generates an ECDSA P-256 cryptographic keypair in hardware-backed secure storage (Secure Enclave on iOS, StrongBox on Android). The **public key** is transmitted to the push relay.

The corresponding **private key never leaves your device's secure hardware**. It cannot be exported, backed up, or transmitted.

### 2. Device Fingerprint
We derive a **device fingerprint** by computing SHA256(device_public_key). This is a pseudonymous identifier — a 64-character hex string that uniquely identifies a device but cannot be linked to a real-world identity by us.

### 3. Push Token
Your device receives a push notification token from Apple (APNs) or Google (FCM) when the app is installed. We store this token mapped to your device fingerprint so we can route authentication challenges to the correct device.

**That's it.** The relay stores: `device_fingerprint → push_token`. Nothing more.

### 4. Technical Information (Website Only)
When you visit `sigilauth.com`, standard web server logs may temporarily record your IP address, browser type, and requested URL. These logs are retained for operational security purposes (rate limiting, DDoS mitigation) and are not linked to any device fingerprint or user identity.

We do not use cookies for tracking or analytics. No third-party analytics services are embedded on the site.

---

## How We Use This Information

We use device fingerprints and push tokens for exactly one purpose: **routing authentication challenges to your device via push notifications.**

Here's how it works:

1. A third-party application (a service you've integrated with Sigil) requests authentication.
2. That application sends a signed challenge to the Sigil relay, addressed to your device fingerprint.
3. The relay looks up your push token and forwards the challenge to Apple (APNs) or Google (FCM).
4. APNs/FCM delivers the push notification to your device.
5. Your device verifies the challenge signature, prompts you for biometric authentication, and returns a signed response directly to the requesting application.

**We never see the contents of your authentication responses.** The relay is a pass-through delivery service. The cryptographic verification happens between your device and the application you're authenticating with.

We do not use your information for:

- Marketing or advertising
- Profiling or automated decision-making (see Automated Decision-Making section below)
- Analytics or user research
- Training machine learning models
- Any purpose other than routing push notifications

---

## Legal Basis for Processing (GDPR)

For users in the European Union or United Kingdom, we rely on the following lawful bases under Article 6(1) GDPR:

- **Contractual Necessity (Art 6(1)(b)):** Processing your device fingerprint and push token is necessary to provide the push authentication service you requested by installing the app and registering your device.

You can withdraw this processing basis at any time by unregistering your device through the app (see Your Rights below).

---

## Third-Party Service Providers

We disclose device fingerprints and push tokens to the following third-party providers solely for the purpose of delivering push notifications:

- **Apple Push Notification Service (APNs):** For iOS devices. Apple's privacy policy: https://www.apple.com/legal/privacy/
- **Google Firebase Cloud Messaging (FCM):** For Android devices. Google's privacy policy: https://policies.google.com/privacy

These providers receive your push token and the encrypted notification payload. They do not receive any personal information beyond what is necessary to route the notification to your device.

We do not sell, rent, or otherwise share your information with any other third parties. There are no advertising networks, analytics providers, or data brokers involved.

---

## Data Retention

We retain your device fingerprint and push token only as long as your device is registered with the relay.

**When you unregister:**
- Delete the Sigil app from your device, OR
- Use the "Unregister Device" function in the app settings

...we immediately delete your device fingerprint and push token from the relay database.

**Inactive devices:** If a device has not successfully received a push notification for 365 consecutive days, we may automatically purge its registration from the relay.

**Server logs:** Web server logs (IP address, timestamp, request path) are retained for 90 days and then automatically deleted.

---

## International Data Transfers

Our push relay service is hosted on cloud infrastructure in Australia (AWS ap-southeast-2 region).

When you use Sigil Auth:

- **Australian users:** Your data is processed within Australia.
- **EU/UK users:** Your device fingerprint and push token may be transferred outside the EEA/UK to Australia. We rely on **Standard Contractual Clauses (SCCs)** approved by the European Commission as the transfer mechanism.
- **All users:** Push tokens are necessarily shared with Apple (USA) or Google (USA) to enable push notification delivery. These transfers are covered by Apple's and Google's respective data transfer safeguards.

By using Sigil Auth, you acknowledge and consent to these international transfers as necessary to provide the service.

---

## Security

We take reasonable measures to protect your information:

- All data in transit is encrypted using TLS 1.3 or higher.
- The relay database is encrypted at rest.
- Access to production infrastructure is restricted to authorised personnel with multi-factor authentication.
- Sigil Auth's source code is open-source (AGPL-3.0) and publicly auditable at https://github.com/sigilauth

**But here's the important part:** There is very little personal information to leak. Device fingerprints are pseudonymous hashes. Push tokens are opaque identifiers. Even in a worst-case data breach, an attacker would obtain a list of SHA256 hashes and push tokens — not names, emails, or identities.

The cryptographic design minimises the blast radius.

If we become aware of a data breach that is likely to result in a risk to your rights, we will notify affected users and relevant supervisory authorities as required by applicable law (including the Notifiable Data Breaches scheme under Part IIIC of the Privacy Act 1988 (Cth) and Article 33 GDPR).

---

## Automated Decision-Making

Sigil Auth does not use personal information for automated decision-making that significantly affects your rights or interests.

**No profiling, no AI, no algorithmic decisions.** The relay performs one automated operation: mapping a device fingerprint to a push token and forwarding a notification. This is a technical routing function, not a decision that affects your rights.

**Compliance note:** From 10 December 2026, Australian Privacy Principles (APPs) 1.7–1.9 require disclosure of automated decision-making systems. As of this policy's effective date, Sigil Auth does not operate any systems that trigger these disclosure requirements. If this changes, we will update this policy accordingly.

---

## Children's Privacy

Sigil Auth is not directed at children under 13 years of age (or 16 in the EU). We do not knowingly collect information from children. If we become aware that we have inadvertently collected information from a child, we will delete it promptly.

If you are a parent or guardian and believe your child has provided information to us, please contact admin@atikayda.au.

---

## Your Rights

You have the following rights regarding your information:

### For All Users:
- **Unregister your device:** Delete the app or use the in-app unregister function. This immediately deletes your device fingerprint and push token from our relay.

### For Australian Users (Privacy Act 1988):
- **Access:** Request a copy of the information we hold about you (device fingerprint and push token).
- **Correction:** Request correction if your information is inaccurate (unlikely, as we store only cryptographic identifiers).
- **Erasure:** Request deletion of your information.
- **Complaint:** Lodge a complaint with the Office of the Australian Information Commissioner (OAIC): https://www.oaic.gov.au/

### For EU/UK Users (GDPR / UK GDPR):
- **Access (Art 15):** Request a copy of your personal data.
- **Rectification (Art 16):** Request correction of inaccurate data.
- **Erasure (Art 17):** Request deletion ("right to be forgotten").
- **Restriction (Art 18):** Request restriction of processing.
- **Portability (Art 20):** Receive your data in a structured, machine-readable format.
- **Objection (Art 21):** Object to processing based on legitimate interests.
- **Complaint:** Lodge a complaint with your supervisory authority. For UK users: Information Commissioner's Office (ICO), https://ico.org.uk/

### For California Users (CCPA):
- **Access:** Request disclosure of what personal information we've collected.
- **Deletion:** Request deletion of your personal information.
- **Do Not Sell:** We do not sell personal information. This right is not applicable.

**To exercise any of these rights:** Email admin@atikayda.au with your device fingerprint (visible in the app under Settings → Device Info). We will respond within 30 days.

---

## Changes to This Policy

We may update this privacy policy from time to time. If we make material changes, we will:

1. Update the "Last Updated" date at the top of this page.
2. Notify you via push notification or in-app banner before the changes take effect.
3. For changes that reduce your rights or expand our data collection, we will seek your consent where required by law.

Continued use of Sigil Auth after a policy change constitutes acceptance of the updated policy.

**Version history:** Previous versions of this policy are archived at https://github.com/sigilauth/sigilauth.com/commits/main/privacy.md

---

## Third-Party Applications

When you use Sigil Auth to authenticate with a third-party application:

- **That application** controls the user-to-device mapping. They decide which device fingerprints belong to which user accounts.
- **We do not have access** to these mappings. We cannot link a device fingerprint to a user identity.
- **Their privacy policy applies** to how they handle your information. Read their policy before integrating.

Wagmi Labs is not responsible for the privacy practices of third-party applications that integrate with Sigil Auth.

---

## Contact Us

If you have questions, concerns, or requests regarding this privacy policy, contact us at:

**Email:** admin@atikayda.au  
**Postal Address:**  
Wagmi Labs Pty Ltd  
Brisbane, Queensland  
Australia

For data protection enquiries under GDPR, you may also contact our nominated EU representative (if appointed) at the address listed on our website.

---

## Governing Law

This privacy policy is governed by the laws of Queensland, Australia. Any disputes arising from or relating to this policy will be subject to the exclusive jurisdiction of the courts of Queensland.

For EU users, this does not affect your rights under GDPR or your ability to bring proceedings in your local supervisory authority.

---

**Last reviewed:** 24 April 2026

This policy reflects our commitment to privacy-by-design. We collect as little as possible, use it only for the stated purpose, and delete it when you're done. If you have feedback on how we can do better, we'd like to hear it: admin@atikayda.au.
