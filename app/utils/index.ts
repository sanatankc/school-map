export const convertToWord = (num: number | string, suffix: string = '+', precision: number = 0) => {
  if (num === null || num === undefined || num === 0) return '-'
  let numString = ''
  if (typeof num !== 'number') return num
  if (num < 1000) {
    numString = num.toString()
  }
  if (num < 100000) {
    numString = (num / 1000).toFixed(precision) + 'k' + suffix
  } else if (num < 10000000) {
    numString = (num / 100000).toFixed(precision) + 'L' + suffix
  } else {
    numString = (num / 10000000).toFixed(precision) + ' cr' + suffix
  }
  numString = numString.replace('.00', '')
  numString = '₹ ' + numString
  return numString
}

export const average = (...args: Array<number>): number => {
  const filteredValues = args.filter((value) => value !== null && value !== undefined && value !== 0)
  if (filteredValues.length === 0) return 0
  return filteredValues.reduce((acc, curr) => acc + curr, 0) / filteredValues.length
}

export const getRevenue = (school: any) => {
  const { yearlyFees, admissionFee } = getFees(school)
  console.log('fees...', yearlyFees, admissionFee)
  return (yearlyFees * Number(school.studentCount)) + (admissionFee * Number(school.studentCount))
}

export const getFees = ({
  tuitionFeePrimary,
  tuitionFeeMiddle,
  tuitionFeeSecondary,
  tuitionFeeSeniorSecondary,
  otherFeePrimary,
  otherFeeMiddle,
  otherFeeSecondary,
  otherFeeSeniorSecondary,
  yearlyFeesPrimary,
  yearlyFeesMiddle,
  yearlyFeesSecondary,
  yearlyFeesSeniorSecondary,
  admissionFeePrimary,
  admissionFeeMiddle,
  admissionFeeSecondary,
  admissionFeeSeniorSecondary,
} : {
  tuitionFeePrimary: number,
  tuitionFeeMiddle: number,
  tuitionFeeSecondary: number,
  tuitionFeeSeniorSecondary: number,
  otherFeePrimary: number,
  otherFeeMiddle: number,
  otherFeeSecondary: number,
  otherFeeSeniorSecondary: number,
  yearlyFeesPrimary: number,
  yearlyFeesMiddle: number,
  yearlyFeesSecondary: number,
  yearlyFeesSeniorSecondary: number,
  admissionFeePrimary: number,
  admissionFeeMiddle: number,
  admissionFeeSecondary: number,
  admissionFeeSeniorSecondary: number,
} ) => {
  const averageTuitionFee = average(tuitionFeePrimary, tuitionFeeMiddle, tuitionFeeSecondary, tuitionFeeSeniorSecondary)
  const averageOtherFee = average(otherFeePrimary, otherFeeMiddle, otherFeeSecondary, otherFeeSeniorSecondary)
  const averageYearlyFees = average(yearlyFeesPrimary, yearlyFeesMiddle, yearlyFeesSecondary, yearlyFeesSeniorSecondary)
  const averageAdmissionFee = average(admissionFeePrimary, admissionFeeMiddle, admissionFeeSecondary, admissionFeeSeniorSecondary)
  return {
    yearlyFees: averageTuitionFee + averageOtherFee + averageYearlyFees,
    admissionFee: averageAdmissionFee,
  }
}


export const approxPlus = (value: number, modulo = 50, floor = true) => {
  console.log('value..', value)
  if (value === null || value === undefined || value === 0 || isNaN(value)) return '-'
  const reaminder = value % modulo
  if (reaminder === 0) return value
  if (!floor) {
    return value + modulo - reaminder
  }
  return value - reaminder
}

export const approxPlus50 = (value: number)  => approxPlus(value, 50)

export const approxPlus10k = (value: number)  => approxPlus(value, 10000)
export const approxPlus10kRound = (value: number)  => approxPlus(value, 10000, false)

export const forceLink = (url: string) => {
  if (url && !url.startsWith('http') || url.startsWith('https')) {
    return 'https://' + url
  }
}

export const dashZero = (value: number) => {
  if (value === 0) return '-'
  return value
}

export const getCategory = (school: { fees: number }) => {
  if (school.fees > 120000) {
    return 'A'
  }
  if (school.fees >= 80000) {
    return 'B'
  }
  if (school.fees > 40000) {
    return 'C'
  }
  return 'D'
}
