export function getReqServiceOptions(database: any, req: any) {
  return {
    knex: database,
    accountability: req.accountability,
    schema: req.schema,
  };
}
