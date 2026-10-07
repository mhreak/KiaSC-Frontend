export interface Message {
  id: string;
  title: string;
  status: "published" | "unpublished";
  date: string;
}

export interface PrivateMessage {
  id: string;
  sender: string;
  receiver: string;
  title: string;
  status: "published" | "unpublished";
  date: string;
}

export interface Sms {
  id: string;
  text: string;
  date: string;
}

export interface MessageDetails {
  id: string;
  title: string;
  text: string;
  status: "published" | "unpublished";
  field: string;
  term: string;
  course: string;
  team: string;
  createdAt: string;
  publishedAt: string;
}

export interface PrivateMessageDetails {
  id: string;
  sender: string;
  receiver: string;
  title: string;
  text: string;
  status: "published" | "unpublished";
  createdAt: string;
  publishedAt: string;
}

export interface SmsDetails {
  id: string;
  text: string;
  date: string;
  receiversCount: number;
  senderNumber: string;
  phoneNumbers: string[];
  athlete: string;
}
