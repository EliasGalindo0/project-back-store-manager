const runSchema = (schema) => async (unknow) => {
  const { error, value } = await schema.validate(unknow);
  if (error) throw error;
  return value;
};

module.exports = {
  runSchema,
};