export default function skipTodos(reqLimit: number, reqPage: number) {
  const page = reqLimit * reqPage - reqLimit;
  return Math.max(0, page);
}
