// @ts-nocheck
import bangloreSchools from './schools'
import fs from 'fs'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { queryBuilder as qb } from "drizzle-orm/planetscale-serverless";
import { eq } from "drizzle-orm";
import * as cheerio from 'cheerio';
import fetch from 'node-fetch'
import { NextResponse, } from 'next/server'
import scrapePath from './scrapePath'
import schoolsAlreadyInDb from './schoolsAlreadyInDb'
import affiliationIds from './affiliationIds'
import { db, schools } from './migrate'


import userAgents from './userAgents'


// const proxyAgent = new HttpsProxyAgent('localhost:8089');


const schemaRow = [
'name',
'lat',
'long',
'code',
'address',
'affiliationCode',
'principalName',
'principalContact',
'principalEmail',
'principalRetirementDate',
'contactNumber',
'email',
'website',
'faxNumber',
'landmark',
'establishmentYear',
'affiliationValidity',
'affiliationStatus',
'trustSocietyCompany',
'registrationDate',
'societyRegistrationNumber',
'registrationValidity',
'nocAuthority',
'nocDate',
'affiliationGrantYear',
'basicDetailsLastUpdated',

'totalTeachers',
'numberOfPGTs',
'numberOfTGTs',
'numberOfPRTs',
'numberOfPETs',
'nonTeachingStaff',
'trainedTeachers',
'facultyTrainings',
'facultDetailslastUpdated',


'grade1TotalSections',
'grade1TotalIntake',
'grade1TotalStudents',

'grade2TotalSections',
'grade2TotalIntake',
'grade2TotalStudents',

'grade3TotalSections',
'grade3TotalIntake',
'grade3TotalStudents',

'grade4TotalSections',
'grade4TotalIntake',
'grade4TotalStudents',

'grade5TotalSections',
'grade5TotalIntake',
'grade5TotalStudents',

'grade6TotalSections',
'grade6TotalIntake',
'grade6TotalStudents',

'grade7TotalSections',
'grade7TotalIntake',
'grade7TotalStudents',

'grade8TotalSections',
'grade8TotalIntake',
'grade8TotalStudents',

'grade9TotalSections',
'grade9TotalIntake',
'grade9TotalStudents',

'grade10TotalSections',
'grade10TotalIntake',
'grade10TotalStudents',

'grade11TotalSections',
'grade11TotalIntake',
'grade11TotalStudents',

'grade12TotalSections',
'grade12TotalIntake',
'grade12TotalStudents',

'gradeDetailsLastUpdated',

'subjectsOfferedForClass10',
'subjectsOfferedForClass12',
'subjectsOfferedlastUpdated',

'totalSites',
'guardsEmployed',
'schoolArea',
'totalPlaygrounds',
'playgroundArea',
'totalRooms',
'smallRooms',
'mediumRooms',
'largeRooms',
'maleRestRooms',
'totalToilets',
'femaleRestRooms',
'boysToilets',
'differentlyAbledToilets',
'femaleStaffWashrooms',
'maleStaffWashrooms',
'totalLibraries',
'totalLaboratories',
'studentCanteens',
'waterPurifiers',
'staffCanteens',
'auditoriums',
'liftsElevators',
'digitalClassrooms',
'hostelFacility',
'buildingBlocks',
'fireExtinguishers',
'sprinklers',
'cctvCameras',
'computersInLab',
'examinationCenter',
'webServers',
'boundaryWall',
'clinicFacility',
'barrierFreeRamps',
'strongRoom',
'gymnasium',
'wifiEnabled',
'indoorGames',
'fireAlarms',
'sportsFacility',
'webBasedLearning',
'swimmingPool',
'danceMusicFacility',
'busesOwned',
'busesHired',
'vansMatadors',
'femaleBusAttendants',
'totalDrivers',
'activityRooms',
'transportCoordinator',
'transportCoordinatorContact',
'rampsForDifferentlyAbled',
'outdoorSportsFacility',
'infraLastUpdated',

'nearestBank',
'distanceToBank',
'nearestBusStation',
'distanceToBusStation',
'nearestRailwayStation',
'distanceToRailwayStation',
'nearestAirport',
'distanceToAirport',
'nearestHospital',
'distanceToHospital',
'nearestPoliceStation',
'distanceToPoliceStation',
'nearestMetroStation',
'distanceToMetroStation',
'locationDetailsLastUpdated',

'rainWaterHarvesting',
'roofWaterHarvesting',
'waterRecycling',
'waterFacilitiesMaintenance',
'wasteSegregation',
'organicWasteRecycling',
'paperWasteRecycling',
'paperReductionEfforts',
'solidWasteDisposal',
'electronicWasteDisposal',
'energyEfficientEquipment',
'plantation',
'dripIrrigation',
'solarEnergyUse',
'roPlantWaterRecycling',
'environmentalAwarenessPromotion',
'waterAuditEducation',
'studentWaterAuditing',
'environmentalLiteracy',
'treesPlanted',
'environmentProtectionLastUpdated',

'tenthPassPercentage',
'twelfthPassPercentage',
'wellnessTeacher',
'grievanceOfficer',
'grievanceOfficerContact',
'grievanceOfficerEmail',
'harassmentCommitteeHead',
'harassmentCommitteeContact',
'harassmentCommitteeEmail',
'emergencyContactPerson',
'emergencyContactNumber',
'emergencyContactEmail',
'numberOfDoctors',
'numberOfNurses',
'numberOfBeds',
'parentTeacherAssociation',
'teachersGrade',
'staffSalaryTiming',
'epfFacility',
'epfRegistrationNumber',
'salaryPaymentMode',
'bankWithSalaryAccount',
'accountsAudit',
'cbseInvolvementLevel',
'academicSession',
'vacationPeriod',
'bestPractices',
'eLearningDevelopment',
'vitalInformationLastUpdated',

'admissionFeeSeniorSecondary',
'admissionFeeSecondary',
'admissionFeeMiddle',
'admissionFeePrimary',
'tuitionFeeSeniorSecondary',
'feesCalculated',
'category',
'tuitionFeeSecondary',
'tuitionFeeMiddle',
'tuitionFeePrimary',
'yearlyDevChargesSeniorSecondary',
'yearlyDevChargesSecondary',
'yearlyDevChargesMiddle',
'yearlyDevChargesPrimary',
'otherChargesSeniorSecondary',
'otherChargesSecondary',
'otherChargesMiddle',
'otherChargesPrimary',
'feeStructureLastUpdated',

'udiseCode',
'location',
'habitationName',
'villageWardName',
'villagePanchayatName',
'pinCode',
'clusterResourceCenterName',
'cdBlockName',
'educationZoneName',
'assemblyConstituency',
'municipality',
'allWeatherRoadAccess',
'isSpecialSchool',
'isShiftSchool',
'isResidentialSchool',
'residentialSchoolType',
'isReligiousMinoritySchool',
'religiousMinoritySchoolType',
'academicInspections',
'crcCoordinatorVisits',
'blockOfficerVisits',
'lastUpdated',

'instructionalDaysLastYear',
'schoolHoursChildren',
'schoolHoursTeachers',
'isCCEImplemented',
'areRecordsMaintained',
'areRecordsShared',
'studentsSpecialTrainingCurrent',
'studentsEnrolledSpecialTrainingLast',
'studentsCompletedSpecialTrainingLast',
'hasSMC',
'languagesTaught',
'isAnganwadiNear',
'SMCMeetingsLastYear',
'doesSMCPreparePlan',
'hasSeparateSMCAccount',
'bankName',
'accountHolderName',
'accountNumber',
'IFSCCode',
'textbookReceivedDate',
'hasCompleteSetTLE',
'hasTLEReceivedEachGrade',
'hasPlayMaterialEachGrade',
'isMotherTongueUsed',
'lastUpdatedSchoolParticularsElementary',
'instructionalDaysLastYearSecondary',
'schoolHoursChildrenSecondary',
'schoolHoursTeachersSecondary',
'isCCEImplementedSecondary',
'areSMCAndSMDCSame',
'lastUpdatedSchoolParticularsSecondary',

'puccaClassrooms',
'partiallyPuccaClassrooms',
'kuchchaClassrooms',
'tentClassrooms',
'landForExpansion',
'roomForPrincipal',
'roomForVicePrincipal',
'roomForCoCurricular',
'staffQuarters',
'handWashingFacility',
'electricity',
'publicAddressSystem',
'projector',
'printerCount',
'printerSpeed',
'photocopierCount',
'leaseLine',
'leaseLineSpeed',
'scanner',
'physicalFacilitiesLastUpdated',

'primaryGeneral',
'primarySC',
'primaryST',
'primaryOBC',
'middleGeneral',
'middleSC',
'middleST',
'middleOBC',
'secondaryGeneral',
'secondarySC',
'secondaryST',
'secondaryOBC',
'seniorSecondaryGeneral',
'seniorSecondarySC',
'seniorSecondaryST',
'seniorSecondaryOBC',
'primaryMuslim',
'primaryChristian',
'primarySikh',
'primaryJain',
'primaryOther',
'middleMuslim',
'middleChristian',
'middleSikh',
'middleJain',
'middleOther',
'secondaryMuslim',
'secondaryChristian',
'secondarySikh',
'secondaryJain',
'secondaryOther',
'seniorSecondaryMuslim',
'seniorSecondaryChristian',
'seniorSecondarySikh',
'seniorSecondaryJain',
'seniorSecondaryOther',
'primaryVisualImpairment',
'primarySpeechImpairment',
'primaryLocomotiveDisability',
'primaryHearingImpairment',
'primaryCerebralPalsy',
'primaryLearningDisability',
'primaryAutism',
'primaryMultipleDisabilities',
'middleVisualImpairment',
'middleSpeechImpairment',
'middleLocomotiveDisability',
'middleHearingImpairment',
'middleCerebralPalsy',
'middleLearningDisability',
'middleAutism',
'middleMultipleDisabilities',
'secondaryVisualImpairment',
'secondarySpeechImpairment',
'secondaryLocomotiveDisability',
'secondaryHearingImpairment',
'secondaryCerebralPalsy',
'secondaryLearningDisability',
'secondaryAutism',
'secondaryMultipleDisabilities',
'seniorSecondaryVisualImpairment',
'seniorSecondarySpeechImpairment',
'seniorSecondaryLocomotiveDisability',
'seniorSecondaryHearingImpairment',
'seniorSecondaryCerebralPalsy',
'seniorSecondaryLearningDisability',
'seniorSecondaryAutism',
'seniorSecondaryMultipleDisabilities',
'enrollmentLastUpdated',

'kitchenShedStatus',
'mealSource',
'mealLastUpdated',

'aerobics',
'archery',
'athletics',
'badminton',
'basketball',
'boxing',
'chess',
'cricket',
'football',
'gymnastics',
'handball',
'hockey',
'judo',
'kabaddi',
'khoKho',
'shooting',
'swimming',
'taekwondo',
'tableTennis',
'tennis',
'volleyball',
'yoga',
'sportsLastUpdated',
]

