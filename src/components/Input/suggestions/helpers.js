export function toParams(object) {
  var str = ''
  for (var key in object) {
    if (str != '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(object[key])
  }

  return str
}

export function urlFormat(string) {
  // string = string
  //   .split(' ')
  //   .reduce((prev, curr) => `${prev}+${curr}`, '')
  //   .substr(1)
  string = encodeURI(string)
  return string
}
