export function baseUrl() {
  return window.location.origin
}
export function idIsNull(id){
  return [null, false, '', ' ', 0, '0'].includes(id)
}