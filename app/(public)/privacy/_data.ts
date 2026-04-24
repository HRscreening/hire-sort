export type Block =
  | { type: "p"; text: string }
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
    id: "who-we-are",
    number: "01",
    title: "Who We Are",
    blocks: [
      {
        type: "p",
        text: "Legal entity: DeskZero Pvt Ltd. Email: support@hiresort.ai. Website: www.hiresort.ai.",
      },
      {
        type: "p",
        text: "If you have any privacy-related questions, requests, or complaints, you may contact us using the details above.",
      },
    ],
  },
  {
    id: "scope",
    number: "02",
    title: "Scope",
    blocks: [
      { type: "p", text: "This Privacy Policy applies to:" },
      {
        type: "ul",
        items: [
          "visitors to our website;",
          "business customers and prospective customers;",
          "users of the HireSort platform;",
          "candidates whose resumes or related information are uploaded to the platform by our customers; and",
          "any other person who interacts with us in connection with the Services.",
        ],
      },
    ],
  },
  {
    id: "information-we-collect",
    number: "03",
    title: "Information We Collect",
    blocks: [
      { type: "p", text: "We may collect the following categories of information:" },
      { type: "h3", text: "A. Account and business contact information" },
      {
        type: "ul",
        items: [
          "Name",
          "Work email address",
          "Phone number",
          "Company name",
          "Job title",
          "Billing and subscription details",
          "Login credentials and account preferences",
        ],
      },
      { type: "h3", text: "B. Candidate and resume data" },
      {
        type: "p",
        text: "When a customer uploads resumes or related hiring information into HireSort, we may process:",
      },
      {
        type: "ul",
        items: [
          "Name and contact details",
          "Employment history",
          "Education history",
          "Skills, certifications, and qualifications",
          "Links to public professional profiles or portfolios",
          "Resume text and formatting",
          "Screening scores, rankings, notes, statuses, shortlist decisions, and workflow data",
          "Other information included in uploaded resumes or recruiting documents",
        ],
      },
      { type: "h3", text: "C. Usage and device information" },
      {
        type: "ul",
        items: [
          "IP address",
          "Browser type and version",
          "Device type and operating system",
          "Log files",
          "Time stamps",
          "Pages viewed",
          "Clickstream and usage analytics",
          "Error and performance data",
        ],
      },
      { type: "h3", text: "D. Communication data" },
      {
        type: "ul",
        items: [
          "Messages sent through forms, email, chat, or support channels",
          "Demo requests",
          "Feedback and survey responses",
        ],
      },
      { type: "h3", text: "E. Cookies and similar technologies" },
      {
        type: "p",
        text: "We may use cookies, pixels, local storage, and similar technologies to operate the website, remember preferences, analyze traffic, and improve performance.",
      },
    ],
  },
  {
    id: "how-we-collect",
    number: "04",
    title: "How We Collect Information",
    blocks: [
      { type: "p", text: "We collect information:" },
      {
        type: "ul",
        items: [
          "directly from you when you create an account, request a demo, contact us, or use the Services;",
          "from our customers when they upload candidate or resume data;",
          "automatically through logs, cookies, and analytics technologies; and",
          "from integrations or third-party tools that you authorize us to connect with.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    number: "05",
    title: "How We Use Information",
    blocks: [
      { type: "p", text: "We use personal data to:" },
      {
        type: "ul",
        items: [
          "provide, operate, maintain, and improve the Services;",
          "parse, analyze, score, rank, search, organize, export, and manage resumes and recruiting workflows;",
          "support contextual search and matching based on role fit, experience, and skills;",
          "create and manage customer accounts;",
          "provide onboarding, customer support, and technical assistance;",
          "communicate product, service, billing, security, and administrative updates;",
          "monitor performance, prevent misuse, detect fraud, and maintain platform security;",
          "enforce our terms, policies, and contractual rights;",
          "comply with legal, regulatory, and law-enforcement requirements; and",
          "develop aggregated, de-identified, or anonymized analytics and product insights, where permitted by law and contract.",
        ],
      },
    ],
  },
  {
    id: "ai-automated",
    number: "06",
    title: "AI and Automated Processing",
    blocks: [
      {
        type: "p",
        text: "HireSort uses automated systems and AI-assisted methods to analyze resumes, generate scores, rank profiles, support contextual search, and organize recruiting workflows.",
      },
      { type: "p", text: "Important points:" },
      {
        type: "ul",
        items: [
          "our tools are intended to support recruiter decision-making, not replace human judgment;",
          "customers remain responsible for their hiring decisions and for ensuring lawful and fair use of the Services;",
          "where enabled, we may support PII minimization, redaction, or masking workflows to reduce unnecessary exposure of personal data; and",
          "we do not use customer-uploaded candidate data to train generalized public models unless expressly permitted by contract or with explicit customer consent.",
        ],
      },
    ],
  },
  {
    id: "our-role",
    number: "07",
    title: "Our Role and Customer Responsibilities",
    blocks: [
      {
        type: "p",
        text: "For candidate data uploaded by a business customer, that customer is generally the party deciding why and how the data is used, and HireSort acts as a service provider, processor, or similar role under applicable law.",
      },
      { type: "p", text: "This means:" },
      {
        type: "ul",
        items: [
          "the customer is responsible for having an appropriate legal basis to collect and upload candidate data;",
          "the customer is responsible for its notices to candidates and its hiring decisions; and",
          "candidate requests about hiring decisions, correction, or deletion may need to be directed first to the relevant employer or recruiter.",
        ],
      },
    ],
  },
  {
    id: "legal-bases",
    number: "08",
    title: "Legal Bases for Processing",
    blocks: [
      {
        type: "p",
        text: "Where required by applicable law, we process personal data on one or more of the following grounds:",
      },
      {
        type: "ul",
        items: [
          "your consent;",
          "performance of a contract or steps taken at your request before entering into a contract;",
          "our legitimate interests, such as operating, securing, and improving the Services;",
          "compliance with legal obligations; and",
          "other lawful grounds available under applicable data protection laws.",
        ],
      },
    ],
  },
  {
    id: "how-we-share",
    number: "09",
    title: "How We Share Information",
    blocks: [
      { type: "p", text: "We may share personal data with:" },
      {
        type: "ul",
        items: [
          "cloud hosting, storage, security, analytics, customer support, and infrastructure providers;",
          "subprocessors and vendors that help us deliver the Services;",
          "professional advisers such as lawyers, accountants, auditors, and insurers;",
          "payment processors and billing providers;",
          "our affiliates, if relevant to service delivery;",
          "law enforcement, regulators, courts, or government authorities when required by law; and",
          "a buyer, investor, successor, or acquirer in connection with a merger, financing, acquisition, reorganization, or sale of assets.",
        ],
      },
      {
        type: "p",
        text: "We require service providers to handle personal data only for authorized purposes and with appropriate safeguards.",
      },
    ],
  },
  {
    id: "international-transfers",
    number: "10",
    title: "International Data Transfers",
    blocks: [
      {
        type: "p",
        text: "Your information may be processed in countries other than the country where it was originally collected. Where required, we take appropriate steps to protect cross-border transfers, including contractual safeguards and other lawful transfer mechanisms.",
      },
    ],
  },
  {
    id: "data-retention",
    number: "11",
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal data for as long as reasonably necessary for the purposes described in this Privacy Policy, including to provide the Services, maintain security, resolve disputes, comply with legal obligations, and enforce agreements.",
      },
      { type: "p", text: "In practice:" },
      {
        type: "ul",
        items: [
          "account and subscription data are typically retained while the account remains active and for a reasonable period afterward;",
          "candidate and recruiting data are retained according to customer instructions, account settings, contractual terms, and backup cycles;",
          "support and audit logs may be retained for security, troubleshooting, and compliance purposes; and",
          "where we cannot specify an exact period, we determine retention based on the nature of the data, business need, legal requirements, and risk.",
        ],
      },
    ],
  },
  {
    id: "data-security",
    number: "12",
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "We use reasonable technical, administrative, and organizational measures designed to protect personal data against unauthorized access, loss, misuse, disclosure, alteration, or destruction.",
      },
      { type: "p", text: "These measures may include:" },
      {
        type: "ul",
        items: [
          "role-based access controls;",
          "authentication and authorization controls;",
          "encryption in transit and, where applicable, at rest;",
          "logging and monitoring;",
          "backup and recovery procedures; and",
          "vendor and infrastructure security reviews.",
        ],
      },
      {
        type: "p",
        text: "No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "your-rights",
    number: "13",
    title: "Your Rights and Choices",
    blocks: [
      {
        type: "p",
        text: "Depending on your location and applicable law, you may have rights to:",
      },
      {
        type: "ul",
        items: [
          "access personal data;",
          "correct inaccurate data;",
          "delete personal data;",
          "withdraw consent where processing is based on consent;",
          "object to or restrict certain processing;",
          "receive a copy of certain data in portable form;",
          "request information about how your data is used and shared; and",
          "lodge a complaint with a regulator or data protection authority.",
        ],
      },
      {
        type: "p",
        text: "To exercise your rights, contact us at support@hiresort.ai.",
      },
      {
        type: "p",
        text: "If you are a candidate whose data was uploaded by an employer, recruiter, or other customer, you may also need to contact that organization directly, since it may control the relevant hiring workflow and records.",
      },
    ],
  },
  {
    id: "california",
    number: "14",
    title: "California Privacy Notice",
    blocks: [
      {
        type: "p",
        text: "If you are a California resident, you may have rights under California law, subject to scope and exceptions, including the right to know, delete, correct, opt out of certain sale or sharing activities, limit certain uses of sensitive personal information, and not be discriminated against for exercising your rights.",
      },
      {
        type: "p",
        text: "You may submit requests by contacting us at support@hiresort.ai.",
      },
      {
        type: "p",
        text: "We do not sell personal information for money and do not share personal information for cross-context behavioral advertising.",
      },
    ],
  },
  {
    id: "cookies",
    number: "15",
    title: "Cookies and Analytics",
    blocks: [
      { type: "p", text: "We use cookies and similar technologies to:" },
      {
        type: "ul",
        items: [
          "keep the website functional;",
          "remember preferences;",
          "understand traffic and usage patterns;",
          "improve user experience; and",
          "support analytics and security.",
        ],
      },
      {
        type: "p",
        text: "You can usually control cookies through your browser settings. Where required by law, we will request consent before using non-essential cookies.",
      },
    ],
  },
  {
    id: "third-party",
    number: "16",
    title: "Third-Party Links and Integrations",
    blocks: [
      {
        type: "p",
        text: "Our Services may contain links to third-party websites or integrations with third-party tools. We are not responsible for the privacy practices of those third parties, and we encourage you to review their privacy notices separately.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    number: "17",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "Our Services are intended for business and recruiting use and are not directed to children. We do not knowingly collect personal data from children in violation of applicable law.",
      },
    ],
  },
  {
    id: "changes",
    number: "18",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. When we do, we will update the \u201cLast updated\u201d date above and, where required, provide additional notice.",
      },
    ],
  },
  {
    id: "contact",
    number: "19",
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have questions, requests, or complaints regarding this Privacy Policy or our data practices, contact DeskZero Pvt Ltd at support@hiresort.ai or visit www.hiresort.ai.",
      },
    ],
  },
];