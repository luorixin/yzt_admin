let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = '//localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '//www.xiniting.com'
}

export {
  baseUrl
}
