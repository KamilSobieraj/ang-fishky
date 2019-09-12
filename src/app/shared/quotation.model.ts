export interface Quotation {
  id?: string;
  content: string;
  author: string;
  bookName: string;
  pageNumber: string;
  publicationYear: string;
  editorName: string;
  tags: string[];
  remarks: string;
}

// Firebase will be used, so id as a string will work better
// In Quotation model pageNumber is a string due to the fact, there are alphanumerics pages.
// Publication year as well, because of some unpredictable notes.

