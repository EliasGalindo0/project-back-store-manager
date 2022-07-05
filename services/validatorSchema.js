const validatorSchema = (schema) => async (unknow) => {
  const { error, value } = schema.validate(unknow);
  if (error) throw error;
  return value;
};

module.exports = validatorSchema;