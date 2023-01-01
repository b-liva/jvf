export function baseUrl() {
  return window.location.origin
}
export function idIsNull(id){
  return id in [false, '', ' ', 0, '0']
}