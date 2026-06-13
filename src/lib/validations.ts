export function validatePhoneNumber(phoneNumber: string): boolean {
  // Persian/Iranian phone number format
  const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/
  return iranianPhoneRegex.test(phoneNumber.replace(/\s/g, ''))
}

export function validateOTP(otp: string): boolean {
  const otpRegex = /^\d{6}$/
  return otpRegex.test(otp)
}

export function normalizePhoneNumber(phoneNumber: string): string {
  let normalized = phoneNumber.replace(/\s/g, '')
  if (normalized.startsWith('0098')) {
    normalized = '0' + normalized.slice(4)
  } else if (normalized.startsWith('+98')) {
    normalized = '0' + normalized.slice(3)
  } else if (normalized.startsWith('98')) {
    normalized = '0' + normalized.slice(2)
  }
  return normalized
}
