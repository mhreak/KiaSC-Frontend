export interface Installment {
  id: string;
  athlete: string;
  course: string;
  term: string;
  installmentAmount: number;
  dueDate: string;
  status: "settled" | "unsettled" | "deleted";
  settlementDate: string;
}

export interface InstallmentItem {
  id: string;
  for: string;
  price: number;
}

export interface OnlineTransaction {
  id: string;
  athleteName: string;
  course: string;
  price: number;
  status: "success" | "failed";
  date: string;
  trackingNumber: number;
  description: string;
}
