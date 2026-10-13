export interface Birthday {
  id: string;
  athlete: string;
  birthDate: string;
  gift: string;
}

export interface Gift {
  id: string;
  name: string;
  status: "enabled" | "disabled";
}
