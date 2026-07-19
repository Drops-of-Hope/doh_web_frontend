export const mockPreviousResponses = [
  {
    id: 'BD-2026-002',
    date: 'March 18, 2026',
    responses: {
      hasDonatedBefore: 'Yes',
      medicalAdvice: 'No',
      feelingWell: 'Yes',
      takingMedicines: 'No',        // minor inconsistency target
      anySurgery: 'No',
      workingLater: 'No',
      pregnant: 'No',
      haveHepatitis: 'No',
      haveTB: 'No',
      hadVaccination: 'Yes',
      tattoos: 'Yes',               // minor inconsistency target
      haveImprisonment: 'No',
      travelledAbroad: 'Yes',
      receivedBlood: 'No',
      hadMalaria: 'No',
      hasDengue: 'No',
      hadLongFever: 'No',
      hadtoothExtraction: 'No',
      bookAspirin: 'No',
      Acknowledgement: 'Yes',
      highRisk: 'No',
      hadWeightLoss: 'No'
    }
  }
];

export const screeningQuestions = [
  { key: 'hasDonatedBefore', number: 1, text: 'Have you donated blood previously?' },
  { key: 'medicalAdvice', number: 3, text: 'Have you ever been medically advised not to donate blood?' },
  { key: 'feelingWell', number: 4, text: 'Are you feeling well, today?' },
  { key: 'takingMedicines', number: 6, text: 'Are you taking any medication/treatment, presently?' },
  { key: 'anySurgery', number: 7, text: 'Have you undergone any surgery?' },
  { key: 'workingLater', number: 8, text: 'After donating blood, do you have to engage in any heavy work, driving passenger or heavy vehicles or work at heights today?' },
  { key: 'pregnant', number: 9, text: '(For females) Are you pregnant or breast feeding at present?' },
  { key: 'haveHepatitis', number: 10, text: 'Have you ever had Jaundice/hepatitis in the past?' },
  { key: 'haveTB', number: 11, text: 'During last 2 years: Have you had Tuberculosis or Typhoid or taken treatment for them?' },
  { key: 'hadVaccination', number: 12, text: 'Have you received any vaccinations?' },
  { key: 'tattoos', number: 13, text: 'Have you had tattooing, ear / body piercing or acupuncture treatment?' },
  { key: 'haveImprisonment', number: 14, text: 'Have you been imprisoned for any reason?' },
  { key: 'travelledAbroad', number: 15, text: 'Have you or your partner travelled abroad?' },
  { key: 'receivedBlood', number: 16, text: 'Have you or your partner received blood or blood products? Had chemo therapy?' },
  { key: 'hadMalaria', number: 17, text: 'Have you had malaria or taken treatment for malaria?' },
  { key: 'hasDengue', number: 18, text: 'During last 6 months: Have you had Dengue fever?' },
  { key: 'hadLongFever', number: 19, text: 'During last 1 month: Have you had chicken pox, measles, mumps, rubella, diarrhoea or any other long standing fever?' },
  { key: 'hadtoothExtraction', number: 20, text: 'During last 1 week: Have you had a dental extraction?' },
  { key: 'bookAspirin', number: 21, text: 'During last 1 week: Have you taken Aspirin, Antibiotics or any other medicine?' },
  { key: 'Acknowledgement', number: 22, text: 'Do you know that people of following categories should not give blood?' },
  { key: 'highRisk', number: 23, text: 'Do you or your sexual partner belong to one of the above categories?' },
  { key: 'hadWeightLoss', number: 24, text: 'Are you having persistent fever, diarrhoea, multiple swollen lymph nodes or unintentional weight loss?' }
];