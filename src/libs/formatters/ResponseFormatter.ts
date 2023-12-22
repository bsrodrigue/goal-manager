const ResponseFormater = {
  format,
};

function format(obj: {
  id: number;
  attributes: object;
}) {
  return { id: obj.id, ...obj.attributes };
}

export default ResponseFormater;