const sheetHeaders = [
  'basicDetails/SCHOOL NAME',
  'Lat',
  'Long',
  'basicDetails/SCHOOL CODE',
  'basicDetails/ADDRESS',
  'basicDetails/AFFILIATION CODE',
  'basicDetails/PRINCIPAL',
  'basicDetails/PRINCIPAL\'S CONTACT NUMBER',
  'basicDetails/PRINCIPAL\'S EMAIL ID',
  'basicDetails/PRINCIPAL\'S RETIREMENT DATE',
  'basicDetails/SCHOOL\'S CONTACT NUMBER',
  'basicDetails/SCHOOL\'S EMAIL ID',
  'basicDetails/SCHOOL\'S WEBSITE',
  'basicDetails/SCHOOL\'S FAX NUMBER',
  'basicDetails/LANDMARK NEAR SCHOOL',
  'basicDetails/YEAR OF ESTABLISHMENT',
  'basicDetails/AFFILIATION VALIDITY',
  'basicDetails/AFFILIATION STATUS',
  'basicDetails/NAME OF THE TRUST/SOCIETY/COMPANY REGISTERED WITH',
  'basicDetails/REGISTRATION DATE',
  'basicDetails/SOCIETY REGISTRATION NUMBER',
  'basicDetails/REGISTRATION VALIDITY',
  'basicDetails/NOC ISSUING AUTHORITY',
  'basicDetails/NOC ISSUING DATE',
  'basicDetails/AFFILIATION GRANT YEAR',
  'basicDetails/lastUpdated',
  'facultyDetails/TOTAL NUMBER OF TEACHERS (ALL CLASSES)',
  'facultyDetails/NUMBER OF PGTs',
  'facultyDetails/NUMBER OF TGTs',
  'facultyDetails/NUMBER OF PRTs',
  'facultyDetails/NUMBER OF PETs',
  'facultyDetails/OTHER NON-TEACHING STAFF',
  'facultyDetails/NUMBER OF MANDATORY TRAINING QUALIFIED TEACHERS',
  'facultyDetails/NUMBER OF TRAININGS ATTENDED BY FACULTY SINCE LAST YEAR',
  'facultyDetails/lastUpdated',

  '1/totalNumberOfSections',
  '1/totalNumberOfIntake',
  '1/totalNumberOfStudents',
  '2/totalNumberOfSections',
  '2/totalNumberOfIntake',
  '2/totalNumberOfStudents',
  '3/totalNumberOfSections',
  '3/totalNumberOfIntake',
  '3/totalNumberOfStudents',
  '4/totalNumberOfSections',
  '4/totalNumberOfIntake',
  '4/totalNumberOfStudents',
  '5/totalNumberOfSections',
  '5/totalNumberOfIntake',
  '5/totalNumberOfStudents',
  '6/totalNumberOfSections',
  '6/totalNumberOfIntake',
  '6/totalNumberOfStudents',
  '7/totalNumberOfSections',
  '7/totalNumberOfIntake',
  '7/totalNumberOfStudents',
  '8/totalNumberOfSections',
  '8/totalNumberOfIntake',
  '8/totalNumberOfStudents',
  '9/totalNumberOfSections',
  '9/totalNumberOfIntake',
  '9/totalNumberOfStudents',
  '10/totalNumberOfSections',
  '10/totalNumberOfIntake',
  '10/totalNumberOfStudents',
  '11/totalNumberOfSections',
  '11/totalNumberOfIntake',
  '11/totalNumberOfStudents',
  '12/totalNumberOfSections',
  '12/totalNumberOfIntake',
  '12/totalNumberOfStudents',
  'lastUpdated',

  'academicsDetails/subjectsOfferedForClass10',
  'academicsDetails/subjectsOfferedForClass12',
  'academicsDetails/lastUpdated',
  'infraDetails/TOTAL NUMBER OF SITES OF SCHOOL',
  'infraDetails/DOES THE SCHOOL HAS GUARDS EMPLOYED FOR SAFETY',
  'infraDetails/TOTAL AREA OF SCHOOL IN SQUARE METRES',
  'infraDetails/TOTAL NUMBER OF PLAYGROUNDS',
  'infraDetails/TOTAL AREA OF PLAYGROUND IN SQUARE METRES',
  'infraDetails/TOTAL NUMBER OF ROOMS',
  'infraDetails/TOTAL NUMBER OF SMALL-SIZED ROOMS',
  'infraDetails/TOTAL NUMBER OF MEDIUM-SIZED ROOMS',
  'infraDetails/TOTAL NUMBER OF LARGE-SIZED ROOMS',
  'infraDetails/TOTAL NUMBER OF MALE REST ROOM',
  'infraDetails/TOTAL  NUMBER OF TOILETS',
  'infraDetails/TOTAL NUMBER OF FEMALE REST ROOM',
  'infraDetails/NUMBER OF BOYS\' TOILET',
  'infraDetails/NUMBER OF TOILETS FOR DIFFERENTLY ABLED PERSONS',
  'infraDetails/NUMBER OF WASHROOMS FOR FEMALE STAFF',
  'infraDetails/NUMBER OF WASHROOMS FOR MALE STAFF',
  'infraDetails/TOTAL NUMBER OF LIBRARIES',
  'infraDetails/NUMBER OF LABORATORIES',
  'infraDetails/TOTAL NUMBER OF STUDENT CANTEENS',
  'infraDetails/NUMBER OF WATER PURIFIERS/ROs',
  'infraDetails/TOTAL NUMBER OF STAFF CANTEENS',
  'infraDetails/NUMBER OF AUDITORIUMS',
  'infraDetails/NUMBER OF LIFTS/ELEVATORS',
  'infraDetails/NUMBER OF DIGITAL CLASSROOMS',
  'infraDetails/DOES THE SCHOOL HAS HOSTEL FACILITY',
  'infraDetails/TOTAL NUMBER OF BUILDING BLOCKS',
  'infraDetails/DOES THE SCHOOL HAS FIRE EXTINGUISHERS',
  'infraDetails/DOES THE SCHOOL HAS SPRINKLERS',
  'infraDetails/DOES THE SCHOOL HAS CCTV CAMERAS INSTALLED?',
  'infraDetails/TOTAL NUMBER OF COMPUTERS IN ALL COMPUTER LAB',
  'infraDetails/IS THE SCHOOL EXAMINATION CENTER OF CBSE?',
  'infraDetails/DOES THE SCHOOL HAS WEB SERVERS',
  'infraDetails/DOES THE SCHOOL HAS A BOUNDARY WALL?',
  'infraDetails/DOES THE SCHOOL HAS CLINIC FACILITY?',
  'infraDetails/IS YOUR SCHOOL BARRIER FREE/ HAS RAMPS?',
  'infraDetails/DOES THE SCHOOL HAS A STRONG ROOM?',
  'infraDetails/DOES THE SCHOOL HAS A GYMNASIUM?',
  'infraDetails/IS YOUR SCHOOL WI-FI ENABLED?',
  'infraDetails/DOES THE SCHOOL HAS INDOOR GAMES FACILITY?',
  'infraDetails/DOES THE SCHOOL HAS FIRE ALARMS?',
  'infraDetails/DOES THE SCHOOL HAS SPORTS FACILITY?',
  'infraDetails/PROVISION OF WEB BASED LEARNING PROGRAMS?',
  'infraDetails/DOES THE SCHOOL HAS A SWIMMING POOL?',
  'infraDetails/DOES THE SCHOOL HAS DANCE/MUSIC FACILITY?',
  'infraDetails/TOTAL NUMBER OF BUSES OWNED',
  'infraDetails/TOTAL NUMBER OF BUSES HIRED',
  'infraDetails/TOTAL NUMBER OF VANS/MATADORS',
  'infraDetails/NUMBER OF FEMALE ATTENDANTS FOR BUS DUTY',
  'infraDetails/TOTAL NUMBER OF DRIVERS',
  'infraDetails/NUMBER OF ACTIVITY ROOMS',
  'infraDetails/NAME OF TRANSPORT COORDINATOR',
  'infraDetails/TRANSPORT COORDINATOR CONTACT',
  'infraDetails/DOES THE SCHOOL HAVE RAMPS FOR THE DIFFRENTLY-ABLED',
  'infraDetails/DOES THE SCHOOL HAVE OUTDOOR SPORTS FACILITY',
  'infraDetails/lastUpdated',
  'locationDetails/NEAREST NATIONALISED BANK',
  'locationDetails/DISTANCE OF BANK FROM SCHOOL IN KM',
  'locationDetails/NEAREST BUS STATION',
  'locationDetails/DISTANCE OF BUS TERMINAL FROM SCHOOL IN KM',
  'locationDetails/NEAREST RAILWAY STATION',
  'locationDetails/DISTANCE OF RAILWAY STATION FROM SCHOOL IN KM',
  'locationDetails/NEAREST AIRPORT',
  'locationDetails/DISTANCE OF AIRPORT FROM SCHOOL IN KM',
  'locationDetails/NEAREST HOSPITAL',
  'locationDetails/DISTANCE OF HOSPITAL FROM SCHOOL IN KM',
  'locationDetails/NEAREST POLICE STATION',
  'locationDetails/DISTANCE OF POLICE STATION FROM SCHOOL IN KM',
  'locationDetails/NEAREST METRO STATION',
  'locationDetails/DISTANCE OF METRO FROM SCHOOL IN KM',
  'locationDetails/lastUpdated',
  'contributionTowardsEnvironmentProtection/WHETHER RAIN WATER HARVESTING HAS BEEN DONE IN THE CAMPUS?',
  'contributionTowardsEnvironmentProtection/WHETHER ROOF WATER HARVESTING IS BEING UNDERTAKEN BY THE SCHOOL?',
  'contributionTowardsEnvironmentProtection/WHETHER HARVASTED WATER IS RECYCLED FOR GARDENING, ETC?',
  'contributionTowardsEnvironmentProtection/WHETHER SCHOOL ENSURES MAINTENANCE OF ALL WATER FAUCETS/PIPES ETC TO PREVENT ANY LEAKAGES?',
  'contributionTowardsEnvironmentProtection/WHETHER SEGREGATION OF WASTE IS DONE AT SOURCE?',
  'contributionTowardsEnvironmentProtection/WHETHER ORGANIC WASTE IS BEING RECYCLED?',
  'contributionTowardsEnvironmentProtection/WHETHER WASTE PAPER IS RECYCLED?',
  'contributionTowardsEnvironmentProtection/WHETHER SCHOOL IS MAKING EFFORTS TO REDUCE USE OF PAPER BY ADOPTING IT SOLUTIONS?',
  'contributionTowardsEnvironmentProtection/WHETHER THERE IS PROPER DISPOSAL OF SOLID WASTE?',
  'contributionTowardsEnvironmentProtection/WHETHER THERE IS A SYSTEM FOR DISPOSAL OF ELECTRONIC WASTE?',
  'contributionTowardsEnvironmentProtection/WHETHER SCHOOL IS USING ENERGY SAVING AND ENERGY EFFICIENT ELECTRICAL EQUIPMENT?',
  'contributionTowardsEnvironmentProtection/WHETHER PLANTATION/GARDENING HAS BEEN DONE IN AND AROUND CAMPUS?',
  'contributionTowardsEnvironmentProtection/WHETHER DRIP IRRIGATION IS THE ONLY MEANS OF WATERING THE GARDEN?',
  'contributionTowardsEnvironmentProtection/WHETHER SCHOOL IS USING SOLAR ENERGY?',
  'contributionTowardsEnvironmentProtection/WHETHER WASTE WATER FROM RO PLANT FOR DRINKING WATER IS BEING HARVESTED/RECYCLED?',
  'contributionTowardsEnvironmentProtection/WHETHER SCHOOL IS PROMOTING AWARENESS AMONGST CHILDREN AND PARENTS ON ENVIRONMENTAL CONSERVATION AND CLEANLINESS?',
  'contributionTowardsEnvironmentProtection/WHETHER CHILDREN ARE BEING TAUGHT HOW TO AUDIT THE USE OF WATER AND WHETHER THEY ARE BEING ENCOURAGED TO TAKE IT UP AT HOME?',
  'contributionTowardsEnvironmentProtection/WHETHER CHILDREN ARE TAKING UP WATER AUDITING AT SCHOOL?',
  'contributionTowardsEnvironmentProtection/WHETHER ENVIRONMENTAL LITERACY IS PROMOTED THROUGH INTEGRATION IN ACADEMICS?',
  'contributionTowardsEnvironmentProtection/NO. OF TREES PLANTED BY STUDENTS IN SCHOOL AT HOME/IN NEIGHBOURHOOD IN THE CURRENT ACADEMIC YEAR?',
  'contributionTowardsEnvironmentProtection/lastUpdated',
  'otherVitalInformation/10th BOARD PASS PERCENTAGE (2014/2015/2016)',
  'otherVitalInformation/12th BOARD PASS PERCENTAGE (2014/2015/2016)',
  'otherVitalInformation/NAME OF WELLNESS/ACTIVITY TEACHER',
  'otherVitalInformation/NAME OF GRIEVANCE/COMPLAINT REDRESSAL OFFICER',
  'otherVitalInformation/CONTACT NUMBER OF GRIEVANCE/COMPLAINT REDRESSAL OFFICER',
  'otherVitalInformation/EMAIL ID OF GRIEVANCE/COMPLAINT REDRESSAL OFFICER',
  'otherVitalInformation/NAME OF HEAD OF SEXUAL HARASSMENT COMMITTEE',
  'otherVitalInformation/CONTACT NUMBER OF HEAD OF SEXUAL HARASSMENT COMMITTEE',
  'otherVitalInformation/EMAIL ID OF HEAD OF SEXUAL HARASSMENT COMMITTEE',
  'otherVitalInformation/NAME OF CONTACT PERSON IN CASE OF EMERGENCY',
  'otherVitalInformation/CONTACT NUMBER OF CONTACT PERSON IN CASE OF EMERGENCY',
  'otherVitalInformation/EMAIL ID OF CONTACT PERSON IN CASE OF EMERGENCY',
  'otherVitalInformation/TOTAL NUMBER OF DOCTORS IN SCHOOL CLINIC',
  'otherVitalInformation/TOTAL NUMBER OF NURSES IN SCHOOL CLINIC',
  'otherVitalInformation/TOTAL NUMBER OF BEDS IN SCHOOL CLINIC',
  'otherVitalInformation/PARENT TEACHERS ASSOCIATION AS PER NORMS',
  'otherVitalInformation/DO THE TEACHERS GET PROPER GRADE LIKE PGT/TGT AS PER THE CLASSES THEY ARE ENTITLED TO TEACH?',
  'otherVitalInformation/DO THE TEACHERS AND STAFF GET THEIR SALARY WITHIN FIRST WEEK OF THE MONTH?',
  'otherVitalInformation/DOES THE SCHOOL HAS EPF FACILITY FOR STAFF',
  'otherVitalInformation/EPF REGISTRATION NUMBER',
  'otherVitalInformation/MODE OF SALARY PAYMENT',
  'otherVitalInformation/NAME OF BANK WITH SALARY ACCOUNT',
  'otherVitalInformation/ARE THE SCHOOL ACCOUNTS AUDITED REGULARLY?',
  'otherVitalInformation/LEVEL OF INVOLVEMENT OF SCHOOL IN CBSE ACTIVITIES',
  'otherVitalInformation/ACADEMIC SESSION',
  'otherVitalInformation/VACATION PERIOD',
  'otherVitalInformation/BEST PRACTICES OF SCHOOL',
  'otherVitalInformation/E-Learning and Holistic Development of children',
  'otherVitalInformation/lastUpdated',
  'feeStructureSchool/ADMISSION FEE(in Rupees)/SENIOR SECONDARY',
  'feeStructureSchool/ADMISSION FEE(in Rupees)/SECONDARY',
  'feeStructureSchool/ADMISSION FEE(in Rupees)/MIDDLE',
  'feeStructureSchool/ADMISSION FEE(in Rupees)/PRIMARY',
  'feeStructureSchool/TUITION FEE(in Rupees)/SENIOR SECONDARY',
  'Fees(calculated)',
  'Category',
  'feeStructureSchool/TUITION FEE(in Rupees)/SECONDARY',
  'feeStructureSchool/TUITION FEE(in Rupees)/MIDDLE',
  'feeStructureSchool/TUITION FEE(in Rupees)/PRIMARY',
  'feeStructureSchool/YEARLY DEVELOPMENT CHARGES(in Rupees)/SENIOR SECONDARY',
  'feeStructureSchool/YEARLY DEVELOPMENT CHARGES(in Rupees)/SECONDARY',
  'feeStructureSchool/YEARLY DEVELOPMENT CHARGES(in Rupees)/MIDDLE',
  'feeStructureSchool/YEARLY DEVELOPMENT CHARGES(in Rupees)/PRIMARY',
  'feeStructureSchool/ANNUAL/MONTHLY OTHER CHARGES FOR OTHER FACILITIES(in Rupees)/SENIOR SECONDARY',
  'feeStructureSchool/ANNUAL/MONTHLY OTHER CHARGES FOR OTHER FACILITIES(in Rupees)/SECONDARY',
  'feeStructureSchool/ANNUAL/MONTHLY OTHER CHARGES FOR OTHER FACILITIES(in Rupees)/MIDDLE',
  'feeStructureSchool/ANNUAL/MONTHLY OTHER CHARGES FOR OTHER FACILITIES(in Rupees)/PRIMARY',
  'feeStructureSchool/lastUpdated',
  'additionalInformation/U-DISE CODE',
  'additionalInformation/SCHOOL LOCATED IN RURAL OR URBAN AREA',
  'additionalInformation/HABITATION NAME/MOHALLA',
  'additionalInformation/VILLAGE NAME (FOR RURAL)/WARD NUMBER (FOR URBAN)',
  'additionalInformation/VILLAGE PANCHAYAT NAME (FOR RURAL)',
  'additionalInformation/PIN CODE',
  'additionalInformation/CLUSTER RESOURCE CENTER NAME',
  'additionalInformation/CD BLOCK MANDAL/TALUKA NAME',
  'additionalInformation/EDUCATIONAL ZONE/MANDAL/TALUKA NAME',
  'additionalInformation/ASSEMBLY CONSTITUENCY',
  'additionalInformation/MUNICIPALITY',
  'additionalInformation/IS THIS SCHOOL APPROACHABLE BY ALL WEATHER ROAD',
  'additionalInformation/IS THIS A SPECIAL SCHOOL FOR CWSN',
  'additionalInformation/IS THIS A SHIFT SCHOOL',
  'additionalInformation/IS THIS A RESIDENTIAL SCHOOL',
  'additionalInformation/TYPE OF RESIDENTIAL SCHOOL',
  'additionalInformation/IS THIS A RELIGIOUS MINORITY SCHOOL',
  'additionalInformation/TYPE OF RELIGIOUS MINORITY SCHOOL',
  'additionalInformation/NUMBER OF ACADEMIC INSPECTIONS DURING LAST ACADEMIC YEAR',
  'additionalInformation/NUMBER OF VISITS BY CRC COORDINATOR DURING LAST ACADEMIC YEAR',
  'additionalInformation/NUMBER OF VISITS BY BLOCK LEVEL OFFICER DURING LAST ACADEMIC YEAR',
  'additionalInformation/lastUpdated',
  'schoolParticularsForElementarySchoolOnly/NUMBER OF INSTRUCTIONAL DAYS DURING LAST ACADEMIC YEAR',
  'schoolParticularsForElementarySchoolOnly/SCHOOL HOURS FOR CHILDREN PER DAY (CURRENT YEAR)',
  'schoolParticularsForElementarySchoolOnly/SCHOOL HOURS FOR TEACHERS PER DAY (CURRENT YEAR)',
  'schoolParticularsForElementarySchoolOnly/IS CCE BEING IMPLEMENTED',
  'schoolParticularsForElementarySchoolOnly/ARE PUPIL CUMULATIVE RECORDS BEING MAINTAINED?',
  'schoolParticularsForElementarySchoolOnly/ARE PUPIL CUMULATIVE RECORDS SHARED WITH PARENTS?',
  'schoolParticularsForElementarySchoolOnly/NUMBER OF STUDENTS PROVIDED IN SPECIAL TRAINING (CURRENT YEAR)',
  'schoolParticularsForElementarySchoolOnly/NUMBER OF STUDENTS ENROLLED IN SPECIAL TRAINING (PREVIOUS YEAR)',
  'schoolParticularsForElementarySchoolOnly/NUMBER OF STUDENTS COMPLETED SPECIAL TRAINING (PREVIOUS YEAR)',
  'schoolParticularsForElementarySchoolOnly/HAS SCHOOL MANAGEMENT COMMITTEE (SMC) BEEN CONSTITUTED?',
  'schoolParticularsForElementarySchoolOnly/LANGUAGES TAUGHT AT PRIMARY STAGE: MENTION THE NAME OF LANGUAGE OPTIONAL',
  'schoolParticularsForElementarySchoolOnly/IS ANGANWADI CENTRE IN OR ADJACENT TO SCHOOL? OPTIONAL',
  'schoolParticularsForElementarySchoolOnly/NUMBER OF MEETINGS HELD BY SMC DURING LAST ACADEMIC YEAR',
  'schoolParticularsForElementarySchoolOnly/WHETHER SMC PREPARE THE SCHOOL DEVELOPMENT PLAN',
  'schoolParticularsForElementarySchoolOnly/WHETHER SEPARATE BANK ACCOUNT FOR SMC',
  'schoolParticularsForElementarySchoolOnly/BANK NAME',
  'schoolParticularsForElementarySchoolOnly/ACCOUNT HOLDER\'S NAME',
  'schoolParticularsForElementarySchoolOnly/BANK ACCOUNT NUMBER',
  'schoolParticularsForElementarySchoolOnly/IFSC CODE',
  'schoolParticularsForElementarySchoolOnly/WHEN WAS THE TEXTBOOK RECEIVED FOR CURRENT YEAR?',
  'schoolParticularsForElementarySchoolOnly/WHETHER COMPLETE SET OF FREE TEXT BOOKS FOR TEACHERS LEARNING EQUIPMENT (TLE) RECEIVED?',
  'schoolParticularsForElementarySchoolOnly/WHETHER TLE RECEIVED FOR EACH GRADE?',
  'schoolParticularsForElementarySchoolOnly/WHETHER PLAY MATERIAL GAMES AND SPORTS MATERIAL AVAILABLE FOR EACH GRADE?',
  'schoolParticularsForElementarySchoolOnly/ARE THE MAJORITY OF PUPILS TAUGHT THROUGH THEIR MOTHER TONGUE AT PRIMARY STAGE? OPTIONAL',
  'schoolParticularsForElementarySchoolOnly/lastUpdated',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/NUMBER OF INSTRUCTIONAL DAYS DURING LAST ACADEMIC YEAR',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/SCHOOL HOURS FOR CHILDREN PER DAY (CURRENT YEAR)',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/SCHOOL HOURS FOR TEACHERS PER DAY (CURRENT YEAR)',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/IS CCE BEING IMPLEMENTED',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/ARE SCHOOL MANAGEMENT COMMITTEE (SMC) AND SCHOOL MANAGEMENT DEVELOPMENT COMMITTE (SMDC) SAME?',
  'schoolParticularsForSecondaryAndHigherSecondarySchoolsOnly/lastUpdated',
  'physicalFacilitiesAndEquipments/numberOfClassroomsByCondition/pucca/0',
  'physicalFacilitiesAndEquipments/numberOfClassroomsByCondition/partiallyPucca/0',
  'physicalFacilitiesAndEquipments/numberOfClassroomsByCondition/kuchcha/0',
  'physicalFacilitiesAndEquipments/numberOfClassroomsByCondition/tent/0',
  'physicalFacilitiesAndEquipments/IS LAND AVAILABLE FOR EXPANSION OF SCHOOL ACTIVITIES?',
  'physicalFacilitiesAndEquipments/IS SEPARATE ROOM AVAILABLE FOR PRINCIPAL/HEAD TEACHER?',
  'physicalFacilitiesAndEquipments/IS SEPARATE ROOM AVAILABLE FOR VICE PRINCIPAL/ASSISTANT HEAD TEACHER?',
  'physicalFacilitiesAndEquipments/IS SEPARATE ROOM AVAILABLE FOR CRAFTS/CO CURRICULAR ACTIVITIES?',
  'physicalFacilitiesAndEquipments/IS STAFF QUARTERS AVAILABLE?',
  'physicalFacilitiesAndEquipments/IS HAND WASHING FACILITY AVAILABLE NEAR TOILET/URINALS ?',
  'physicalFacilitiesAndEquipments/IS ELECTRICITY CONNECTION AVAILABLE?',
  'physicalFacilitiesAndEquipments/IS AUDIO/VISUAL/PUBLIC ADDRESS SYSTEM AVAILABLE?',
  'physicalFacilitiesAndEquipments/IS LCD PROJECTOR AVAILABLE?',
  'physicalFacilitiesAndEquipments/NUMBER OF AVAILABLE PRINTERS',
  'physicalFacilitiesAndEquipments/SPEED OF AVAILABLE PRINTERS',
  'physicalFacilitiesAndEquipments/NUMBER OF PHOTOCOPIERS AVAILABLE',
  'physicalFacilitiesAndEquipments/IS LEASE LINE AVAILABLE?',
  'physicalFacilitiesAndEquipments/SPEED OF LEASE LINE (IF AVAILABLE)',
  'physicalFacilitiesAndEquipments/IS SCANNER AVAILABLE?',
  'physicalFacilitiesAndEquipments/lastUpdated',
  'enrollmentInformation/categoryWiseStudents/PRIMARY/general',
  'enrollmentInformation/categoryWiseStudents/PRIMARY/sc',
  'enrollmentInformation/categoryWiseStudents/PRIMARY/st',
  'enrollmentInformation/categoryWiseStudents/PRIMARY/obc',
  'enrollmentInformation/categoryWiseStudents/MIDDLE/general',
  'enrollmentInformation/categoryWiseStudents/MIDDLE/sc',
  'enrollmentInformation/categoryWiseStudents/MIDDLE/st',
  'enrollmentInformation/categoryWiseStudents/MIDDLE/obc',
  'enrollmentInformation/categoryWiseStudents/SECONDARY/general',
  'enrollmentInformation/categoryWiseStudents/SECONDARY/sc',
  'enrollmentInformation/categoryWiseStudents/SECONDARY/st',
  'enrollmentInformation/categoryWiseStudents/SECONDARY/obc',
  'enrollmentInformation/categoryWiseStudents/SENIOR SECONDARY/general',
  'enrollmentInformation/categoryWiseStudents/SENIOR SECONDARY/sc',
  'enrollmentInformation/categoryWiseStudents/SENIOR SECONDARY/st',
  'enrollmentInformation/categoryWiseStudents/SENIOR SECONDARY/obc',
  'enrollmentInformation/minorityGroupWiseStudents/PRIMARY/muslim',
  'enrollmentInformation/minorityGroupWiseStudents/PRIMARY/christian',
  'enrollmentInformation/minorityGroupWiseStudents/PRIMARY/sikh',
  'enrollmentInformation/minorityGroupWiseStudents/PRIMARY/jain',
  'enrollmentInformation/minorityGroupWiseStudents/PRIMARY/others',
  'enrollmentInformation/minorityGroupWiseStudents/MIDDLE/muslim',
  'enrollmentInformation/minorityGroupWiseStudents/MIDDLE/christian',
  'enrollmentInformation/minorityGroupWiseStudents/MIDDLE/sikh',
  'enrollmentInformation/minorityGroupWiseStudents/MIDDLE/jain',
  'enrollmentInformation/minorityGroupWiseStudents/MIDDLE/others',
  'enrollmentInformation/minorityGroupWiseStudents/SECONDARY/muslim',
  'enrollmentInformation/minorityGroupWiseStudents/SECONDARY/christian',
  'enrollmentInformation/minorityGroupWiseStudents/SECONDARY/sikh',
  'enrollmentInformation/minorityGroupWiseStudents/SECONDARY/jain',
  'enrollmentInformation/minorityGroupWiseStudents/SECONDARY/others',
  'enrollmentInformation/minorityGroupWiseStudents/SENIOR SECONDARY/muslim',
  'enrollmentInformation/minorityGroupWiseStudents/SENIOR SECONDARY/christian',
  'enrollmentInformation/minorityGroupWiseStudents/SENIOR SECONDARY/sikh',
  'enrollmentInformation/minorityGroupWiseStudents/SENIOR SECONDARY/jain',
  'enrollmentInformation/minorityGroupWiseStudents/SENIOR SECONDARY/others',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/visualImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/speechImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/locomotiveDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/hearingImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/cerebralPalsy',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/learningDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/autism',
  'enrollmentInformation/childrenWithSpecialNeeds/PRIMARY/multipleDisabilities',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/visualImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/speechImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/locomotiveDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/hearingImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/cerebralPalsy',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/learningDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/autism',
  'enrollmentInformation/childrenWithSpecialNeeds/MIDDLE/multipleDisabilities',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/visualImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/speechImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/locomotiveDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/hearingImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/cerebralPalsy',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/learningDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/autism',
  'enrollmentInformation/childrenWithSpecialNeeds/SECONDARY/multipleDisabilities',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/visualImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/speechImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/locomotiveDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/hearingImpairment',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/cerebralPalsy',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/learningDisability',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/autism',
  'enrollmentInformation/childrenWithSpecialNeeds/SENIOR SECONDARY/multipleDisabilities',
  'enrollmentInformation/lastUpdated',
  'midDayMealInformation/STATUS OF KITCHEN SHED(If meal prepared in school)',
  'midDayMealInformation/SOURCE OF MDM(If meal not prepared in school)',
  'midDayMealInformation/lastUpdated',
  'sportsInformation/AEROBICS',
  'sportsInformation/ARCHERY',
  'sportsInformation/ATHLETICS',
  'sportsInformation/BADMINTON',
  'sportsInformation/BASKETBALL',
  'sportsInformation/BOXING',
  'sportsInformation/CHESS',
  'sportsInformation/CRICKET',
  'sportsInformation/FOOTBALL',
  'sportsInformation/GYMNASTICS',
  'sportsInformation/HANDBALL',
  'sportsInformation/HOCKEY',
  'sportsInformation/JUDO',
  'sportsInformation/KABADDI',
  'sportsInformation/KHO KHO',
  'sportsInformation/SHOOTING',
  'sportsInformation/SWIMMING',
  'sportsInformation/TAEKWONDO',
  'sportsInformation/TABLE TENNIS',
  'sportsInformation/TENNIS',
  'sportsInformation/VOLLEYBALL',
  'sportsInformation/YOGA',
  'sportsInformation/lastUpdated',
]

