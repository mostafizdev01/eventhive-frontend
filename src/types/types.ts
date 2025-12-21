export interface Host {
  id: string;
  bio: string | null;
  website: string | null;
  company: string | null;
  verified: boolean;
  userId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  location: string;

  eventDate: string;     // "2025-12-16T00:00:00.000Z"
  startTime: string;     // "02:47"
  endTime: string;       // "21:21"

  ticketPrice: number;
  totalSeats: number;
  availableSeats: number;

  status: "OPEN" | "CLOSED" | "CANCELLED"; // enum-like
  category: string;

  hostId: string;

  createdAt: string;
  updatedAt: string;

  hosts: Host;
  reviews: Review[];
}
