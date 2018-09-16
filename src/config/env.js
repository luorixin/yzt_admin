let baseUrl = ''

if (process.env.NODE_ENV === 'development') {

} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '//xiniting.com'
}

export {
  baseUrl
}
