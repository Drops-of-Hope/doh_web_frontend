"use client";
import React, { useState } from 'react';
import { PreScreeningFormDisplayProps } from '../../../types';
import { QuestionDisplay, PreScreeningComparisonPanel } from '@/components';
import { mockPreviousResponses, screeningQuestions } from '@/constants/ScreeningData';

const PreScreeningFormDisplay: React.FC<PreScreeningFormDisplayProps> = ({ formData }) => {
  const [showComparison, setShowComparison] = useState(false);

  // Helper function to convert boolean to yes/no string for display
  const boolToYesNo = (value: boolean): string => value ? "yes" : "no";
  
  // Helper function to get selected diseases as array from Record
  const getSelectedDiseases = (diseases: Record<string, boolean>): string[] => {
    return Object.entries(diseases)
      .filter(([selected]) => selected)
      .map(([disease]) => disease);
  };

  const getInconsistencies = () => {
    const inconsistencies: Array<{
      questionNumber: number;
      question: string;
      currentAnswer: string;
      previousAnswers: Array<{ date: string; answer: string; id: string; isInconsistent: boolean }>;
    }> = [];

    const questions = screeningQuestions;

    questions.forEach(question => {
      const currentAnswer = formData[question.key as keyof typeof formData] as string;
      const previousAnswers: Array<{ date: string; answer: string; id: string; isInconsistent: boolean }> = [];
      let hasInconsistency = false;

      mockPreviousResponses.forEach(prevResponse => {
        const prevAnswer = prevResponse.responses[question.key as keyof typeof prevResponse.responses];
        const isInconsistent = prevAnswer !== currentAnswer;
        
        if (isInconsistent) {
          hasInconsistency = true;
        }
        
        previousAnswers.push({
          date: prevResponse.date,
          answer: prevAnswer,
          id: prevResponse.id,
          isInconsistent
        });
      });

      if (hasInconsistency) {
        inconsistencies.push({
          questionNumber: question.number,
          question: question.text,
          currentAnswer,
          previousAnswers
        });
      }
    });

    return inconsistencies;
  };

  const inconsistencies = getInconsistencies();

  return (
    <div className="bg-white rounded-lg shadow-sm p-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          Blood Donation Pre-Screening Form
        </h2>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showComparison 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {showComparison ? 'Hide Comparison' : 'Compare with Recent Responses'}
        </button>
      </div>

      <div className={`flex ${showComparison ? 'mr-80' : ''} transition-all duration-300`}>
        <div className="flex-1">
          {/* Section 1 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(1) Previous Donation History</h3>
            <QuestionDisplay
              questionNumber={1}
              question="Have you donated blood previously?"
              answer={boolToYesNo(formData.hasDonatedBefore)}
            />
            <QuestionDisplay
              questionNumber={2}
              question="Did you experience any ailment, difficulty or discomfort during previous donations? If yes, what was the difficulty?"
              answer={formData.anyDifficulty || "N/A"}
              additionalDetails={formData.anyDifficulty}
            />
            <QuestionDisplay
              questionNumber={3}
              question="Have you ever been medically advised not to donate blood?"
              answer={boolToYesNo(formData.medicalAdvice)}
            />
          </div>

          {/* Section 2 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(2) Current Health Status</h3>
            <QuestionDisplay
              questionNumber={4}
              question="Are you feeling well, today?"
              answer={boolToYesNo(formData.feelingWell)}
            />
            <QuestionDisplay
              questionNumber={5}
              question="Have you ever had or taken treatment for any of the following disease conditions? If Yes, please mark X in relevant boxes and discuss with the medical officer during the interview."
              answer={Object.values(formData.anyDiseases).some(Boolean) ? "yes" : "no"}
              note="Heart Disease, Strokes, Kidney diseases, Diabetes, Fits, Liver diseases, Asthma/Lung disease, Blood disorders, Cancer"
              selectedItems={getSelectedDiseases(formData.anyDiseases)}
            />
            <QuestionDisplay
              questionNumber={6}
              question="Are you taking any medication/treatment, presently?"
              answer={boolToYesNo(formData.takingMedicines)}
            />
            <QuestionDisplay
              questionNumber={7}
              question="Have you undergone any surgery?"
              answer={boolToYesNo(formData.anySurgery)}
            />
            <QuestionDisplay
              questionNumber={8}
              question="After donating blood, do you have to engage in any heavy work, driving passenger or heavy vehicles or work at heights today?"
              answer={boolToYesNo(formData.workingLater)}
            />
            <QuestionDisplay
              questionNumber={9}
              question="(For females) Are you pregnant or breast feeding at present? Have you had a child birth or an abortion during last 12 months?"
              answer={boolToYesNo(formData.pregnant)}
            />
          </div>

          {/* Section 3 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(3) Past Medical History</h3>
            <QuestionDisplay
              questionNumber={10}
              question="Have you ever had Jaundice/hepatitis in the past?"
              answer={boolToYesNo(formData.haveHepatitis)}
            />
            <QuestionDisplay
              questionNumber={11}
              question="During last 2 years: Have you had Tuberculosis or Typhoid or taken treatment for them?"
              answer={boolToYesNo(formData.haveTB)}
            />
          </div>

          {/* Section 4 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(4) During past 12 months</h3>
            <QuestionDisplay
              questionNumber={12}
              question="Have you received any vaccinations?"
              answer={boolToYesNo(formData.hadVaccination)}
            />
            <QuestionDisplay
              questionNumber={13}
              question="Have you had tattooing, ear / body piercing or acupuncture treatment?"
              answer={boolToYesNo(formData.tattoos)}
            />
            <QuestionDisplay
              questionNumber={14}
              question="Have you been imprisoned for any reason?"
              answer={boolToYesNo(formData.haveImprisonment)}
            />
            <QuestionDisplay
              questionNumber={15}
              question="Have you or your partner travelled abroad?"
              answer={boolToYesNo(formData.travelledAbroad)}
            />
            <QuestionDisplay
              questionNumber={16}
              question="Have you or your partner received blood or blood products? Had chemo therapy?"
              answer={boolToYesNo(formData.receivedBlood || formData.chemotherapy)}
            />
            <QuestionDisplay
              questionNumber={17}
              question="Have you had malaria or taken treatment for malaria?"
              answer={boolToYesNo(formData.hadMalaria)}
            />
          </div>

          {/* Section 5 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(5) Recent Health History</h3>
            <QuestionDisplay
              questionNumber={18}
              question="During last 6 months: Have you had Dengue fever?"
              answer={boolToYesNo(formData.hasDengue)}
            />
            <QuestionDisplay
              questionNumber={19}
              question="During last 1 month: Have you had chicken pox, measles, mumps, rubella, diarrhoea or any other long standing (more than one week) fever?"
              answer={boolToYesNo(formData.hadLongFever)}
            />
            <QuestionDisplay
              questionNumber={20}
              question="During last 1 week: Have you had a dental extraction?"
              answer={boolToYesNo(formData.hadtoothExtraction)}
            />
            <QuestionDisplay
              questionNumber={21}
              question="During last 1 week: Have you taken Aspirin, Antibiotics or any other medicine?"
              answer={boolToYesNo(formData.bookAspirin)}
            />
          </div>

          {/* Section 6 */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">(6) Risk Factors</h3>
            <QuestionDisplay
              questionNumber={22}
              question="Do you know that people of following categories should not give blood?"
              answer={boolToYesNo(formData.Acknowledgement)}
              note="* If you were found to be positive for HIV, Hepatitis B, C or Syphilis infections at any time
* If you have had multiple sexual partners
* If you have ever engaged in male to male sexual activity
* If you have ever injected any drug (esp. Narcotics) not prescribed by a qualified medical practitioner
* If you have ever worked as a commercial sex worker
* If you have had sex with a commercial sex worker or an unknown partner during last 1 year
* If you suspect that you or your partner may have got HIV or any other sexually transmitted infection"
            />
            <QuestionDisplay
              questionNumber={23}
              question="Do you or your sexual partner belong to one of the above categories?"
              answer={boolToYesNo(formData.highRisk)}
            />
            <QuestionDisplay
              questionNumber={24}
              question="Are you having persistent fever, diarrhoea, multiple swollen lymph nodes or unintentional weight loss?"
              answer={boolToYesNo(formData.hadWeightLoss)}
            />
          </div>

          <div className="border-t border-gray-300 pt-6 mt-8">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Form submitted on: {new Date(formData.dateTime).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
          {showComparison && (
            <PreScreeningComparisonPanel
              inconsistencies={inconsistencies}
              onClose={() => setShowComparison(false)}
              previousResponses={mockPreviousResponses}
            />
          )}
    </div>
  );
};

export default PreScreeningFormDisplay;