const prefix = 'vita'

export default {
  write(key, value) {
    localStorage.setItem(`${prefix}-${key}`, JSON.stringify(value))
  },
  read(key, defaultVal) {
    let def = null
    if (typeof defaultVal !== 'undefined') {
      def = defaultVal
    }
    return JSON.parse(localStorage.getItem(`${prefix}-${key}`)) || def
  },
  remove(key) {
    localStorage.removeItem(`${prefix}-${key}`)
  },
}
