export type UserRole = "student" | "faculty" | "admin";
export type AchievementStatus = "pending" | "approved" | "rejected";

export interface Achievement {
  id: string;
  eventName: string;
  category: "Sports" | "Cultural" | "Technical" | "Academic";
  level: "College" | "District" | "State" | "National" | "International";
  position: string;
  date: string;
  studentName: string;
  department: string;
  certificate?: string;
  status: AchievementStatus;
  submittedDate: string;
  approvedDate?: string;
  approvedBy?: string;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    eventName: "Cricket Tournament",
    category: "Sports",
    level: "State",
    position: "Winner",
    date: "2025-11-15",
    studentName: "Rahul Sharma",
    department: "Computer Science",
    status: "approved",
    submittedDate: "2025-11-16",
    approvedDate: "2025-11-18",
    approvedBy: "Dr. Mehta",
  },
  {
    id: "2",
    eventName: "Coding Hackathon",
    category: "Technical",
    level: "National",
    position: "Runner-up",
    date: "2025-10-22",
    studentName: "Rahul Sharma",
    department: "Computer Science",
    status: "approved",
    submittedDate: "2025-10-23",
    approvedDate: "2025-10-25",
    approvedBy: "Prof. Singh",
  },
  {
    id: "3",
    eventName: "Cultural Fest Dance",
    category: "Cultural",
    level: "District",
    position: "1st Place",
    date: "2025-09-10",
    studentName: "Rahul Sharma",
    department: "Computer Science",
    status: "approved",
    submittedDate: "2025-09-11",
    approvedDate: "2025-09-13",
    approvedBy: "Dr. Mehta",
  },
  {
    id: "4",
    eventName: "Basketball Championship",
    category: "Sports",
    level: "College",
    position: "Winner",
    date: "2025-08-05",
    studentName: "Priya Patel",
    department: "Electronics",
    status: "approved",
    submittedDate: "2025-08-06",
    approvedDate: "2025-08-08",
    approvedBy: "Prof. Singh",
  },
  {
    id: "5",
    eventName: "Web Development Contest",
    category: "Technical",
    level: "State",
    position: "2nd Place",
    date: "2025-07-18",
    studentName: "Priya Patel",
    department: "Electronics",
    status: "pending",
    submittedDate: "2025-07-19",
  },
  {
    id: "6",
    eventName: "Singing Competition",
    category: "Cultural",
    level: "National",
    position: "Finalist",
    date: "2025-12-01",
    studentName: "Ankit Verma",
    department: "Mechanical",
    status: "pending",
    submittedDate: "2025-12-02",
  },
  {
    id: "7",
    eventName: "Robotics Challenge",
    category: "Technical",
    level: "National",
    position: "Winner",
    date: "2026-01-20",
    studentName: "Rahul Sharma",
    department: "Computer Science",
    status: "approved",
    submittedDate: "2026-01-21",
    approvedDate: "2026-01-23",
    approvedBy: "Dr. Mehta",
  },
  {
    id: "8",
    eventName: "Debate Competition",
    category: "Cultural",
    level: "State",
    position: "Runner-up",
    date: "2026-02-10",
    studentName: "Priya Patel",
    department: "Electronics",
    status: "rejected",
    submittedDate: "2026-02-11",
  },
  {
    id: "9",
    eventName: "Science Olympiad",
    category: "Academic",
    level: "International",
    position: "Gold Medal",
    date: "2026-01-05",
    studentName: "Ankit Verma",
    department: "Mechanical",
    status: "approved",
    submittedDate: "2026-01-06",
    approvedDate: "2026-01-08",
    approvedBy: "Prof. Singh",
  },
  {
    id: "10",
    eventName: "Chess Tournament",
    category: "Sports",
    level: "District",
    position: "Winner",
    date: "2026-02-15",
    studentName: "Rahul Sharma",
    department: "Computer Science",
    status: "pending",
    submittedDate: "2026-02-16",
  },
];

export const studentProfile = {
  name: "Rahul Sharma",
  department: "Computer Science",
  rollNo: "CS2023042",
  email: "rahul.sharma@university.edu",
  year: "3rd Year",
};

export const currentUser = {
  name: "Admin User",
  role: "admin" as UserRole,
  email: "admin@university.edu",
};