const headerMap = Object.fromEntries(
  sheetHeaders.map((header, i) => [header, schemaRow[i] ])
)

const blackListedSchemaKeys = [
  'classMuslim',
  'classChristian',
  'classSikh',
  'classJain',
  'classOther',
  'classVisualImpairment',
  'classSpeechImpairment',
  'classLocomotiveDisability',
  'classHearingImpairment',
  'classCerebralPalsy',
  'classLearningDisability',
  'classAutism',
  'classMultipleDisabilities',
  'classGeneral',
  'classSC',
  'classST',
  'classOBC',
]
const csvToSchemaName = (object) => {
  const schemaObject = {}
  Object.keys(object).forEach(key => {
    if (headerMap[key]) {
      const schemaKey = headerMap[key]
      let value = object[key]
      if (!blackListedSchemaKeys.includes(schemaKey)) {
        // if (schemaKey.toLowerCase().includes('lastUpdated') || schemaKey.toLowerCase().includes('date')) {
        //   let date = ''
        //   if (object[key].includes('/')) {
        //     date = object[key].split('/')
        //   } else {
        //     date = object[key].split('-')
        //   }
        //   value = new Date(date[2], date[1], date[0], 0, 0, 0)
        // }
        schemaObject[schemaKey] = value
      }
    }
  })
  return schemaObject
}

