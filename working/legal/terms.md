# Terms of Service

**Effective Date:** 24 April 2026  
**Last Updated:** 24 April 2026

**Contact:** admin@atikayda.au  
**Operator:** Wagmi Labs Pty Ltd (ACN 696 024 987), Brisbane, Australia

---

## 1. Acceptance of Terms

By using the Sigil Auth mobile app, desktop app, push relay service, or website (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").

**If you do not agree to these Terms, do not use the Service.**

These Terms constitute a legally binding agreement between you and Wagmi Labs Pty Ltd ("Wagmi Labs", "we", "us"). If you are using the Service on behalf of an organisation, you represent and warrant that you have authority to bind that organisation to these Terms.

---

## 2. What Sigil Auth Is

Sigil Auth is an **open-source, hardware-backed cryptographic authentication system**. It enables strong authentication using public-key cryptography and biometric verification, without relying on passwords or shared secrets.

**Key characteristics:**

- **Open source:** The software is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). The source code is publicly available at https://github.com/sigilauth
- **No user accounts:** Sigil Auth authenticates devices, not people. There are no traditional user accounts, email addresses, or passwords.
- **Self-hostable:** Anyone can deploy their own instance of the Sigil Auth server and relay under the AGPL-3.0 license.
- **Operated by Wagmi Labs:** The reference push relay service at `relay.sigilauth.com` is operated by Wagmi Labs for convenience. Use of this relay is subject to these Terms.

---

## 3. License to Use

### 3.1 Wagmi Labs-Operated Services

We grant you a limited, non-exclusive, non-transferable, revocable license to use the Sigil Auth mobile app, desktop app, and push relay service for their intended purpose: cryptographic authentication.

This license does not include the right to:

- Reverse-engineer, decompile, or disassemble the compiled binaries (except as permitted by law or the AGPL-3.0 license).
- Use the Service for any unlawful purpose.
- Abuse, harass, or interfere with other users or the operation of the Service.

### 3.2 Open Source Software

The Sigil Auth **software** (apps, server, relay) is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. This copyleft license grants you the right to use, modify, and distribute the software, subject to the terms of the AGPL-3.0.

The API specifications and protocol documentation are licensed under the **Apache License 2.0**, allowing broader compatibility and implementation without copyleft obligations.

**You are free to self-host Sigil Auth.** If you do, these Terms apply only to your use of the Wagmi Labs-operated relay service. You are responsible for your own compliance with applicable laws when operating the software.

Full license texts:
- AGPL-3.0: https://www.gnu.org/licenses/agpl-3.0.html
- Apache-2.0: https://www.apache.org/licenses/LICENSE-2.0

---

## 4. No User Accounts

Sigil Auth does not create traditional user accounts. When you install the app and register a device:

1. The app generates a cryptographic keypair in your device's secure hardware (Secure Enclave on iOS, StrongBox on Android).
2. The public key is registered with the push relay.
3. A **device fingerprint** (SHA256 hash of the public key) becomes your device's identifier.

**You are responsible for your device.** There is no password reset, no account recovery, no "forgot my password" flow. If you lose access to your device or uninstall the app without backing up your recovery mnemonic (if provided by the integrating application), you cannot recover your authentication credentials.

Third-party applications that integrate with Sigil Auth may provide their own account recovery mechanisms. Those mechanisms are outside the scope of these Terms and the Sigil Auth Service.

---

## 5. Acceptable Use

You agree not to:

- **Abuse the relay service:** Send excessive or malicious authentication requests designed to overload the relay or third-party services.
- **Circumvent rate limits:** Use multiple devices, VPNs, or other techniques to evade rate limiting or abuse prevention measures.
- **Impersonate others:** Register devices or send authentication challenges pretending to be another person or entity.
- **Interfere with the Service:** Attempt to hack, disrupt, or degrade the availability or security of the Service.
- **Violate laws:** Use the Service for any purpose that violates Australian law or the laws of your jurisdiction.

We reserve the right to suspend or terminate access to the relay service for violations of these acceptable use rules.

---

## 6. Privacy and Data Protection

