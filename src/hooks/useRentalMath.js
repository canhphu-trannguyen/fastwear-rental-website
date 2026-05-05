const dayInMilliseconds = 24 * 60 * 60 * 1000
const minimumRentalDays = 2
const maximumRentalDays = 7

export function getRentalDays(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) {
    return 0
  }

  const pickup = new Date(`${pickupDate}T00:00:00`)
  const rentalReturn = new Date(`${returnDate}T00:00:00`)
  const duration = Math.ceil((rentalReturn - pickup) / dayInMilliseconds)

  return Number.isFinite(duration) && duration > 0 ? duration : 0
}

export function isRentalDurationValid(rentalDays) {
  return rentalDays >= minimumRentalDays && rentalDays <= maximumRentalDays
}

export function calculateRentalTotals({
  rentalDays,
  rentalPricePerDay,
  retailPriceNumeric,
  shippingMethod = 'standard_delivery',
}) {
  const rentalSubtotal = rentalDays * rentalPricePerDay
  const depositRequired = retailPriceNumeric * 0.5
  const shippingFee = shippingMethod === 'standard_delivery' ? 30000 : 0
  const totalPayable = rentalSubtotal + depositRequired + shippingFee

  return {
    rentalSubtotal,
    depositRequired,
    shippingFee,
    totalPayable,
  }
}

export function useRentalMath({
  pickupDate,
  returnDate,
  rentalPricePerDay,
  retailPriceNumeric,
  shippingMethod = 'standard_delivery',
}) {
  const rentalDays = getRentalDays(pickupDate, returnDate)
  const totals = calculateRentalTotals({
    rentalDays,
    rentalPricePerDay,
    retailPriceNumeric,
    shippingMethod,
  })

  return {
    rentalDays,
    isDurationValid: isRentalDurationValid(rentalDays),
    minimumRentalDays,
    maximumRentalDays,
    ...totals,
  }
}
