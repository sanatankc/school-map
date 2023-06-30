const varchar = (name: string, options: { length: number }) =>  (val) => {
  if (typeof val === 'string') {
    if (val.length > options.length) {
      console.warn(`Truncating ${name} to ${options.length} characters`)
      return val.substring(0, options.length)
    }
    return val
  }
  return String(val)
}

const int = (name: string) => (val) => {
  if (typeof val === 'string') {
    val = val.replaceAll(',', '')
    val = val.replaceAll(' ', '')
    const numVal = parseInt(val)
    if (isNaN(numVal)) {
      return null
    }
    return numVal
  }
  return val
}

const float = (name: string) => (val) => {
  if (typeof val === 'string') {
    val = val.replaceAll(',', '')
    val = val.replaceAll(' ', '')
    const numVal = parseFloat(val)
    if (isNaN(numVal)) {
      return null
    }
    return numVal
  }
  return val
}
const boolean = (name: string) => (val) => {
  const truthyString = ['yes', 'true']
  const falseyString = ['yes', 'false']
  if (typeof val === 'boolean') {
    return val
  }
  if (typeof val === 'string') {
    if (truthyString.includes(val.toLowerCase())) {
      return true
    }
    if (falseyString.includes(val.toLowerCase())) {
      return false
    }
    return null
  }
  return null
}

