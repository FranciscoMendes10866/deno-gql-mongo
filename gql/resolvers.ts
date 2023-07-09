import { InferResolvers } from "garph";
import { YogaInitialContext } from "graphql-yoga";
import { ObjectId } from "mongodb";

import { BookType, mutationType, queryType } from "./schema.ts";
import books, { BookCollection } from "../db/collections/books.ts";

type Resolvers = InferResolvers<
  { Query: typeof queryType; Mutation: typeof mutationType },
  { context: YogaInitialContext }
>;

export const resolvers: Resolvers = {
  Query: {
    getBook: async (_root, args, _ctx) => {
      const document = await books.findOne({ _id: new ObjectId(args.id) });
      if (!document) return;

      const { _id, ...rest } = document;

      return {
        id: _id.toString(),
        ...rest,
      } satisfies BookType;
    },
    getBooks: async (_root, _args, _ctx) => {
      const result = await books.find().toArray();
      if (!result) return [];

      const data = result.map(({ _id, ...rest }) => ({
        id: _id.toString(),
        ...rest,
      })) satisfies Array<BookType>;

      return data;
    },
  },
  Mutation: {
    addBook: async (_root, { input }, _ctx) => {
      const documentId = await books.insertOne(input);
      const result = await books.findOne({ _id: documentId });
      if (!result) return;

      const { _id, ...rest } = result;

      return {
        id: _id.toString(),
        ...rest,
      } satisfies BookType;
    },
    updateBook: async (_root, { input }, _ctx) => {
      const { id, ...rest } = input;

      const document = await books.updateOne({ _id: new ObjectId(id) }, {
        $set: rest as BookCollection,
      });

      if (document.modifiedCount !== 1) return;

      const result = await books.findOne({ _id: document.upsertedId });
      if (!result) return;

      const { _id, ...others } = result;

      return {
        id: _id.toString(),
        ...others,
      } satisfies BookType;
    },
    deleteBook: async (_root, { id }, _ctx) => {
      const documentId = new ObjectId(id);

      const result = await books.findOne({ _id: documentId });
      if (!result) return;

      await books.deleteOne({ _id: documentId });

      const { _id, ...rest } = result;

      return {
        id: _id.toString(),
        ...rest,
      } satisfies BookType;
    },
  },
};
