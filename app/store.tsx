import { create } from 'zustand'

interface DotStore {
  schoolInput: string
  setSchoolInput: (schoolInput: string) => void,
  selectedSchoolId: number | null
  setSelectedSchoolId: (selectedSchoolId: number | null) => void,
  radius: number,
  setRadius: (radius: number) => void,
  fetchingSchools: boolean,
  schools: any[],
  getSchools: (affiliationCode: string, radius: number) => void,
}

const callApi = async (url: string) => {
  const BASE_URL = 'http://localhost:3000/api'
  const res = await fetch(BASE_URL + url)
  const data = await res.json()
  return data
}
const useDotStore = create<DotStore>((set) => ({
  schoolInput: '',
  setSchoolInput: (schoolInput) => set({ schoolInput }),
  selectedSchoolId: null,
  setSelectedSchoolId: (selectedSchoolId) => set({ selectedSchoolId }),
  radius: 6,
  setRadius: (radius) => set({ radius }),
  schools: [],
  fetchingSchools: false,
  getSchools: async (affiliationCode, radius) => {
    set({ fetchingSchools: true })
    const { schools } = await callApi('/getSchoolsByRadius?affiliationCode=' + affiliationCode + '&radius=' + radius)
    set({ fetchingSchools: false })
    console.log('schools....', schools)
    set({ schools })
  },
}))

export default useDotStore