const paths = ({
  name: {
    type: varchar("name", { length: 200 }),
    path: '#lblsch_name'
  },
  lat: {
    type: float("lat"),
    path: ''
  },
  long: {
    type: float("long"),
    path: ''
  },
  code: {
    type: varchar("code", { length: 10 }),
    path: '#lblschcode'
  },
  address: {
    type: varchar("address", { length: 400 }),
    path: '#lbladd'
  },
  affiliationCode: {
    type: int("affiliationCode"),
    path: '#lblaff'
  },
  principalName: {
    type: varchar("principalName", { length: 120 }),
    path: '#lblprinci'
  },
  principalContact: {
    type: varchar("principalContact", { length: 20 }),
    path: '#lblprincicon'
  },
  principalEmail: {
    type: varchar("principalEmail", { length: 50 }),
    path: '#lblprinciemail'
  },
  principalRetirementDate: {
    type: varchar("principalRetirementDate", { length: 100 }),
    path: '#lblretire'
  },
  contactNumber: {
    type: varchar("contactNumber", { length: 20 }),
    path: '#lblcon'
  },
  email: {
    type: varchar("email", { length: 50 }),
    path: '#lblschemail'
  },
  website: {
    type: varchar("website", { length: 200 }),
    path: '#lblschweb'
  },
  faxNumber: {
    type: varchar("faxNumber", { length: 20 }),
    path: '#lblfax'
  },
  landmark: {
    type: varchar("landmark", { length: 200 }),
    path: '#lbllandmark'
  },
  establishmentYear: {
    type: int("establishmentYear"),
    path: '#lblestd'
  },
  affiliationValidity: {
    type: varchar("affiliationValidity", { length: 200 }),
    path: '#lblaffstatus'
  },
  affiliationStatus: {
    type: varchar("affiliationStatus", { length: 50 }),
    path: '#lblaffstatus'
  },
  trustSocietyCompany: {
    type: varchar("trustSocietyCompany", { length: 200 }),
    path: '#lbltrust'
  },
  registrationDate: {
    type: varchar("registrationDate", { length: 100 }),
    path: '#lblregdate'
  },
  societyRegistrationNumber: {
    type: varchar("societyRegistrationNumber", { length: 50 }),
    path: '#lblregnum'
  },
  registrationValidity: {
    type: varchar("registrationValidity", { length: 100 }),
    path: '#lblregvalid'
  },
  nocAuthority: {
    type: varchar("nocAuthority", { length: 200 }),
    path: '#lblnoc'
  },
  nocDate: {
    type: varchar("nocDate", { length: 100 }),
    path: '#lblnocdate'
  },
  affiliationGrantYear: {
    type: int("affiliationGrantYear"),
    path: '#lblAffGrantYear'
  },
  basicDetailsLastUpdated: {
    type: varchar("basicDetailsLastUpdated", { length: 100 }),
    path: '#lbldatebasic'
  },

  totalTeachers: {
    type: int("totalTeachers"),
    path: '#lbltot_teach'
  },
  numberOfPGTs: {
    type: int("numberOfPGTs"),
    path: '#lbltot_pgt'
  },
  numberOfTGTs: {
    type: int("numberOfTGTs"),
    path: '#lbltot_tgt'
  },
  numberOfPRTs: {
    type: int("numberOfPRTs"),
    path: '#lbltot_prt'
  },
  numberOfPETs: {
    type: int("numberOfPETs"),
    path: '#lbltot_pet'
  },
  nonTeachingStaff: {
    type: int("nonTeachingStaff"),
    path: '#lbltot_otherstaff'
  },
  trainedTeachers: {
    type: int("trainedTeachers"),
    path: '#lblctet'
  },
  facultyTrainings: {
    type: int("facultyTrainings"),
    path: '#lbltrain'
  },
  facultDetailslastUpdated: {
    type: varchar("facultDetailslastUpdated", { length: 100 }),
    path: '#lbldate1'
  },


  grade1TotalSections: {
    type: int("grade1TotalSections"),
    path: '#lblsec1'
  },
  grade1TotalIntake: {
    type: int("grade1TotalIntake"),
    path: '#lblint1'
  },
  grade1TotalStudents: {
    type: int("grade1TotalStudents"),
    path: '#lblstu1'
  },

  grade2TotalSections: {
    type: int("grade2TotalSections"),
    path: '#lblsec2'
  },
  grade2TotalIntake: {
    type: int("grade2TotalIntake"),
    path: '#lblint2'
  },
  grade2TotalStudents: {
    type: int("grade2TotalStudents"),
    path: '#lblstu2'
  },

  grade3TotalSections: {
    type: int("grade3TotalSections"),
    path: '#lblsec3'
  },
  grade3TotalIntake: {
    type: int("grade3TotalIntake"),
    path: '#lblint3'
  },
  grade3TotalStudents: {
    type: int("grade3TotalStudents"),
    path: '#lblstu3'
  },

  grade4TotalSections: {
    type: int("grade4TotalSections"),
    path: '#lblsec4'
  },
  grade4TotalIntake: {
    type: int("grade4TotalIntake"),
    path: '#lblint4'
  },
  grade4TotalStudents: {
    type: int("grade4TotalStudents"),
    path: '#lblstu4'
  },

  grade5TotalSections: {
    type: int("grade5TotalSections"),
    path: '#lblsec5'
  },
  grade5TotalIntake: {
    type: int("grade5TotalIntake"),
    path: '#lblint5'
  },
  grade5TotalStudents: {
    type: int("grade5TotalStudents"),
    path: '#lblstu5'
  },

  grade6TotalSections: {
    type: int("grade6TotalSections"),
    path: '#lblsec6'
  },
  grade6TotalIntake: {
    type: int("grade6TotalIntake"),
    path: '#lblint6'
  },
  grade6TotalStudents: {
    type: int("grade6TotalStudents"),
    path: '#lblstu6'
  },

  grade7TotalSections: {
    type: int("grade7TotalSections"),
    path: '#lblsec7'
  },
  grade7TotalIntake: {
    type: int("grade7TotalIntake"),
    path: '#lblint7'
  },
  grade7TotalStudents: {
    type: int("grade7TotalStudents"),
    path: '#lblstu7'
  },

  grade8TotalSections: {
    type: int("grade8TotalSections"),
    path: '#lblsec8'
  },
  grade8TotalIntake: {
    type: int("grade8TotalIntake"),
    path: '#lblint8'
  },
  grade8TotalStudents: {
    type: int("grade8TotalStudents"),
    path: '#lblstu8'
  },

  grade9TotalSections: {
    type: int("grade9TotalSections"),
    path: '#lblsec9'
  },
  grade9TotalIntake: {
    type: int("grade9TotalIntake"),
    path: '#lblint9'
  },
  grade9TotalStudents: {
    type: int("grade9TotalStudents"),
    path: '#lblstu9'
  },

  grade10TotalSections: {
    type: int("grade10TotalSections"),
    path: '#lblsec10'
  },
  grade10TotalIntake: {
    type: int("grade10TotalIntake"),
    path: '#lblint10'
  },
  grade10TotalStudents: {
    type: int("grade10TotalStudents"),
    path: '#lblstu10'
  },

  grade11TotalSections: {
    type: int("grade11TotalSections"),
    path: '#lblsec11'
  },
  grade11TotalIntake: {
    type: int("grade11TotalIntake"),
    path: '#lblint11'
  },
  grade11TotalStudents: {
    type: int("grade11TotalStudents"),
    path: '#lblstu11'
  },

  grade12TotalSections: {
    type: int("grade12TotalSections"),
    path: '#lblsec12'
  },
  grade12TotalIntake: {
    type: int("grade12TotalIntake"),
    path: '#lblint12'
  },
  grade12TotalStudents: {
    type: int("grade12TotalStudents"),
    path: '#lblstu12'
  },

  gradeDetailsLastUpdated: {
    type: varchar("gradeDetailsLastUpdated", { length: 100 }),
    path: '#lbldate2'
  },

  subjectsOfferedForClass10: {
    type: varchar("subjectsOfferedForClass10", { length: 1000 }),
    path: '#sub10'
  },
  subjectsOfferedForClass12: {
    type: varchar("subjectsOfferedForClass12", { length: 1000 }),
    path: '#sub12'
  },
  subjectsOfferedlastUpdated: {
    type: varchar("subjectsOfferedlastUpdated", { length: 100 }),
    path: '#lbldate3'
  },

  totalSites: {
    type: int("totalSites"),
    path: '#lblsite'
  },
  guardsEmployed: {
    type: boolean("guardsEmployed"),
    path: '#lblsafe'
  },
  schoolArea: {
    type: float("schoolArea"),
    path: '#lblarea'
  },
  totalPlaygrounds: {
    type: int("totalPlaygrounds"),
    path: '#lbltot_play'
  },
  playgroundArea: {
    type: float("playgroundArea"),
    path: '#lblplayarea'
  },
  totalRooms: {
    type: int("totalRooms"),
    path: '#lbltot_room'
  },
  smallRooms: {
    type: int("smallRooms"),
    path: '#lblsmallroom'
  },
  mediumRooms: {
    type: int("mediumRooms"),
    path: '#lblmediumroom'
  },
  largeRooms: {
    type: int("largeRooms"),
    path: '#lbllargeroom'
  },
  maleRestRooms: {
    type: int("maleRestRooms"),
    path: '#lblmalestaff'
  },
  totalToilets: {
    type: int("totalToilets"),
    path: '#lbltoi'
  },
  femaleRestRooms: {
    type: int("femaleRestRooms"),
    path: '#lblgtoilet'
  },
  boysToilets: {
    type: int("boysToilets"),
    path: '#lblbtoilet'
  },
  differentlyAbledToilets: {
    type: int("differentlyAbledToilets"),
    path: '#lbldifftoilet'
  },
  femaleStaffWashrooms: {
    type: int("femaleStaffWashrooms"),
    path: '#lblfe_rest'
  },
  maleStaffWashrooms: {
    type: int("maleStaffWashrooms"),
    path: '#lblma_rest'
  },
  totalLibraries: {
    type: int("totalLibraries"),
    path: '#lbltot_lib'
  },
  totalLaboratories: {
    type: int("totalLaboratories"),
    path: '#lbllab'
  },
  studentCanteens: {
    type: int("studentCanteens"),
    path: '#lbltot_cant'
  },
  waterPurifiers: {
    type: int("waterPurifiers"),
    path: '#lblro'
  },
  staffCanteens: {
    type: int("staffCanteens"),
    path: '#lbltot_cantstaff'
  },
  auditoriums: {
    type: int("auditoriums"),
    path: '#lblaudi'
  },
  liftsElevators: {
    type: int("liftsElevators"),
    path: '#lbllift'
  },
  digitalClassrooms: {
    type: int("digitalClassrooms"),
    path: '#lblsmart'
  },
  hostelFacility: {
    type: boolean("hostelFacility"),
    path: '#lblhostel'
  },
  buildingBlocks: {
    type: int("buildingBlocks"),
    path: '#lblblock'
  },
  fireExtinguishers: {
    type: boolean("fireExtinguishers"),
    path: '#lblfireext'
  },
  sprinklers: {
    type: boolean("sprinklers"),
    path: '#lblsprinkler'
  },
  cctvCameras: {
    type: boolean("cctvCameras"),
    path: '#lblcctv'
  },
  computersInLab: {
    type: int("computersInLab"),
    path: '#lblcompno'
  },
  examinationCenter: {
    type: boolean("examinationCenter"),
    path: '#lblcenter'
  },
  webServers: {
    type: boolean("webServers"),
    path: '#lblserver'
  },
  boundaryWall: {
    type: boolean("boundaryWall"),
    path: '#lblwall'
  },
  clinicFacility: {
    type: boolean("clinicFacility"),
    path: '#lblclinic'
  },
  barrierFreeRamps: {
    type: boolean("barrierFreeRamps"),
    path: '#lblbarrier'
  },
  strongRoom: {
    type: boolean("strongRoom"),
    path: '#lblstrong'
  },
  gymnasium: {
    type: boolean("gymnasium"),
    path: '#lblbarrier'
  },
  wifiEnabled: {
    type: boolean("wifiEnabled"),
    path: '#lblwifi'
  },
  indoorGames: {
    type: boolean("indoorGames"),
    path: '#lblindoor'
  },
  fireAlarms: {
    type: boolean("fireAlarms"),
    path: '#lblfirealarm'
  },
  sportsFacility: {
    type: boolean("sportsFacility"),
    path: '#lblsport'
  },
  webBasedLearning: {
    type: boolean("webBasedLearning"),
    path: '#lblwebbased'
  },
  swimmingPool: {
    type: boolean("swimmingPool"),
    path: '#lblswim'
  },
  danceMusicFacility: {
    type: boolean("danceMusicFacility"),
    path: '#lbldance'
  },
  busesOwned: {
    type: int("busesOwned"),
    path: '#lblbusown'
  },
  busesHired: {
    type: int("busesHired"),
    path: '#lblbushire'
  },
  vansMatadors: {
    type: int("vansMatadors"),
    path: '#lblvan'
  },
  femaleBusAttendants: {
    type: int("femaleBusAttendants"),
    path: '#lblattend'
  },
  totalDrivers: {
    type: int("totalDrivers"),
    path: '#lbldriver'
  },
  activityRooms: {
    type: int("activityRooms"),
    path: '#lblactivity'
  },
  transportCoordinator: {
    type: varchar("transportCoordinator", { length: 200 }),
    path: '#lbltranscoord'
  },
  transportCoordinatorContact: {
    type: varchar("transportCoordinatorContact", { length: 20 }),
    path: '#lblcoordcon'
  },
  rampsForDifferentlyAbled: {
    type: boolean("rampsForDifferentlyAbled"),
    path: '#lbldiffrentlyable'
  },
  outdoorSportsFacility: {
    type: boolean("outdoorSportsFacility"),
    path: '#lblSports'
  },
  infraLastUpdated: {
    type: varchar("infraLastUpdated", { length: 100 }),
    path: '#lbldate4'
  },

  nearestBank: {
    type: varchar("nearestBank", { length: 200 }),
    path: '#lblbank'
  },
  distanceToBank: {
    type: float("distanceToBank"),
    path: '#lblbankdist'
  },
  nearestBusStation: {
    type: varchar("nearestBusStation", { length: 200 }),
    path: '#lblbus'
  },
  distanceToBusStation: {
    type: float("distanceToBusStation"),
    path: '#lblbusdist'
  },
  nearestRailwayStation: {
    type: varchar("nearestRailwayStation", { length: 200 }),
    path: '#lblrail'
  },
  distanceToRailwayStation: {
    type: float("distanceToRailwayStation"),
    path: '#lblraildist'
  },
  nearestAirport: {
    type: varchar("nearestAirport", { length: 200 }),
    path: '#lblair'
  },
  distanceToAirport: {
    type: float("distanceToAirport"),
    path: '#lblairdist'
  },
  nearestHospital: {
    type: varchar("nearestHospital", { length: 200 }),
    path: '#lblhosp'
  },
  distanceToHospital: {
    type: float("distanceToHospital"),
    path: '#lblhospdist'
  },
  nearestPoliceStation: {
    type: varchar("nearestPoliceStation", { length: 200 }),
    path: '#lblpolice'
  },
  distanceToPoliceStation: {
    type: float("distanceToPoliceStation"),
    path: '#lblpolicedist'
  },
  nearestMetroStation: {
    type: varchar("nearestMetroStation", { length: 200 }),
    path: '#lblmetro'
  },
  distanceToMetroStation: {
    type: float("distanceToMetroStation"),
    path: '#lblmetrodist'
  },
  locationDetailsLastUpdated: {
    type: varchar("locationDetailsLastUpdated", { length: 100 }),
    path: '#lbldate5'
  },

  rainWaterHarvesting: {
    type: boolean("rainWaterHarvesting"),
    path: '#DDLRainW'
  },
  roofWaterHarvesting: {
    type: boolean("roofWaterHarvesting"),
    path: '#roofwater'
  },
  waterRecycling: {
    type: boolean("waterRecycling"),
    path: '#harvastedwater'
  },
  waterFacilitiesMaintenance: {
    type: boolean("waterFacilitiesMaintenance"),
    path: '#waterfaucets'
  },
  wasteSegregation: {
    type: boolean("wasteSegregation"),
    path: '#DDLWaste'
  },
  organicWasteRecycling: {
    type: boolean("organicWasteRecycling"),
    path: '#organicwaste'
  },
  paperWasteRecycling: {
    type: boolean("paperWasteRecycling"),
    path: '#wastepaper'
  },
  paperReductionEfforts: {
    type: boolean("paperReductionEfforts"),
    path: '#reducepaper'
  },
  solidWasteDisposal: {
    type: boolean("solidWasteDisposal"),
    path: '#solidwaste'
  },
  electronicWasteDisposal: {
    type: boolean("electronicWasteDisposal"),
    path: '#sysdisposal'
  },
  energyEfficientEquipment: {
    type: boolean("energyEfficientEquipment"),
    path: '#DDLEnrgy'
  },
  plantation: {
    type: boolean("plantation"),
    path: '#DDLGreenCampus'
  },
  dripIrrigation: {
    type: boolean("dripIrrigation"),
    path: '#drip'
  },
  solarEnergyUse: {
    type: boolean("solarEnergyUse"),
    path: '#DDLSolarEngry'
  },
  roPlantWaterRecycling: {
    type: boolean("roPlantWaterRecycling"),
    path: '#roplant'
  },
  environmentalAwarenessPromotion: {
    type: boolean("environmentalAwarenessPromotion"),
    path: '#DDLAwareness'
  },
  waterAuditEducation: {
    type: boolean("waterAuditEducation"),
    path: '#childtaught'
  },
  studentWaterAuditing: {
    type: boolean("studentWaterAuditing"),
    path: '#waterauditing'
  },
  environmentalLiteracy: {
    type: boolean("environmentalLiteracy"),
    path: '#envliteracy'
  },
  treesPlanted: {
    type: int("treesPlanted"),
    path: '#notrees'
  },
  environmentProtectionLastUpdated: {
    type: varchar("environmentProtectionLastUpdated", { length: 100 }),
    path: '#lbldateenv'
  },

  tenthPassPercentage: {
    type: varchar("10thPassPercentage", {length: 50 }),
    path: '#Table6 > :nth-child(2) > :nth-child(1) > td:nth-child(2)'
  },
  twelfthPassPercentage: {
    type: varchar("12thPassPercentage", {length: 50 }),
    path: '#Table6 > :nth-child(2) > :nth-child(1) > td:nth-child(4)'
  },
  wellnessTeacher: {
    type: varchar("wellnessTeacher", { length: 120 }),
    path: '#lblwell'
  },
  grievanceOfficer: {
    type: varchar("grievanceOfficer", { length: 120 }),
    path: '#lblcomp'
  },
  grievanceOfficerContact: {
    type: varchar("grievanceOfficerContact", { length: 20 }),
    path: '#lblcompmob'
  },
  grievanceOfficerEmail: {
    type: varchar("grievanceOfficerEmail", { length: 50 }),
    path: '#lblcompemail'
  },
  harassmentCommitteeHead: {
    type: varchar("harassmentCommitteeHead", { length: 120 }),
    path: '#lblhar'
  },
  harassmentCommitteeContact: {
    type: varchar("harassmentCommitteeContact", { length: 20 }),
    path: '#lblharmob'
  },
  harassmentCommitteeEmail: {
    type: varchar("harassmentCommitteeEmail", { length: 50 }),
    path: '#lblharemail'
  },
  emergencyContactPerson: {
    type: varchar("emergencyContactPerson", { length: 120 }),
    path: '#lblem'
  },
  emergencyContactNumber: {
    type: varchar("emergencyContactNumber", { length: 20 }),
    path: '#lblemmob'
  },
  emergencyContactEmail: {
    type: varchar("emergencyContactEmail", { length: 50 }),
    path: '#lblememail'
  },
  numberOfDoctors: {
    type: int("numberOfDoctors"),
    path: '#lbldoctor'
  },
  numberOfNurses: {
    type: int("numberOfNurses"),
    path: '#lblnurse'
  },
  numberOfBeds: {
    type: int("numberOfBeds"),
    path: '#lblbed'
  },
  parentTeacherAssociation: {
    type: varchar("parentTeacherAssociation", { length: 10 }),
    path: '#lblpta'
  },
  teachersGrade: {
    type: varchar("teachersGrade", { length: 50 }),
    path: '#lblgrade'
  },
  staffSalaryTiming: {
    type: varchar("staffSalaryTiming", { length: 50 }),
    path: '#lblweek'
  },
  epfFacility: {
    type: varchar("epfFacility", { length: 10 }),
    path: '#lblepf'
  },
  epfRegistrationNumber: {
    type: varchar("epfRegistrationNumber", { length: 50 }),
    path: '#lblepfreg'
  },
  salaryPaymentMode: {
    type: varchar("salaryPaymentMode", { length: 50 }),
    path: '#lblsal'
  },
  bankWithSalaryAccount: {
    type: varchar("bankWithSalaryAccount", { length: 120 }),
    path: '#lblbankacc'
  },
  accountsAudit: {
    type: varchar("accountsAudit", { length: 10 }),
    path: '#lblaudit'
  },
  cbseInvolvementLevel: {
    type: varchar("cbseInvolvementLevel", { length: 50 }),
    path: '#lblinvolve'
  },
  academicSession: {
    type: varchar("academicSession", { length: 50 }),
    path: '#Table6 > :nth-child(2) > :nth-child(13) > td:nth-child(2)'
  },
  vacationPeriod: {
    type: varchar("vacationPeriod", { length: 50 }),
    path: '#Table6 > :nth-child(2) > :nth-child(13) > td:nth-child(4)'
  },
  bestPractices: {
    type: varchar("bestPractices", { length: 500 }),
    path: '#lblbest'
  },
  // eLearningDevelopment: {
  //   type: varchar("eLearningDevelopment", { length: 500 }),
  //   path: ''
  // },
  vitalInformationLastUpdated: {
    type: varchar("vitalInformationLastUpdated", { length: 100 }),
    path: '#lbldate6'
  },

  admissionFeeSeniorSecondary: {
    type: int("admissionFeeSeniorSecondary"),
    path: '#lblpriadm'
  },
  admissionFeeSecondary: {
    type: int("admissionFeeSecondary"),
    path: '#lblsecadm'
  },
  admissionFeeMiddle: {
    type: int("admissionFeeMiddle"),
    path: '#lblmidadm'
  },
  admissionFeePrimary: {
    type: int("admissionFeePrimary"),
    path: '#lblsenadm'
  },
  tuitionFeeSeniorSecondary: {
    type: int("tuitionFeeSeniorSecondary"),
    path: '#lblsentui'
  },
  // feesCalculated: {
  //   type: int("feesCalculated"),
  //   path: ''
  // },
  // category: {
  //   type: varchar("category", { length: 50 }),
  //   path: ''
  // },
  tuitionFeeSecondary: {
    type: int("tuitionFeeSecondary"),
    path: '#lblsectui'
  },
  tuitionFeeMiddle: {
    type: int("tuitionFeeMiddle"),
    path: '#lblmidtui'
  },
  tuitionFeePrimary: {
    type: int("tuitionFeePrimary"),
    path: '#lblpritui'
  },
  yearlyDevChargesSeniorSecondary: {
    type: int("yearlyDevChargesSeniorSecondary"),
    path: '#lblsendev'
  },
  yearlyDevChargesSecondary: {
    type: int("yearlyDevChargesSecondary"),
    path: '#lblsecdev'
  },
  yearlyDevChargesMiddle: {
    type: int("yearlyDevChargesMiddle"),
    path: '#lblmiddev'
  },
  yearlyDevChargesPrimary: {
    type: int("yearlyDevChargesPrimary"),
    path: '#lblpridev'
  },
  otherChargesSeniorSecondary: {
    type: int("otherChargesSeniorSecondary"),
    path: '#lblsenoth'
  },
  otherChargesSecondary: {
    type: int("otherChargesSecondary"),
    path: '#lblsecoth'
  },
  otherChargesMiddle: {
    type: int("otherChargesMiddle"),
    path: '#lblmidoth'
  },
  otherChargesPrimary: {
    type: int("otherChargesPrimary"),
    path: '#lblprioth'
  },
  feeStructureLastUpdated: {
    type: varchar("feeStructureLastUpdated", { length: 100 }),
    path: '#lbldate7'
  },

  udiseCode: {
    type: varchar("udiseCode", { length: 20 }),
    path: '#txtudise'
  },
  location: {
    type: varchar("location", { length: 20 }),  // Assuming this is either "rural" or "urban,
    path: '#txtslctloc'
  },
  habitationName: {
    type: varchar("habitationName", { length: 200 }),
    path: '#txtmoh'
  },
  villageWardName: {
    type: varchar("villageWardName", { length: 200 }),
    path: '#txtward'
  },
  villagePanchayatName: {
    type: varchar("villagePanchayatName", { length: 200 }),
    path: '#txtpanch'
  },
  pinCode: {
    type: varchar("pinCode", { length: 6 }),
    path: '#txtpin'
  },
  clusterResourceCenterName: {
    type: varchar("clusterResourceCenterName", { length: 200 }),
    path: '#txtclust'
  },
  cdBlockName: {
    type: varchar("cdBlockName", { length: 200 }),
    path: '#txtcd'
  },
  educationZoneName: {
    type: varchar("educationZoneName", { length: 200 }),
    path: '#txtedu'
  },
  assemblyConstituency: {
    type: varchar("assemblyConstituency", { length: 200 }),
    path: '#txtconst'
  },
  municipality: {
    type: varchar("municipality", { length: 200 }),
    path: '#txtmuni'
  },
  allWeatherRoadAccess: {
    type: boolean("allWeatherRoadAccess"),
    path: '#txtslctroad'
  },
  isSpecialSchool: {
    type: boolean("isSpecialSchool"),
    path: '#txtslctcwsn'
  },
  isShiftSchool: {
    type: boolean("isShiftSchool"),
    path: '#txtslctshift'
  },
  isResidentialSchool: {
    type: boolean("isResidentialSchool"),
    path: '#txtslctres'
  },
  residentialSchoolType: {
    type: varchar("residentialSchoolType", { length: 100 }),
    path: '#txtslctrestype'
  },
  isReligiousMinoritySchool: {
    type: boolean("isReligiousMinoritySchool"),
    path: '#txtslctrel'
  },
  religiousMinoritySchoolType: {
    type: varchar("religiousMinoritySchoolType", { length: 100 }),
    path: '#txtslctreltype'
  },
  academicInspections: {
    type: int("academicInspections"),
    path: '#txtinsp'
  },
  crcCoordinatorVisits: {
    type: int("crcCoordinatorVisits"),
    path: '#txtcrc'
  },
  blockOfficerVisits: {
    type: int("blockOfficerVisits"),
    path: '#txtblock'
  },
  additionalInformationlastUpdated: {
    type: varchar("additionalInformationlastUpdated", { length: 100 }),
    path: '#lblUdisedate1'
  },

  instructionalDaysLastYear: {
    type: int("instructionalDaysLastYear"),
    path: '#txtins'
  },
  schoolHoursChildren: {
    type: float("schoolHoursChildren"),
    path: '#txthrs'
  },
  schoolHoursTeachers: {
    type: float("schoolHoursTeachers"),
    path: '#txtteach'
  },
  isCCEImplemented: {
    type: boolean("isCCEImplemented"),
    path: '#txtslctcce'
  },
  areRecordsMaintained: {
    type: boolean("areRecordsMaintained"),
    path: '#txtslctpup'
  },
  areRecordsShared: {
    type: boolean("areRecordsShared"),
    path: '#txtslctpar'
  },
  studentsSpecialTrainingCurrent: {
    type: int("studentsSpecialTrainingCurrent"),
    path: '#txtspec'
  },
  studentsEnrolledSpecialTrainingLast: {
    type: int("studentsEnrolledSpecialTrainingLast"),
    path: '#txtspecprev'
  },
  studentsCompletedSpecialTrainingLast: {
    type: int("studentsCompletedSpecialTrainingLast"),
    path: '#txtspeccomp'
  },
  hasSMC: {
    type: boolean("hasSMC"),
    path: '#txtslctsmc'
  },
  languagesTaught: {
    type: varchar("languagesTaught", { length: 100 }),
    path: '#txtlang'
  },
  isAnganwadiNear: {
    type: boolean("isAnganwadiNear"),
    path: '#txtang1'
  },
  SMCMeetingsLastYear: {
    type: int("SMCMeetingsLastYear"),
    path: '#txtsmcmeet'
  },
  doesSMCPreparePlan: {
    type: boolean("doesSMCPreparePlan"),
    path: '#txtslctdev'
  },
  hasSeparateSMCAccount: {
    type: boolean("hasSeparateSMCAccount"),
    path: '#txtslctbank'
  },
  bankName: {
    type: varchar("bankName", { length: 100 }),
    path: '#txtbank'
  },
  accountHolderName: {
    type: varchar("accountHolderName", { length: 100 }),
    path: '#txtholder'
  },
  accountNumber: {
    type: varchar("accountNumber", { length: 50 }),
    path: '#txtsmcbnk'
  },
  IFSCCode: {
    type: varchar("IFSCCode", { length: 20 }),
    path: '#txtifsc'
  },
  textbookReceivedDate: {
    type: varchar("textbookReceivedDate", { length: 100 }),
    path: '#txtslcttxt'
  },
  hasCompleteSetTLE: {
    type: boolean("hasCompleteSetTLE"),
    path: '#txtslcttle'
  },
  hasTLEReceivedEachGrade: {
    type: boolean("hasTLEReceivedEachGrade"),
    path: '#txtslcttlegrd'
  },
  hasPlayMaterialEachGrade: {
    type: boolean("hasPlayMaterialEachGrade"),
    path: '#txtslctplay'
  },
  isMotherTongueUsed: {
    type: boolean("isMotherTongueUsed"),
    path: 'txtmj1'
  },
  lastUpdatedSchoolParticularsElementary: {
    type: varchar("lastUpdatedSchoolParticularsElementary", { length: 100 }),
    path: '#lblUdisedate1_1'
  },
  instructionalDaysLastYearSecondary: {
    type: int("instructionalDaysLastYearSecondary"),
    path: '#txtinshigh'
  },
  schoolHoursChildrenSecondary: {
    type: float("schoolHoursChildrenSecondary"),
    path: '#txthrshigh'
  },
  schoolHoursTeachersSecondary: {
    type: float("schoolHoursTeachersSecondary"),
    path: '#txtteachhigh'
  },
  isCCEImplementedSecondary: {
    type: boolean("isCCEImplementedSecondary"),
    path: '#slctccehigh'
  },
  areSMCAndSMDCSame: {
    type: boolean("areSMCAndSMDCSame"),
    path: '#txtslctsmdc'
  },
  lastUpdatedSchoolParticularsSecondary: {
    type: varchar("lastUpdatedSchoolParticularsSecondary", { length: 100 }),
    path: '#lblUdisedate1_2'
  },

  puccaClassrooms: {
    type: int("puccaClassrooms"),
    path: '#txtpucgood'
  },

  partiallyPuccaClassrooms: {
    type: int("partiallyPuccaClassrooms"),
    path: '#txtparpucgood'
  },
  kuchchaClassrooms: {
    type: int("kuchchaClassrooms"),
    path: '#txtkuchgood'
  },
  tentClassrooms: {
    type: int("tentClassrooms"),
    path: '#txttntgood'
  },
  landForExpansion: {
    type: boolean("landForExpansion"),
    path: '#txtslctact'
  },
  roomForPrincipal: {
    type: boolean("roomForPrincipal"),
    path: '#txtslctprinci'
  },
  roomForVicePrincipal: {
    type: boolean("roomForVicePrincipal"),
    path: '#txtslctvice'
  },
  roomForCoCurricular: {
    type: boolean("roomForCoCurricular"),
    path: '#txtslctcraft'
  },
  staffQuarters: {
    type: boolean("staffQuarters"),
    path: '#txtslctstaff'
  },
  handWashingFacility: {
    type: boolean("handWashingFacility"),
    path: '#txtslctwash'
  },
  electricity: {
    type: boolean("electricity"),
    path: '#txtslctelec'
  },
  publicAddressSystem: {
    type: boolean("publicAddressSystem"),
    path: '#txtslctaudio'
  },
  projector: {
    type: boolean("projector"),
    path: '#txtslctlcd'
  },
  printerCount: {
    type: int("printerCount"),
    path: '#txtprnt'
  },
  printerSpeed: {
    type: varchar("printerSpeed", { length: 30 }),
    path: '#txtslctprntspeed'
  },
  photocopierCount: {
    type: int("photocopierCount"),
    path: '#txtphcopy'
  },
  leaseLine: {
    type: boolean("leaseLine"),
    path: '#txtslctlease'
  },
  leaseLineSpeed: {
    type: int("leaseLineSpeed"),
    path: '#txtlease'
  },
  scanner: {
    type: boolean("scanner"),
    path: '#txtslctscan'
  },
  physicalFacilitiesLastUpdated: {
    type: varchar("physicalFacilitiesLastUpdated", { length: 100 }),
    path: '#lblUdisedate2'
  },

  primaryGeneral: {
    type: int("primaryGeneral"),
    path: '#txtprigen'
  },
  primarySC: {
    type: int("primarySC"),
    path: '#txtprisc'
  },
  primaryST: {
    type: int("primaryST"),
    path: '#txtprist'
  },
  primaryOBC: {
    type: int("primaryOBC"),
    path: '#txtpriobc'
  },
  middleGeneral: {
    type: int("middleGeneral"),
    path: '#txtmidgen'
  },
  middleSC: {
    type: int("middleSC"),
    path: '#txtmidsc'
  },
  middleST: {
    type: int("middleST"),
    path: '#txtmidst'
  },
  middleOBC: {
    type: int("middleOBC"),
    path: '#txtmidobc'
  },
  secondaryGeneral: {
    type: int("secondaryGeneral"),
    path: '#txtsecgen'
  },
  secondarySC: {
    type: int("secondarySC"),
    path: '#txtsecsc'
  },
  secondaryST: {
    type: int("secondaryST"),
    path: '#txtsecst'
  },
  secondaryOBC: {
    type: int("secondaryOBC"),
    path: '#txtsecobc'
  },
  seniorSecondaryGeneral: {
    type: int("seniorSecondaryGeneral"),
    path: '#txtsengen'
  },
  seniorSecondarySC: {
    type: int("seniorSecondarySC"),
    path: '#txtsensec'
  },
  seniorSecondaryST: {
    type: int("seniorSecondaryST"),
    path: '#txtsenst'
  },
  seniorSecondaryOBC: {
    type: int("seniorSecondaryOBC"),
    path: '#txtsenobc'
  },
  primaryMuslim: {
    type: int("primaryMuslim"),
    path: '#txtprimus'
  },
  primaryChristian: {
    type: int("primaryChristian"),
    path: '#txtprichris'
  },
  primarySikh: {
    type: int("primarySikh"),
    path: '#txtprisikh'
  },
  primaryJain: {
    type: int("primaryJain"),
    path: '#txtprijain'
  },
  primaryOther: {
    type: int("primaryOther"),
    path: '#txtothpri'
  },
  middleMuslim: {
    type: int("middleMuslim"),
    path: '#txtmidmus'
  },
  middleChristian: {
    type: int("middleChristian"),
    path: '#txtmidchris'
  },
  middleSikh: {
    type: int("middleSikh"),
    path: '#txtmidsikh'
  },
  middleJain: {
    type: int("middleJain"),
    path: '#txtmidjain'
  },
  middleOther: {
    type: int("middleOther"),
    path: '#txtothmid'
  },
  secondaryMuslim: {
    type: int("secondaryMuslim"),
    path: '#txtsecmus'
  },
  secondaryChristian: {
    type: int("secondaryChristian"),
    path: '#txtsecchris'
  },
  secondarySikh: {
    type: int("secondarySikh"),
    path: '#txtsecsikh'
  },
  secondaryJain: {
    type: int("secondaryJain"),
    path: '#txtsecjain'
  },
  secondaryOther: {
    type: int("secondaryOther"),
    path: '#txtothsec'
  },
  seniorSecondaryMuslim: {
    type: int("seniorSecondaryMuslim"),
    path: '#txtsenmus'
  },
  seniorSecondaryChristian: {
    type: int("seniorSecondaryChristian"),
    path: '#txtsenchris'
  },
  seniorSecondarySikh: {
    type: int("seniorSecondarySikh"),
    path: '#txtsensikh'
  },
  seniorSecondaryJain: {
    type: int("seniorSecondaryJain"),
    path: '#txtsenjain'
  },
  seniorSecondaryOther: {
    type: int("seniorSecondaryOther"),
    path: '#txtothsen'
  },
  
  grade1VisualImpairment: {
    type: int("grade1VisualImpairment"),
    path: 'txtvi1'
  },
  grade1SpeechImpairment: {
    type: int("grade2SpeechImpairment"),
    path: '#txtsi1'
  },
  grade1LocomotiveDisability: {
    type: int("grade1LocomotiveDisability"),
    path: '#txtli1'
  },
  grade1HearingImpairment: {
    type: int("grade1HearingImpairment"),
    path: '#txthi1'
  },
  grade1CerebralPalsy: {
    type: int("grade1CerebralPalsy"),
    path: '#txtcp1'
  },
  grade1LearningDisability: {
    type: int("grade1LearningDisability"),
    path: '#txtld1'
  },
  grade1Autism: {
    type: int("grade1Autism"),
    path: '#txtau1'
  },
  grade1MultipleDisabilities: {
    type: int("grade1MultipleDisabilities"),
    path: '#txtmd1'
  },

  grade2VisualImpairment: {
    type: int("grade2VisualImpairment"),
    path: '#txtvi2'
  },
  grade2SpeechImpairment: {
    type: int("grade2SpeechImpairment"),
    path: '#txtsi2'
  },
  grade2LocomotiveDisability: {
    type: int("grade2LocomotiveDisability"),
    path: '#txtli2'
  },
  grade2HearingImpairment: {
    type: int("grade2HearingImpairment"),
    path: '#txthi2'
  },
  grade2CerebralPalsy: {
    type: int("grade2CerebralPalsy"),
    path: '#txtcp2'
  },
  grade2LearningDisability: {
    type: int("grade2LearningDisability"),
    path: '#txtld2'
  },
  grade2Autism: {
    type: int("grade2Autism"),
    path:  '#txtau2'
  },
  grade2MultipleDisabilities: {
    type: int("grade2MultipleDisabilities"),
    path:  '#txtmd2'
  },

  grade3VisualImpairment: {
    type: int("grade3VisualImpairment"),
    path: '#txtvi3'
  },
  grade3SpeechImpairment: {
    type: int("grade3SpeechImpairment"),
    path: '#txtsi3'
  },
  grade3LocomotiveDisability: {
    type: int("grade3LocomotiveDisability"),
    path: '#txtli3'
  },
  grade3HearingImpairment: {
    type: int("grade3HearingImpairment"),
    path: '#txthi3'
  },
  grade3CerebralPalsy: {
    type: int("grade3CerebralPalsy"),
    path: '#txtcp3'
  },
  grade3LearningDisability: {
    type: int("grade3LearningDisability"),
    path: '#txtld3'
  },
  grade3Autism: {
    type: int("grade3Autism"),
    path: '#txtau3'
  },
  grade3MultipleDisabilities: {
    type: int("grade3MultipleDisabilities"),
    path: '#txtmd3'
  },

  grade4VisualImpairment: {
    type: int("grade4VisualImpairment"),
    path: '#txtvi4'
  },
  grade4SpeechImpairment: {
    type: int("grade4SpeechImpairment"),
    path: '#txtsi4'
  },
  grade4LocomotiveDisability: {
    type: int("grade4LocomotiveDisability"),
    path: '#txtli4'
  },
  grade4HearingImpairment: {
    type: int("grade4HearingImpairment"),
    path: '#txthi4'
  },
  grade4CerebralPalsy: {
    type: int("grade4CerebralPalsy"),
    path: '#txtcp4'
  },
  grade4LearningDisability: {
    type: int("grade4LearningDisability"),
    path: '#txtld4'
  },
  grade4Autism: {
    type: int("grade4Autism"),
    path: '#txtau4'
  },
  grade4MultipleDisabilities: {
    type: int("grade4MultipleDisabilities"),
    path: '#txtmd4'
  },

  grade5VisualImpairment: {
    type: int("grade5VisualImpairment"),
    path: '#txtvi5'
  },
  grade5SpeechImpairment: {
    type: int("grade5SpeechImpairment"),
    path: '#txtsi5'
  },
  grade5LocomotiveDisability: {
    type: int("grade5LocomotiveDisability"),
    path: '#txtli5'
  },
  grade5HearingImpairment: {
    type: int("grade5HearingImpairment"),
    path: '#txthi5'
  },
  grade5CerebralPalsy: {
    type: int("grade5CerebralPalsy"),
    path: '#txtcp5'
  },
  grade5LearningDisability: {
    type: int("grade5LearningDisability"),
    path: '#txtld5'
  },
  grade5Autism: {
    type: int("grade5Autism"),
    path: '#txtau5'
  },
  grade5MultipleDisabilities: {
    type: int("grade5MultipleDisabilities"),
    path: '#txtmd5'
  },

  grade6VisualImpairment: {
    type: int("grade6VisualImpairment"),
    path: '#txtvi6'
  },
  grade6SpeechImpairment: {
    type: int("grade6SpeechImpairment"),
    path: '#txtsi6'
  },
  grade6LocomotiveDisability: {
    type: int("grade6LocomotiveDisability"),
    path: '#txtli6'
  },
  grade6HearingImpairment: {
    type: int("grade6HearingImpairment"),
    path: '#txthi6'
  },
  grade6CerebralPalsy: {
    type: int("grade6CerebralPalsy"),
    path: '#txtcp6'
  },
  grade6LearningDisability: {
    type: int("grade6LearningDisability"),
    path: '#txtld6'
  },
  grade6Autism: {
    type: int("grade6Autism"),
    path: '#txtau6'
  },
  grade6MultipleDisabilities: {
    type: int("grade6MultipleDisabilities"),
    path: '#txtmd6'
  },

  grade7VisualImpairment: {
    type: int("grade7VisualImpairment"),
    path: '#txtvi7'
  },
  grade7SpeechImpairment: {
    type: int("grade7SpeechImpairment"),
    path: '#txtsi7'
  },
  grade7LocomotiveDisability: {
    type: int("grade7LocomotiveDisability"),
    path: '#txtli7'
  },
  grade7HearingImpairment: {
    type: int("grade7HearingImpairment"),
    path: '#txthi7'
  },
  grade7CerebralPalsy: {
    type: int("grade7CerebralPalsy"),
    path: '#txtcp7'
  },
  grade7LearningDisability: {
    type: int("grade7LearningDisability"),
    path: '#txtld7'
  },
  grade7Autism: {
    type: int("grade7Autism"),
    path: '#txtau7'
  },
  grade7MultipleDisabilities: {
    type: int("grade7MultipleDisabilities"),
    path: '#txtmd7'
  },

  grade8VisualImpairment: {
    type: int("grade8VisualImpairment"),
    path: '#txtvi8'
  },
  grade8SpeechImpairment: {
    type: int("grade8SpeechImpairment"),
    path: '#txtsi8'
  },
  grade8LocomotiveDisability: {
    type: int("grade8LocomotiveDisability"),
    path: '#txtli8'
  },
  grade8HearingImpairment: {
    type: int("grade8HearingImpairment"),
    path: '#txthi8'
  },
  grade8CerebralPalsy: {
    type: int("grade8CerebralPalsy"),
    path: '#txtcp8'
  },
  grade8LearningDisability: {
    type: int("grade8LearningDisability"),
    path: '#txtld8'
  },
  grade8Autism: {
    type: int("grade8Autism"),
    path: '#txtau8'
  },
  grade8MultipleDisabilities: {
    type: int("grade8MultipleDisabilities"),
    path: '#txtmd8'
  },

  grade9VisualImpairment: {
    type: int("grade9VisualImpairment"),
    path: '#txtvi9'
  },
  grade9SpeechImpairment: {
    type: int("grade9SpeechImpairment"),
    path: '#txtsi9'
  },
  grade9LocomotiveDisability: {
    type: int("grade9LocomotiveDisability"),
    path: '#txtli9'
  },
  grade9HearingImpairment: {
    type: int("grade9HearingImpairment"),
    path: '#txthi9'
  },
  grade9CerebralPalsy: {
    type: int("grade9CerebralPalsy"),
    path: '#txtcp9'
  },
  grade9LearningDisability: {
    type: int("grade9LearningDisability"),
    path: '#txtld9'
  },
  grade9Autism: {
    type: int("grade9Autism"),
    path: '#txtau9'
  },
  grade9MultipleDisabilities: {
    type: int("grade9MultipleDisabilities"),
    path: '#txtmd9'
  },

  grade11VisualImpairment: {
    type: int("grade11VisualImpairment"),
    path: '#txtvi11'
  },
  grade11SpeechImpairment: {
    type: int("grade11SpeechImpairment"),
    path: '#txtsi11'
  },
  grade11LocomotiveDisability: {
    type: int("grade11LocomotiveDisability"),
    path: '#txtli11'
  },
  grade11HearingImpairment: {
    type: int("grade11HearingImpairment"),
    path: '#txthi11'
  },
  grade11CerebralPalsy: {
    type: int("grade11CerebralPalsy"),
    path: '#txtcp11'
  },
  grade11LearningDisability: {
    type: int("grade11LearningDisability"),
    path: '#txtld11'
  },
  grade11Autism: {
    type: int("grade11Autism"),
    path: '#txtau11'
  },
  grade11MultipleDisabilities: {
    type: int("grade11MultipleDisabilities"),
    path: '#txtmd11'
  },

  grade12VisualImpairment: {
    type: int("grade12VisualImpairment"),
    path: '#txtvi12'
  },
  grade12SpeechImpairment: {
    type: int("grade12SpeechImpairment"),
    path: '#txtsi12'
  },
  grade12LocomotiveDisability: {
    type: int("grade12LocomotiveDisability"),
    path: '#txtli12'
  },
  grade12HearingImpairment: {
    type: int("grade12HearingImpairment"),
    path: '#txthi12'
  },
  grade12CerebralPalsy: {
    type: int("grade12CerebralPalsy"),
    path: '#txtcp12'
  },
  grade12LearningDisability: {
    type: int("grade12LearningDisability"),
    path: '#txtld12'
  },
  grade12Autism: {
    type: int("grade12Autism"),
    path: '#txtau12'
  },
  grade12MultipleDisabilities: {
    type: int("grade12MultipleDisabilities"),
    path: '#txtmd12'
  },

  enrollmentLastUpdated: {
    type: varchar("enrollmentLastUpdated", { length: 100 }),
    path: '#lblUdisedate2_1'
  },

  kitchenShedStatus: {
    type: varchar("kitchenShedStatus", { length: 20 }),
    path: '#txtslctmdmkit'
  },
  mealSource: {
    type: varchar("mealSource", { length: 50 }),
    path: 'txtslctmdmsrc'
  },
  mealLastUpdated: {
    type: varchar("mealLastUpdated", { length: 100 }),
    path: '#lblUdisedate3'
  },

  aerobics: {
    type: boolean("aerobics"),
    elem: 'checkbox',
    path: '#chcksport_0'
  },
  archery: {
    type: boolean("archery"),
    elem: 'checkbox',
    path: '#chcksport_1'
  },
  athletics: {
    type: boolean("athletics"),
    elem: 'checkbox',
    path: '#chcksport_2'
  },
  badminton: {
    type: boolean("badminton"),
    elem: 'checkbox',
    path: '#chcksport_2'
  },
  basketball: {
    type: boolean("basketball"),
    elem: 'checkbox',
    path: '#chcksport_4'
  },
  boxing: {
    type: boolean("boxing"),
    elem: 'checkbox',
    path: '#chcksport_5'
  },
  chess: {
    type: boolean("chess"),
    elem: 'checkbox',
    path: '#chcksport_6'
  },
  cricket: {
    type: boolean("cricket"),
    elem: 'checkbox',
    path: '#chcksport_7'
  },
  football: {
    type: boolean("football"),
    elem: 'checkbox',
    path: '#chcksport_8'
  },
  gymnastics: {
    type: boolean("gymnastics"),
    elem: 'checkbox',
    path: '#chcksport_9'
  },
  handball: {
    type: boolean("handball"),
    elem: 'checkbox',
    path: '#chcksport_10'
  },
  hockey: {
    type: boolean("hockey"),
    elem: 'checkbox',
    path: '#chcksport_11'
  },
  judo: {
    type: boolean("judo"),
    elem: 'checkbox',
    path: '#chcksport_12'
  },
  kabaddi: {
    type: boolean("kabaddi"),
    elem: 'checkbox',
    path: '#chcksport_13'
  },
  khoKho: {
    type: boolean("khoKho"),
    elem: 'checkbox',
    path: '#chcksport_14'
  },
  shooting: {
    type: boolean("shooting"),
    elem: 'checkbox',
    path: '#chcksport_15'
  },
  swimming: {
    type: boolean("swimming"),
    elem: 'checkbox',
    path: '#chcksport_16'
  },
  taekwondo: {
    type: boolean("taekwondo"),
    elem: 'checkbox',
    path: '#chcksport_17'
  },
  tableTennis: {
    type: boolean("tableTennis"),
    elem: 'checkbox',
    path: '#chcksport_18'
  },
  tennis: {
    type: boolean("tennis"),
    elem: 'checkbox',
    path: '#chcksport_19'
  },
  volleyball: {
    type: boolean("volleyball"),
    elem: 'checkbox',
    path: '#chcksport_20'
  },
  yoga: {
    type: boolean("yoga"),
    elem: 'checkbox',
    path: '#chcksport_21'
  },
  sportsLastUpdated: {
    type: varchar("sportsLastUpdated", { length: 100 }),
    path: '#lblUdisedate3_1'
  },
})

export default paths