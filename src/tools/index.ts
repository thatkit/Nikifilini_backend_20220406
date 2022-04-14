export const serialize = (obj, prefix) => {
  const str = []
  let prop
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const key = prefix ? prefix + '[' + prop + ']' : prop,
        val = obj[prop]
      str.push(
        val !== null && typeof val === 'object'
          ? serialize(val, key)
          : encodeURIComponent(key) + '=' + encodeURIComponent(val),
      )
    }
  }
  console.log('prop:', prop)

  return str.join('&')
}