Your use of the Service is also governed by our **Privacy Policy** (available at https://sigilauth.com/privacy).

By using the Service, you acknowledge that:

- We collect minimal information (device fingerprint and push token) as described in the Privacy Policy.
- Biometric authentication (Face ID, Touch ID, fingerprint) is performed entirely on your device. Biometric templates never leave your device.
- The private key in your device's secure hardware is never transmitted to us or any third party.

For detailed information on how we handle data, see the Privacy Policy.

---

## 7. Third-Party Integrations

Sigil Auth is designed to integrate with third-party applications (e.g., websites, SaaS platforms, corporate systems). When you use Sigil Auth with a third-party application:

- **The third party controls the authentication flow.** They decide when to request authentication, what actions require multi-party approval, and how to handle failed authentication attempts.
- **The third party owns the user-to-device mapping.** They know which device fingerprints belong to which user accounts. We do not.
- **The third party's terms and privacy policy apply.** Read them before using Sigil Auth with that application.

**We are not responsible for:**

- How third-party applications use Sigil Auth.
- Unauthorised access resulting from vulnerabilities in third-party systems.
- Data breaches, service outages, or failures in third-party infrastructure.

Your relationship with third-party applications is governed by their terms of service, not these Terms.

---

## 8. Apple and Google Services

The Sigil Auth mobile apps rely on:

- **Apple Push Notification Service (APNs)** for iOS push notifications.
- **Google Firebase Cloud Messaging (FCM)** for Android push notifications.

Your use of these services is subject to Apple's and Google's respective terms of service:

- Apple Terms: https://www.apple.com/legal/internet-services/
- Google Terms: https://policies.google.com/terms

We are not responsible for failures, delays, or changes in APNs or FCM that affect the delivery of push notifications.

---

## 9. Fees and Payment

**The Sigil Auth Service is currently free to use.** There are no subscription fees, per-transaction charges, or hidden costs for using the Wagmi Labs-operated relay service.

We reserve the right to introduce fees in the future. If we do:

1. We will provide at least **90 days' advance notice** via email (if you've provided one) or in-app notification.
2. You will have the opportunity to stop using the Service or migrate to a self-hosted deployment before fees take effect.
3. Continued use of the relay service after the notice period constitutes acceptance of the new fee structure.

**Self-hosting is always free** (subject to the AGPL-3.0 license). You can deploy your own relay and avoid any future fees.

---

## 10. Disclaimers and Warranties

**THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND.**

To the fullest extent permitted by law, Wagmi Labs disclaims all warranties, express or implied, including but not limited to:

- **Merchantability:** The Service may not be suitable for your particular purpose.
- **Fitness for a Particular Purpose:** We do not warrant that the Service will meet your specific requirements.
- **Non-Infringement:** We do not warrant that the Service does not infringe third-party intellectual property rights (though we are not aware of any such infringement).
- **Availability:** We do not guarantee that the Service will be available 24/7, uninterrupted, or error-free.
- **Security:** While we implement reasonable security measures, we do not warrant that the Service is immune to hacking, data breaches, or unauthorised access.

**Open-source nature:** Sigil Auth is open-source software. You are encouraged to review the source code and assess its security and suitability for your use case. We make no representations about the absence of bugs or vulnerabilities in the code.

**Australian Consumer Law:** For Australian users, certain statutory consumer guarantees under the Australian Consumer Law (ACL) cannot be excluded. If you are a "consumer" as defined under the ACL, you may have rights to a remedy (repair, replacement, refund) if the Service fails to meet these guarantees. These Terms do not exclude or limit those non-excludable rights.

For services that are not of a kind ordinarily acquired for personal, domestic, or household use (i.e., business use), our liability for breach of a non-excludable guarantee is limited, to the extent permitted by law, to:

- Resupplying the Service, or
- Paying the cost of resupplying the Service.

---

## 11. Limitation of Liability

**To the fullest extent permitted by law, Wagmi Labs is not liable for any indirect, incidental, consequential, special, or punitive damages arising from or relating to your use of the Service.**

This includes but is not limited to:

