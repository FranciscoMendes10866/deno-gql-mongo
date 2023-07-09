export enum BookStatus {
  AVAILABLE = "Available",
  IN_PROCESS = "InProcess",
  NOT_AVAILABLE = "NotAvailable",
  DAMAGED = "Damaged",
  MISSING = "Missing",
}

export const bookStatus = Object.values(BookStatus);
