/* -------------------------- Shared -------------------------- */

/* Pagination */
export type Pagination<T> = {
  success: boolean;
  details: ResDetails;
  result: T[];
}

export interface ResDetails {
  limit: number;
  page: number;
  totalRecords: number;
  pages: Pages;
};

export type Pages = {
  previous: boolean;
  current: number;
  next: number | boolean;
  total: number;
  nextPageToken?: string | null;
  previousPageToken?: string | null;
} | null;


export type PageSearchParams = { searchParams: Promise<{ [key: string]: string | undefined }> }

export type PageParams = { params: Promise<{ [key: string]: string }> }

export interface PersonInfo {
  _id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  profile_pic: string | null;
};

/* ---------------------------- Authorization ----------------------------*/
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}


/* ---------------------------- USER ---------------------------- */
export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  department: string;
  employee_id: string;
  status: 'active' | 'inactive' | 'suspended';
  is_verified: boolean;
  profile_pic: string;
  date_joined: string;
  full_name: string;
  __v?: number;
  createdAt: string;
  updatedAt: string;
}


/* ---------------------------- TIKCET ---------------------------- */
export interface Ticket {
  _id: string;
  caller_phone: string;
  assigned_agent: PersonInfo;
  customer: PersonInfo | null;
  title: string;
  source: 'email' | 'phone' | 'whatsapp' | 'other';
  description: string;
  email_id: string | null;
  status: 'pending' | 'active' | 'resolved' | 'cancelled' | 'escalated';
  priority: 'high' | 'medium' | 'low' | 'critical';
  flag: 'important' | 'moderate' | 'least important' | 'prank';
  category: { _id: number; name: string };
  escalation: Escalation | null;
  comments: TicketComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TicketComment {
  _id: string;
  author: PersonInfo;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Escalation {
  raised_by: PersonInfo;
  reason: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface TicketCategory {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface TicketStats {
  total_count: number;
  status_counts: {
    Pending: number;
    Active: number;
    Resolved: number;
    Cancelled: number;
    Escalated: number;
  };
}



/*---------------------------- INVOICE ----------------------------*/

export interface Invoice {
  _id: string;
  creator: PersonInfo;
  customer: PersonInfo;
  invoice_items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'closed' | 'refunded';
  shipping_cost: number;
  discount: number;
  tax: number;
  due_date: string;
  payment_type: 'cash' | 'credit card' | 'bank transfer' | 'paypal' | 'stripe' | 'mobile' | 'debit card' | 'cheque';
  additional_note?: string;
  subtotal: number;
  total_amount: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface InvoiceItem {
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
  discount: number;
  unit_price: number;
  total_price: number;
}



/*---------------------------- Customers ----------------------------*/
export interface Customer {
  _id: string;
  customer_type: 'individual' | 'corporate';
  company_name: string;
  contact_person: string;
  registration_number: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email?: string;
  phone_number: string;
  nationality?: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other';
  address: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip_code?: string;
  };
  id_type?: 'passport' | 'national_id' | 'driving_license' | 'other';
  id_number?: string;
  id_front?: string;
  id_back?: string;
  profession?: string;
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  religion?: string;
  father_name?: string;
  mother_name?: string;
  witness_name?: string;
  witness_relation?: string;
  medication?: boolean;
  medication_type?: string;
  number_of_children?: number;
  boys?: number;
  girls?: number;
  finincial_institution?: string;
  documents?: string[];
  profile_pic?: string;
  status: 'active' | 'inactive' | 'blacklisted';
  notes?: string;
  assigned_agent?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/*---------------------------- LEADS ----------------------------*/

export interface Lead {
  _id: string;
  assigned_agent?: PersonInfo | null;
  company_name?: string;
  person_name?: string;
  email?: string;
  mobile_number?: string;
  lead_source?: string;
  product?: string | null;
  pipeline_stage?:
  | "Qualification"
  | "Proposal|Quotation"
  | "Negotiation"
  | "Pending Approval"
  | "Closed-Won"
  | "Closed-Lost";
  deal_value?: number;
  expected_revenue?: number;
  follow_up_date?: Date | null;
  close_date?: Date | null;
  location?: {
    province?: string;
    town?: string;
    address?: string;
  };
  converted_to_invoice?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  probability: number;
}

/*---------------------------- PRODUCT ----------------------------*/
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  _id: number;
  cover: string;
  title: string;
  timestamp: Date;
  updated: Date;
}

export interface ProductDefaultParams {
  _id?: number | null;
  name: string;
  description: string;
  price: number | string;
}

/*---------------------------- FAQ ----------------------------*/
export interface Faq {
  _id?: number;
  question: string;
  answer: string;
}

/*---------------------------- EMAIL ----------------------------*/
export interface Email {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  to: string;
  title: string;
  displayDescription: string;
  isUnread: boolean;
  isStarred: boolean;
  isImportant: boolean;
  labelIds: string[];
  attachments: any[];
  date: string;
  payload: {
    partId: string;
    mimeType: string;
    filename: string;
    headers: Array<{
      name: string;
      value: string;
    }>;
    body: {
      size: number;
      data: string;
    };
  };
}

export interface ISendEmail {
  to: string;
  subject: string;
  textBody?: string;
  htmlBody?: string;
  cc?: string;
  bcc?: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64 encoded
    contentType: string;
  }>;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
  result?: {
    messageId: string;
    threadId: string;
  };
}

export interface EmailStats {
  success: boolean;
  result: {
    inbox: number;
    inboxUnread: number;
    starred: number;
    sent: number;
    spam: number;
    drafts: number;
    trash: number;
    important: number;
  };
}

/*---------------------------- TASK ----------------------------*/
export interface Task {
  _id: number;
  title: string;
  assigned_agent: PersonInfo;
  description: string;
  priority: string;
  status: string;
  created_at: Date;
}


/*---------------------------- CHAT ----------------------------*/
export interface Chat {
  _id: string;
  is_group: boolean;
  source: 'internal' | 'whatsapp';
  customer: null | PersonInfo;
  group_admin: null | string | PersonInfo;
  chat_name: null | string;
  chat_pic: null | string;
  users: PersonInfo[];
  latest_message: LatestMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface LatestMessage {
  _id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Message {
  _id: string;
  content: string;
  chat: Chat;
  sender: PersonInfo;
  createdAt: Date;
  updatedAt: Date;
  // image: null | string;
  // video: null | string;
}

// export interface MessageNotification {
//   _id: number;
//   content: string;
//   senderId: number;
//   chatId: number;
//   updatedAt: Date;
//   createdAt: Date;
//   deletedAt: null;
//   isGroupChat: boolean;
//   chatPicture: null | string;
//   chatName: null | string;
//   sender: MsgSender;
// }

// export interface MsgSender {
//   _id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   profilePic: string;
//   phoneNo: string;
//   role: number;
// }