- Loss of profits, revenue, or business opportunities.
- Loss of data or access to data.
- Unauthorised access to your device or accounts.
- Failures in third-party services (APNs, FCM, integrating applications).
- Downtime, service outages, or degraded performance.
- Reliance on the Service for critical authentication workflows.

**Our total liability to you for all claims arising from or relating to the Service is limited to the greater of:**

1. The amount you paid to Wagmi Labs in the 12 months preceding the claim (currently $0, as the Service is free), or
2. AUD $100.

**Exception:** This limitation does not apply to liability for:

- Death or personal injury caused by our negligence.
- Fraud or fraudulent misrepresentation.
- Breach of non-excludable consumer guarantees under the Australian Consumer Law (ACL).
- Any other liability that cannot be excluded or limited under Australian law.

**Australian Consumer Law:** For Australian consumers, this limitation of liability is subject to your statutory rights under the ACL. Where the ACL applies, our liability is limited to the extent permitted by sections 64, 64A, and related provisions of the ACL.

---

## 12. Indemnification

You agree to indemnify, defend, and hold harmless Wagmi Labs, its directors, officers, employees, contractors, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from or relating to:

1. Your use or misuse of the Service.
2. Your violation of these Terms.
3. Your violation of any applicable law or regulation.
4. Your infringement of any third-party rights (including intellectual property, privacy, or data protection rights).

This indemnity survives termination of these Terms.

---

## 13. Termination

### 13.1 Termination by You

You may stop using the Service at any time by:

- Uninstalling the Sigil Auth app from your devices.
- Using the in-app "Unregister Device" function to remove your device from the relay.

Unregistering your device immediately deletes your device fingerprint and push token from our relay.

### 13.2 Termination by Us

We may suspend or terminate your access to the relay service at any time, with or without notice, if:

- You violate these Terms.
- We are required to do so by law or court order.
- We decide to discontinue the relay service (see Section 14).

Termination does not affect your right to use the open-source software under the AGPL-3.0 license or to self-host your own deployment.

### 13.3 Effect of Termination

Upon termination:

- Your license to use the Wagmi Labs-operated relay service ends immediately.
- We will delete your device fingerprint and push token from the relay database.
- Any provisions of these Terms that by their nature should survive (e.g., disclaimers, limitations of liability, indemnification, governing law) will continue to apply.

---

## 14. Changes to the Service

We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time, with or without notice.

**If we discontinue the relay service:**

1. We will provide at least **90 days' advance notice** via the website and in-app notification.
2. You will have the opportunity to migrate to a self-hosted deployment or another compatible relay service.
3. We will provide documentation and support resources to facilitate migration.

**We are not liable for any loss or inconvenience resulting from changes to or discontinuation of the Service.**

Remember: Sigil Auth is open-source. Even if we shut down the relay, you can run your own.

---

## 15. Changes to These Terms

We may update these Terms from time to time. When we do:

1. We will update the "Last Updated" date at the top of this page.
2. For material changes (e.g., adding fees, reducing your rights), we will notify you via in-app banner or push notification at least **30 days before** the changes take effect.
3. Your continued use of the Service after the notice period constitutes acceptance of the updated Terms.

If you do not agree to the updated Terms, you must stop using the Service.

**Version history:** Previous versions of these Terms are archived at https://github.com/sigilauth/sigilauth.com/commits/main/terms.md

---

## 16. Governing Law and Dispute Resolution

### 16.1 Governing Law

These Terms are governed by the laws of **Queensland, Australia**, without regard to conflict of law principles.

### 16.2 Jurisdiction

Any disputes arising from or relating to these Terms or the Service will be subject to the **exclusive jurisdiction of the courts of Queensland, Australia**.

For EU users: This does not affect your rights under applicable EU consumer protection laws or your ability to bring proceedings in your local courts.

### 16.3 Dispute Resolution Process

Before initiating legal proceedings, we encourage you to contact us at admin@atikayda.au to attempt informal resolution.

If informal resolution fails, the dispute will proceed as follows:

1. **Negotiation:** Both parties will engage in good-faith negotiation for 30 days.
2. **Mediation (optional):** Either party may request non-binding mediation under the rules of the Resolution Institute (Queensland).
3. **Litigation:** If mediation fails or is declined, either party may commence proceedings in the courts of Queensland.

