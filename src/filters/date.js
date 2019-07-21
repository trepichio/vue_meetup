export default (value, locale = ['en-us']) => {
  const date = new Date(value);
  return date.toLocaleString(
  	...locale,
  	{
  		month: 'long',
  		day: '2-digit',
  		year: 'numeric',
  		hour: '2-digit',
  		minute: '2-digit'
  	});
}