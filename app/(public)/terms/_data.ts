export type Block =
  | { type: "p"; text: string }
  | { type: "p-upper"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string };

export type Section = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

export const sections: Section[] = [
  {
    id: "eligibility",
    number: "01",
    title: "Eligibility",
    blocks: [
      {
        type: "p",
        text: "You may use the Services only if you have the legal authority to enter into these Terms on your own behalf or on behalf of the organization you represent. If you are using the Services for a company, firm, or other entity, you represent that you have authority to bind that entity to these Terms.",
      },
    ],
  },
  {
    id: "services",
    number: "02",
    title: "Services",
    blocks: [
      {
        type: "p",
        text: "The Services provide tools for resume screening, candidate evaluation support, structured scoring, workflow support, and related hiring or recruiting functionality.",
      },
      {
        type: "p",
        text: "The Services are intended to assist users in screening and evaluating candidate information. The Services do not constitute employment, legal, compliance, or human resources advice, and final hiring decisions remain solely the responsibility of the user.",
      },
    ],
  },
  {
    id: "account-registration",
    number: "03",
    title: "Account Registration",
    blocks: [
      {
        type: "p",
        text: "To access certain features, you may be required to create an account. You agree to provide accurate, complete, and current information and to keep that information updated.",
      },
      {
        type: "p",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us promptly if you believe your account has been accessed without authorization.",
      },
    ],
  },
  {
    id: "acceptable-use",
    number: "04",
    title: "Acceptable Use",
    blocks: [
      { type: "p", text: "You agree not to use the Services to:" },
      {
        type: "ul",
        items: [
          "violate any applicable law or regulation;",
          "infringe the rights of any person or entity;",
          "upload malicious code, viruses, or harmful content;",
          "attempt to gain unauthorized access to the Services or related systems;",
          "interfere with the operation or security of the Services;",
          "use the Services to discriminate unlawfully against candidates or other individuals;",
          "reverse engineer, copy, modify, or create derivative works from the Services except as expressly permitted;",
          "use the Services to build or support a competing product or service without our written consent.",
        ],
      },
      {
        type: "p",
        text: "We reserve the right to suspend or terminate access where we reasonably believe the Services are being used in violation of these Terms.",
      },
    ],
  },
  {
    id: "customer-data",
    number: "05",
    title: "Customer Data",
    blocks: [
      {
        type: "p",
        text: "You may upload or submit resumes, job descriptions, candidate information, and related materials (“Customer Data”) to the Services.",
      },
      {
        type: "p",
        text: "You retain ownership of your Customer Data. By using the Services, you grant us a limited, non-exclusive, worldwide license to host, store, process, transmit, and use Customer Data solely as necessary to provide, maintain, secure, improve, and support the Services, in accordance with these Terms and our Privacy Policy.",
      },
      {
        type: "p",
        text: "You represent and warrant that you have all rights, permissions, and legal bases necessary to submit Customer Data to the Services and to authorize us to process it on your behalf.",
      },
    ],
  },
  {
    id: "data-protection",
    number: "06",
    title: "Data Protection and Privacy",
    blocks: [
      {
        type: "p",
        text: "Our collection and use of personal information is governed by our Privacy Policy. Where applicable, additional contractual terms such as a Data Processing Addendum may apply to enterprise customers.",
      },
      {
        type: "p",
        text: "You are responsible for ensuring that your use of the Services, including your upload of candidate or employee information, complies with applicable privacy, employment, and data protection laws.",
      },
    ],
  },
  {
    id: "ai-outputs",
    number: "07",
    title: "AI-Generated Outputs",
    blocks: [
      {
        type: "p",
        text: "The Services may generate scores, summaries, rankings, recommendations, or other outputs based on uploaded data and user-configured criteria (“Outputs”).",
      },
      { type: "p", text: "You acknowledge that:" },
      {
        type: "ul",
        items: [
          "Outputs are generated automatically and may not always be accurate, complete, or suitable for every use case;",
          "Outputs are intended as decision-support tools only;",
          "you remain solely responsible for reviewing Outputs and for all hiring, employment, and business decisions made using the Services.",
        ],
      },
      {
        type: "p",
        text: "We do not guarantee that Outputs will be error-free, unbiased, complete, or compliant with any specific legal or regulatory requirement unless expressly agreed in writing.",
      },
    ],
  },
  {
    id: "fees-payment",
    number: "08",
    title: "Fees and Payment",
    blocks: [
      {
        type: "p",
        text: "Certain Services may require payment of subscription fees or other charges. By purchasing a paid plan, you agree to pay all applicable fees in accordance with the pricing and billing terms presented to you at the time of purchase.",
      },
      { type: "p", text: "Unless otherwise stated:" },
      {
        type: "ul",
        items: [
          "fees are non-refundable;",
          "subscriptions renew automatically for successive terms unless canceled before renewal;",
          "taxes, duties, or government levies are your responsibility except for taxes based on our net income.",
        ],
      },
      {
        type: "p",
        text: "We reserve the right to suspend access to paid Services for non-payment.",
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "09",
    title: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "The Services, including all software, design, content, workflows, models, trademarks, branding, and related materials, are and remain the exclusive property of the Company or its licensors.",
      },
      {
        type: "p",
        text: "Except for the limited right to use the Services in accordance with these Terms, no rights are granted to you. You may not copy, distribute, sell, sublicense, or otherwise exploit the Services except as expressly permitted by us in writing.",
      },
    ],
  },
  {
    id: "confidentiality",
    number: "10",
    title: "Confidentiality",
    blocks: [
      {
        type: "p",
        text: "Each party may receive non-public information from the other party that is marked confidential or that should reasonably be understood to be confidential (“Confidential Information”).",
      },
      {
        type: "p",
        text: "Each party agrees to use the other party’s Confidential Information only as necessary to perform under these Terms and not to disclose it to any third party except to employees, contractors, or advisors who need to know it and who are bound by appropriate confidentiality obligations.",
      },
      { type: "p", text: "This section does not apply to information that:" },
      {
        type: "ul",
        items: [
          "is or becomes publicly available without breach of these Terms;",
          "was lawfully known before disclosure;",
          "is lawfully received from a third party without restriction; or",
          "is independently developed without use of the other party’s Confidential Information.",
        ],
      },
    ],
  },
  {
    id: "third-party-services",
    number: "11",
    title: "Third-Party Services",
    blocks: [
      {
        type: "p",
        text: "The Services may interoperate with third-party platforms, integrations, or software. We are not responsible for third-party products or services, and your use of them may be subject to separate terms and policies.",
      },
    ],
  },
  {
    id: "availability",
    number: "12",
    title: "Service Availability and Changes",
    blocks: [
      {
        type: "p",
        text: "We may update, modify, suspend, or discontinue any part of the Services at any time, including features, functionality, or pricing.",
      },
      {
        type: "p",
        text: "While we aim to provide reliable access, we do not guarantee uninterrupted or error-free operation of the Services.",
      },
    ],
  },
  {
    id: "disclaimers",
    number: "13",
    title: "Disclaimers",
    blocks: [
      {
        type: "p-upper",
        text: "THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, OR RELIABILITY.",
      },
      {
        type: "p",
        text: "We do not warrant that the Services will meet your requirements, operate without interruption, or produce specific hiring or business outcomes.",
      },
    ],
  },
  {
    id: "limitation-liability",
    number: "14",
    title: "Limitation of Liability",
    blocks: [
      {
        type: "p-upper",
        text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO THE SERVICES OR THESE TERMS.",
      },
      {
        type: "p-upper",
        text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS SHALL NOT EXCEED THE AMOUNTS PAID BY YOU TO US FOR THE SERVICES DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR ONE HUNDRED U.S. DOLLARS (US$100), WHICHEVER IS GREATER.",
      },
    ],
  },
  {
    id: "indemnity",
    number: "15",
    title: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to defend, indemnify, and hold harmless the Company and its affiliates, officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses arising out of or related to:",
      },
      {
        type: "ul",
        items: [
          "your use of the Services;",
          "your Customer Data;",
          "your violation of these Terms; or",
          "your violation of any applicable law or the rights of a third party.",
        ],
      },
    ],
  },
  {
    id: "suspension-termination",
    number: "16",
    title: "Suspension and Termination",
    blocks: [
      { type: "p", text: "We may suspend or terminate your access to the Services immediately if:" },
      {
        type: "ul",
        items: [
          "you breach these Terms;",
          "your use of the Services poses a security, legal, or operational risk;",
          "required by law; or",
          "fees remain unpaid.",
        ],
      },
      {
        type: "p",
        text: "You may stop using the Services at any time. Termination does not relieve you of payment obligations accrued before termination.",
      },
      {
        type: "p",
        text: "Sections that by their nature should survive termination will survive, including provisions relating to intellectual property, disclaimers, limitations of liability, confidentiality, indemnity, and governing law.",
      },
    ],
  },
  {
    id: "governing-law",
    number: "17",
    title: "Governing Law and Dispute Resolution",
    blocks: [
      {
        type: "p",
        text: "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.",
      },
      {
        type: "p",
        text: "Any disputes arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India unless otherwise required by applicable law.",
      },
    ],
  },
  {
    id: "changes",
    number: "18",
    title: "Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We may revise these Terms from time to time. If we make material changes, we may provide notice by updating the date above, posting notice on the website, or notifying you through the Services.",
      },
      {
        type: "p",
        text: "Your continued use of the Services after updated Terms become effective constitutes your acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "contact",
    number: "19",
    title: "Contact Information",
    blocks: [
      {
        type: "p",
        text: "If you have questions about these Terms, please contact us at DeskZero Pvt Ltd — support@hiresort.ai — www.hiresort.ai.",
      },
    ],
  },
];