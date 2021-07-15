import { IResolvers } from "graphql-tools";
import type  from "./type";
import query from "./query";
import mutation from "./mutation";

const resolversMap : IResolvers = {
    ...query,
    ...type,
    ...mutation
}

export default resolversMap;

