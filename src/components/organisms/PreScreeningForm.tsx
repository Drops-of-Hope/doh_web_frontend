import React from 'react';
import { PreScreeningFormDisplayProps } from '../../../types';
import { QuestionDisplay } from '@/components'

const PreScreeningFormDisplay: React.FC<PreScreeningFormDisplayProps> = ({ formData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Blood Donation Pre-Screening Form
      </h2>
      
      <QuestionDisplay
        questionNumber={1}
        question="Did you experience any ailment, difficulty or discomfort during previous donations?"
        answer={formData.experiencedAilment}
        description="Please describe the difficulty:"
        additionalDetails={formData.ailmentDescription}
      />

      <QuestionDisplay
        questionNumber={2}
        question="Have you ever been medically advised not to donate blood?"
        answer={formData.medicallyAdvised}
      />

      <QuestionDisplay
        questionNumber={3}
        question="Have you read and understood the blood donors information leaflet given to you?"
        answer={formData.readInformationLeaflet}
      />

      <QuestionDisplay
        questionNumber={4}
        question="Are you feeling well today?"
        answer={formData.feelingWellToday}
      />

      <QuestionDisplay
        questionNumber={5}
        question="Have you ever had or taken any treatment for any of the following disease conditions?"
        answer={formData.hasDiseasesConditions}
        note="If yes, please check the relevant boxes and discuss with the relevant medical officer during the interview."
        selectedItems={formData.selectedDiseases}
      />

      <QuestionDisplay
        questionNumber={6}
        question="Are you taking any medication/treatment presently?"
        answer={formData.takingMedication}
      />

      <QuestionDisplay
        questionNumber={7}
        question="Have you undergone any surgery?"
        answer={formData.undergoneSurgery}
      />

      <QuestionDisplay
        questionNumber={8}
        question="After donating blood, do you have to engage in any heavy work, driving passenger or heavy vehicles or working at heights today?"
        answer={formData.heavyWorkAfterDonation}
      />

      <QuestionDisplay
        questionNumber={9}
        question="(For females) Are you pregnant or breastfeeding at present?"
        answer={formData.isPregnantOrBreastfeeding}
      />

      <QuestionDisplay
        questionNumber={10}
        question="(For females) Have you had a childbirth or an abortion during the last 12 months?"
        answer={formData.childbirthOrAbortion}
      />

      <QuestionDisplay
        questionNumber={11}
        question="Have you ever had jaundice/hepatitis in the past?"
        answer={formData.hadJaundiceHepatitis}
      />

      <QuestionDisplay
        questionNumber={12}
        question="During the last 2 years, have you ever had tuberculosis or typhoid, or taken treatment for them?"
        answer={formData.hadTuberculosisTyphoid}
      />

      <QuestionDisplay
        questionNumber={13}
        question="During the past 12 months, have you received any vaccinations?"
        answer={formData.receivedVaccinations}
      />

      <QuestionDisplay
        questionNumber={14}
        question="During the past 12 months, Have you had tattoo, ear/body piercing or acupuncture treatment?"
        answer={formData.hadTattooOrPiercing}
      />

      <QuestionDisplay
        questionNumber={15}
        question="During the past 12 months, Have you been imprisoned?"
        answer={formData.beenImprisoned}
      />

      <QuestionDisplay
        questionNumber={16}
        question="During the past 12 months, Have you or your partner travelled abroad?"
        answer={formData.travelledAbroad}
      />

      <QuestionDisplay
        questionNumber={17}
        question="During the past 12 months, Have you or your partner received blood or blood products?"
        answer={formData.receivedBloodProducts}
      />

      <QuestionDisplay
        questionNumber={18}
        question="During the past 12 months, Have you had malaria or taken treatment for malaria?"
        answer={formData.hadMalaria}
      />

      <div className="border-t border-gray-300 pt-6 mt-8">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Form submitted on: March 15, 2024</span>
          <span>Donor ID: BD-2024-001</span>
        </div>
      </div>
    </div>
  );
};

export default PreScreeningFormDisplay;