**Class action waiver:** To the extent permitted by law, you agree to bring claims against Wagmi Labs only in your individual capacity, not as part of a class action or representative proceeding.

---

## 17. Severability

If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision will be severed, and the remaining provisions will continue in full force and effect.

The invalid provision will be replaced with a valid provision that most closely reflects the original intent.

---

## 18. Entire Agreement

These Terms, together with the Privacy Policy, constitute the entire agreement between you and Wagmi Labs regarding the Service and supersede any prior agreements, representations, or understandings (whether written or oral).

**Exception:** If you have a separate written agreement with Wagmi Labs (e.g., an enterprise support contract), that agreement governs to the extent it conflicts with these Terms.

---

## 19. No Waiver

Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or our right to enforce it in the future.

Any waiver must be in writing and signed by an authorised representative of Wagmi Labs.

---

## 20. Assignment

You may not assign, transfer, or delegate your rights or obligations under these Terms without our prior written consent.

We may assign these Terms, in whole or in part, to any successor entity (e.g., in connection with a merger, acquisition, or sale of assets) without your consent. We will notify you of any such assignment.

---

## 21. Force Majeure

Neither party will be liable for any delay or failure to perform its obligations under these Terms due to events beyond its reasonable control, including but not limited to:

- Acts of God (earthquakes, floods, fires).
- War, terrorism, civil unrest.
- Government actions or restrictions.
- Failures in public telecommunications networks or cloud infrastructure (AWS, APNs, FCM).
- Pandemics or public health emergencies.

The affected party will notify the other party as soon as reasonably practicable and will use reasonable efforts to mitigate the impact.

If the force majeure event continues for more than 60 days, either party may terminate these Terms without liability.

---

## 22. Export Control

The Service may be subject to export control laws and regulations, including Australian export controls and international sanctions.

You represent and warrant that:

- You are not located in a country subject to a comprehensive embargo (e.g., North Korea, Syria).
- You are not listed on any government restricted parties list.
- You will not use the Service in violation of export control laws.

We reserve the right to suspend or terminate your access to the Service if we reasonably believe you are in violation of export control laws.

---

## 23. Open Source Acknowledgments

Sigil Auth incorporates the following open-source software components:

- **ECDSA cryptography:** Built on standard cryptographic libraries (CryptoKit on iOS, Android Keystore on Android, crypto/ecdsa in Go).
- **Fluent (Project Fluent):** Localisation system, licensed under Apache-2.0.
- **Various dependencies:** See `package.json`, `go.mod`, and platform-specific dependency files for full attributions.

All open-source components are used in compliance with their respective licenses. Full license texts and attributions are available in the source code repository.

---

## 24. Contact and Notice

All notices under these Terms must be sent to:

**Email:** admin@atikayda.au  
**Postal Address:**  
Wagmi Labs Pty Ltd  
Brisbane, Queensland  
Australia

Notices are deemed received:

- If by email: 24 hours after sending (provided we receive a delivery receipt).
- If by post: 5 business days after mailing.

For operational support or questions about the Service, contact admin@atikayda.au.

---

## 25. Interpretation

In these Terms:

- **"Including" and "includes"** mean "including without limitation."
- **Headings** are for convenience only and do not affect interpretation.
- **Singular includes plural** and vice versa, unless the context requires otherwise.
- **"You" and "your"** refer to the individual or entity using the Service.
- **"We", "us", and "our"** refer to Wagmi Labs Pty Ltd.

---

## 26. Miscellaneous

### 26.1 Relationship of the Parties

Nothing in these Terms creates a partnership, joint venture, employment, or agency relationship between you and Wagmi Labs.

### 26.2 Third-Party Beneficiaries

These Terms do not confer any rights or benefits on any third party, except as expressly stated.

### 26.3 Counterparts

These Terms may be executed in counterparts (including electronic counterparts), each of which is an original and all of which together constitute the same agreement.

---

**Last reviewed:** 24 April 2026

Questions? Email us at admin@atikayda.au. We're a small team building open-source authentication tools. If something in these Terms is unclear or seems unfair, we'd like to know.
