export const required = value => {
  if(value) return undefined;
  return 'Field is required';
}
export const maxLength = (max) => value => {
  if(value.length > max)  return `max length ${max} is symbols`;
  return undefined;
}