export const initialApplications = [
  {
    id: "APP-2026-001",
    applicantName: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rajesh.kumar@example.gov.in",
    service: "Certified Copy of RoR (Khatauni)",
    serviceType: "certified_copy",
    state: "Uttar Pradesh",
    district: "Lucknow",
    tehsil: "Lucknow Sadar",
    village: "Gomti Nagar",
    surveyNumber: "45/2",
    date: "2026-03-01",
    status: "Approved",
    assignedOfficer: "R. K. Verma, Tehsildar Sadar",
    remarks: "Certified digitally signed copy generated and issued.",
    timeline: [
      { stage: "Application Submitted", date: "2026-03-01 10:15 AM", status: "completed", note: "Application received and acknowledged." },
      { stage: "Document Verification", date: "2026-03-01 02:30 PM", status: "completed", note: "Aadhaar and survey link verified against land database." },
      { stage: "Under Review", date: "2026-03-02 11:00 AM", status: "completed", note: "Reviewed by Revenue Inspector circle 4." },
      { stage: "Officer Approval", date: "2026-03-02 04:45 PM", status: "completed", note: "Approved by Tehsildar Sadar." },
      { stage: "Completed", date: "2026-03-03 09:30 AM", status: "completed", note: "Certified RoR copy ready for download." }
    ]
  },
  {
    id: "APP-2026-002",
    applicantName: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rajesh.kumar@example.gov.in",
    service: "Mutation of Land (Varisat / Succession)",
    serviceType: "mutation",
    state: "Uttar Pradesh",
    district: "Lucknow",
    tehsil: "Lucknow Sadar",
    village: "Gomti Nagar",
    surveyNumber: "45/2",
    date: "2026-03-03",
    status: "Under Review",
    assignedOfficer: "S. N. Tripathi, Nayab Tehsildar",
    remarks: "Public objection period active (15 days notice issued).",
    timeline: [
      { stage: "Application Submitted", date: "2026-03-03 11:20 AM", status: "completed", note: "Application and succession certificate received." },
      { stage: "Document Verification", date: "2026-03-04 10:00 AM", status: "completed", note: "Legal heir certificate and identity verified." },
      { stage: "Under Review", date: "2026-03-05 03:15 PM", status: "in_progress", note: "Hearing notice dispatched. Awaiting public objections if any." },
      { stage: "Officer Approval", date: "Pending", status: "pending", note: "Pending post objection verification." },
      { stage: "Completed", date: "Pending", status: "pending", note: "Mutation registry update." }
    ]
  },
  {
    id: "APP-2026-003",
    applicantName: "Priya Sharma",
    mobile: "9822011223",
    email: "priya.sharma@example.com",
    service: "Boundary Demarcation & Survey",
    serviceType: "survey",
    state: "Maharashtra",
    district: "Pune",
    tehsil: "Haveli",
    village: "Wagholi",
    surveyNumber: "18/7",
    date: "2026-02-28",
    status: "Pending",
    assignedOfficer: "D. G. Patil, Taluka Inspector of Land Records",
    remarks: "Surveyor scheduling scheduled for field visit.",
    timeline: [
      { stage: "Application Submitted", date: "2026-02-28 09:40 AM", status: "completed", note: "Fee paid and survey request filed." },
      { stage: "Document Verification", date: "2026-03-01 01:15 PM", status: "completed", note: "Cadastral map index cross-referenced." },
      { stage: "Under Review", date: "Pending", status: "in_progress", note: "Assigning survey team and DGPS instrument." },
      { stage: "Officer Approval", date: "Pending", status: "pending", note: "Approval of boundary demarcation report." },
      { stage: "Completed", date: "Pending", status: "pending", note: "Dispatch of certified survey map." }
    ]
  },
  {
    id: "APP-2026-004",
    applicantName: "Amitabh Sen",
    mobile: "9830123456",
    email: "sen.amitabh@example.com",
    service: "Land Record Correction (Name spelling)",
    serviceType: "correction",
    state: "West Bengal",
    district: "North 24 Parganas",
    tehsil: "Barasat Sadar",
    village: "Rajarhat",
    surveyNumber: "112/4",
    date: "2026-02-24",
    status: "Approved",
    assignedOfficer: "B. C. Mukherjee, Revenue Officer",
    remarks: "Name correction updated in digital ledger.",
    timeline: [
      { stage: "Application Submitted", date: "2026-02-24 10:00 AM", status: "completed", note: "Affidavit and Aadhaar copy submitted." },
      { stage: "Document Verification", date: "2026-02-24 04:00 PM", status: "completed", note: "Gazette notification match verified." },
      { stage: "Under Review", date: "2026-02-25 11:30 AM", status: "completed", note: "Revenue records clerk verified old volume." },
      { stage: "Officer Approval", date: "2026-02-26 02:45 PM", status: "completed", note: "Order signed by Revenue Officer." },
      { stage: "Completed", date: "2026-02-27 10:00 AM", status: "completed", note: "Updated Record of Rights published." }
    ]
  }
];