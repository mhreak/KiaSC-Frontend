export interface Discount {
  id: string;
  name: string;
  code: string;
  type: "byPrice" | "byPercentage" | "custom";
}

export interface DiscountReport {
  id: string;
  athlete: string;
  course: string;
  status: "removed" | "submitting" | "submitted";
  discountAmount: number;
  finalPrice: number;
}
