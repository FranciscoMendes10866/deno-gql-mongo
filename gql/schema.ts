import { GarphSchema, Infer } from "garph";

import { bookStatus } from "../common/status.ts";

export const g = new GarphSchema();

// ======================== Schema definition ========================

const bookAvailability = g.enumType("availability", bookStatus);

export const book = g.type("Book", {
  id: g.id(),
  title: g.string(),
  description: g.string(),
  status: bookAvailability,
});

export type BookType = Infer<typeof book>;

const addBookInput = g.inputType("AddBookInput", {
  title: g.string(),
  description: g.string(),
  status: bookAvailability,
});

const updateBookInput = g.inputType("UpdateBookInput", {
  id: g.id(),
  title: g.string().optional(),
  description: g.string().optional(),
  status: bookAvailability,
});

// ======================== Resolvers definition ========================

export const queryType = g.type("Query", {
  getBook: g
    .ref(book)
    .optional()
    .args({ id: g.id() })
    .description("Gets a book taking into account it's ID"),
  getBooks: g.ref(book).list().description("Gets all the books"),
});

export const mutationType = g.type("Mutation", {
  addBook: g
    .ref(book)
    .optional()
    .args({
      input: addBookInput,
    })
    .description("Inserts a bew book"),
  deleteBook: g
    .ref(book)
    .optional()
    .args({
      id: g.id(),
    })
    .description("Deletes a book taking into account it's ID"),
  updateBook: g
    .ref(book)
    .optional()
    .args({
      input: updateBookInput,
    })
    .description("Updates a specific book content"),
});
