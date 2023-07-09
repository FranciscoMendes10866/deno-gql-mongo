import { ObjectId } from "mongodb";

import { BookStatus } from "../../common/status.ts";
import { db } from "../index.ts";

export interface BookCollection {
  _id: ObjectId;
  title: string;
  description: string;
  status: BookStatus;
}

export default db.collection<BookCollection>("books");