const limitObject = (object, limit: number) => {
  const limitedObject = {}
  Object.keys(object).forEach((key, i) => {
    if (i < limit) {
      limitedObject[key] = object[key]
    }
  })
  return limitedObject
}


const getLatLong = async (schoolName, state, district, address) => {
  const searchTerm = schoolName + ' ' + state + ' ' + district
  console.log('searching...', searchTerm)
  let url = 'https://www.edustoke.com/common/server/apis/getPlacesSuggestion.php?input=' + encodeURI(searchTerm)
  let res = await fetch(url, {
    headers: {
      'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)]
    }
  })
  let json = await res.json()
  if (json && json.data && json.data.length > 0) {
    const placeId = json.data[0].place_id
    const plad = await fetch(`https://www.edustoke.com/common/server/apis/getPlacesInfo.php?place_id=${placeId}`)
    const pladJson = await plad.json()
    const lat = pladJson.geometry.location.lat
    const long = pladJson.geometry.location.lng
    return {
      lat,
      long
    }
  }
  return {
    lat: null,
    long: null
  }
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)));

  let time  = ''

  if (days > 0) {
    time = days + "d "
  }
  if (hours > 0) {
    time = hours + "h "
  }
  if (minutes > 0) {
    time = time + minutes + "m "
  }
  if (seconds > 0) {
    time = time + seconds + "s "
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    time = duration + "ms "
  }

  return time
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 1000 * 60 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort()
    console.log('timeout, aborting...')
    console.log('Trying again... in 1 minute')
    setTimeout(async () => {
      console.log('Trying again...')
      return await fetchWithTimeout(resource, options)
    }, 60000)
  }, timeout);

  const response = await fetch(resource, {
    ...options,
    // agent: proxyAgent,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}

// const schoolApIBase = 'http://localhost:3000/school'
const schoolApIBase = 'https://school-map-git-main-sanatankc.vercel.app/school'
export async function GET() {
  // init time
  const startTime = new Date().getTime()
  let i = 0
  let log = ''
  // before we scrape I want to priortise certain cities first.
  const priortisedDistrict = [
    'BANGALORE URBAN',
    "MUMBAI",
    "CHENNAI",
    'HYDERABAD'
  ]
  const priortisedStates = [
    'DELHI',
    'KARNATAKA',
    'TAMILNADU',
    'TELANGANA',
    'KERALA',
    'ANDHRA PRADESH'
  ]

  let allSchools = affiliationIds
  for (let state of [].concat(priortisedStates).reverse()) {
    let schoolsWithoutState = allSchools.filter(school => school.state !== state)
    let schoolsWithState = allSchools.filter(school => school.state === state)
    allSchools = schoolsWithState.concat(schoolsWithoutState)
  }

  for (let district of [].concat(priortisedDistrict).reverse()) {
    let schoolsWithoutDistrict = allSchools.filter(school => school.district !== district)
    let schoolsWithDistrict = allSchools.filter(school => school.district === district)
    allSchools = schoolsWithDistrict.concat(schoolsWithoutDistrict)
  }
  let cursor = allSchools.findIndex(school => school.id === '100043')
  allSchools = allSchools.slice(cursor)
  allSchools = allSchools.filter(school => schoolsAlreadyInDb.indexOf(Number(school.id)) === -1)
  // for (const )
  for (const affilatedSchool of allSchools) {
    // console.log('hello')
    try {
      let currentStartTime = new Date().getTime()
      console.log('searching in db...', {
        affiliationCode: parseInt(affilatedSchool.id)
      })
      const schoolRes = await fetch(schoolApIBase + '?affiliationCode=' + parseInt(affilatedSchool.id))
      const school = await schoolRes.json()
      console.log('school --> ', school)
      if (school.length === 0) {
        console.log('not found in db, getting from cbse...')
        // const affilatedSchoolId = '830567'
        // console.log('affilatedSchoolId --> ', affilatedSchool.id)
        const res = await fetchWithTimeout(
          "https://saras.cbse.gov.in/maps/finalreportDetail?AffNo=" +  affilatedSchool.id, {
            headers: {
              'User-Agent': [Math.floor(Math.random() * userAgents.length)]
            }
          }
        )

        console.log('Getting school ', i, ' of ', allSchools.length)
        console.log('Affiliation ID --> ', affilatedSchool.id)
        const html = await res.text()
        log = log + 'Getting school ' + i + ' of ' + allSchools.length + '\n'
        log = log + 'Affiliation ID --> ' + affilatedSchool.id + '\n'
        const $ = cheerio.load(html)
        // console.log(html)
        // fs.writeFileSync('./test.ht/ml', html)
    
    
        const school = {}
        for (const property of Object.keys(scrapePath)) {
          const path = scrapePath[property].path
          const validator = scrapePath[property].type
          const elem = scrapePath[property].elem
          let value = ''
          // console.log('path --> ', property)
    
          if (elem === 'checkbox') {
            // console.log('check ---> ', $(path).outer())
            value = !!$(path).attr('checked')
          } else {
            value = $(path).first().text().trim()
            // console.log('value --> ', path, value)
          }
    
          const sanitisedValue = validator(value)  
          school[property] = sanitisedValue
        }
        if (school.name) {
    
          school.affiliationCode = parseInt(affilatedSchool.id)
          school.state = affilatedSchool.state
          school.district = affilatedSchool.district
          school.board = 'CBSE'
          console.log('Getting lat long ...')
          log = log + 'Getting lat long ...' + '\n'
          const { lat, long } = await getLatLong(school.name, school.state, school.district, school.address)
          school.lat = lat
          school.long = long
          console.log('adding to db')
          log = log + 'adding to db' + '\n'
          // console.log(school)
      
          // remove any duplicate keys
          const schoolKeys = Object.keys(school)
          const uniqueSchoolKeys = [...new Set(schoolKeys)]
          const uniqueSchool = {}
          uniqueSchoolKeys.forEach(key => {
            uniqueSchool[key] = school[key]
          })
          await fetch(schoolApIBase, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(uniqueSchool)
          })
          // await db.insert(schools).values(uniqueSchool)
          console.log('done')
          log = log + 'done' + '\n'
          // console.log('hello --> ', school)
        } else {
          console.log('Could not find the details...')
          log = log + 'Affiliation Id: ' + affilatedSchool.id + '\n'
          // console.log('school --> ', school)
          const logAppend = fs.createWriteStream('./log.txt', {flags: 'a'})
          logAppend.write(log)
          logAppend.end()
        }
        console.log('Pausing for 4 seconds...')
        await new Promise(resolve => setTimeout(resolve, 4000))
        i++
      } else {
        console.log('Already in db')
        console.log('skipping...')
      }

      let timeTaken = new Date().getTime() - startTime
      let currentTimeTaken = new Date().getTime() - currentStartTime
      console.log('Time taken --> ', msToTime(currentTimeTaken))
      console.log('Estimated time remaining --> ', msToTime((timeTaken / i) * (allSchools.length - i)))

      // after every 500 schools, wait for 5 minute

      if (i % 500 === 0) {
        console.log('Pausing for 5 minutes...')
        await new Promise(resolve => setTimeout(resolve, 300000))
      }
      console.log('-----------------------------------')
      console.log('-----------------------------------')
  
    } catch (e) {
      console.log('Error --> ', e)
    }
  }

  return NextResponse.json({ success: 'done' })
}