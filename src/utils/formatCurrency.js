const vndFormatter = new Intl.NumberFormat('en-US')

export function formatVnd(amount) {
  return `${vndFormatter.format(amount)} VND`
}
