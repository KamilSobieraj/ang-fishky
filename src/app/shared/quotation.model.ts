export class Quotation {
constructor(public id: string,
            public content: string,
            public author: string,
            public bookName: string,
            public pageNumber: string,
            public publicationYear: string,
            public editorName: string,
            public tags: string[]) {}
}

// Firebase will be used, so id as a string will work better
// In Quotation model pageNumber is a string due to the fact, there are alphanumerics pages.
// Publication year as well, because of some unpredictable notes.

