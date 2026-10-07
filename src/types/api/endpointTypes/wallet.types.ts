export interface Wallet {
  id: string;
  ownerName: string;
  amount: number;
  modifiedDate: string;
}

export interface WalletHistory {
  id: string;
  date: string;
  amountChange: number;
  amountAfterChange: number;
  description: string;
}

export interface IntroducingWalletCharge {
  id: string;
  ownerName: string;
  amount: number;
  introducingPercentage: number;
}

export interface SpecialWallet {
  id: string;
  name: string;
  amount: number;
  status: "enabled" | "disabled";
  modifiedDate: string;
}
