export interface User {
  id: string;
  name: string;
  role: "Manager" | "Athlete" | "Admin" | "Person";
}

export interface UserActivity {
  id: string;
  title: string;
  createdAt: string;
  description: string;
}

export interface UserRole {
  id: string;
  name: string;
}
