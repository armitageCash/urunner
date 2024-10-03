import { Runtime } from "./runtime";

export { Runtime, UsecaseType, UseCaseResult } from "./runtime";
export const createApp = <P, D, R>(
  adapter?: (params: P, dependencies: D) => Promise<R>
) => new Runtime<P, D, R>(adapter);
