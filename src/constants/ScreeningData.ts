// utils/screeningData.ts

export const mockPreviousResponses = [
  {
    id: 'BD-2024-002',
    date: 'February 10, 2024',
    responses: {
      experiencedAilment: 'No',
      medicallyAdvised: 'No',
      readInformationLeaflet: 'Yes',
      feelingWellToday: 'Yes',
      hasDiseasesConditions: 'No',
      takingMedication: 'Yes',
      undergoneSurgery: 'No',
      heavyWorkAfterDonation: 'No',
      isPregnantOrBreastfeeding: 'No',
      childbirthOrAbortion: 'No',
      hadJaundiceHepatitis: 'No',
      hadTuberculosisTyphoid: 'No',
      receivedVaccinations: 'Yes',
      hadTattooOrPiercing: 'No',
      beenImprisoned: 'No',
      travelledAbroad: 'Yes',
      receivedBloodProducts: 'No',
      hadMalaria: 'No'
    }
  }
];

export const screeningQuestions = [
  { key: 'experiencedAilment', number: 1, text: 'Did you experience any ailment, difficulty or discomfort during previous donations?' },
  { key: 'medicallyAdvised', number: 2, text: 'Have you ever been medically advised not to donate blood?' },
  { key: 'readInformationLeaflet', number: 3, text: 'Have you read and understood the blood donors information leaflet given to you?' },
  { key: 'feelingWellToday', number: 4, text: 'Are you feeling well today?' },
  { key: 'hasDiseasesConditions', number: 5, text: 'Have you ever had or taken any treatment for any of the following disease conditions?' },
  { key: 'takingMedication', number: 6, text: 'Are you taking any medication/treatment presently?' },
  { key: 'undergoneSurgery', number: 7, text: 'Have you undergone any surgery?' },
  { key: 'heavyWorkAfterDonation', number: 8, text: 'After donating blood, do you have to engage in any heavy work, driving passenger or heavy vehicles or working at heights today?' },
  { key: 'isPregnantOrBreastfeeding', number: 9, text: '(For females) Are you pregnant or breastfeeding at present?' },
  { key: 'childbirthOrAbortion', number: 10, text: '(For females) Have you had a childbirth or an abortion during the last 12 months?' },
  { key: 'hadJaundiceHepatitis', number: 11, text: 'Have you ever had jaundice/hepatitis in the past?' },
  { key: 'hadTuberculosisTyphoid', number: 12, text: 'During the last 2 years, have you ever had tuberculosis or typhoid, or taken treatment for them?' },
  { key: 'receivedVaccinations', number: 13, text: 'During the past 12 months, have you received any vaccinations?' },
  { key: 'hadTattooOrPiercing', number: 14, text: 'During the past 12 months, Have you had tattoo, ear/body piercing or acupuncture treatment?' },
  { key: 'beenImprisoned', number: 15, text: 'During the past 12 months, Have you been imprisoned?' },
  { key: 'travelledAbroad', number: 16, text: 'During the past 12 months, Have you or your partner travelled abroad?' },
  { key: 'receivedBloodProducts', number: 17, text: 'During the past 12 months, Have you or your partner received blood or blood products?' },
  { key: 'hadMalaria', number: 18, text: 'During the past 12 months, Have you had malaria or taken treatment for malaria?' }
];
