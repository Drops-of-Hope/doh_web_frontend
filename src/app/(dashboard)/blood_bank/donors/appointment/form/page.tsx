"use client";

import { BackButton, PreScreeningFormDisplay } from "@/components";
import { ReactElement } from "react";
import { FormData } from '../../../../../../../types';

export default function Form(): ReactElement {
const formData: FormData = {
  // Questions 1-12 (existing)
  experiencedAilment: "yes",
  ailmentDescription: "Felt slightly dizzy after my second donation, but it passed after resting for 10 minutes",
  medicallyAdvised: "no",
  readInformationLeaflet: "yes",
  feelingWellToday: "yes",
  hasDiseasesConditions: "yes",
  selectedDiseases: ["diabetes", "asthma"],
  takingMedication: "no",
  undergoneSurgery: "yes",
  surgeryDescription: "Appendectomy in 2022",
  heavyWorkAfterDonation: "no",
  isPregnantOrBreastfeeding: "no",
  childbirthOrAbortion: "no",
  hadJaundiceHepatitis: "no",
  hadTuberculosisTyphoid: "yes",
  tuberculosisTyphoidDetails: "Had typhoid in January 2023, completed full course of antibiotics",
  receivedVaccinations: "yes",
  vaccinationDetails: "COVID-19 booster shot in November 2023",
  hadTattooOrPiercing: "yes",
  tattooOrPiercingDetails: "Small tattoo on wrist in August 2023 at licensed parlor",
  beenImprisoned: "no",
  imprisonmentDetails: undefined,
  travelledAbroad: "yes",
  travelDetails: "Visited India in December 2023 for 2 weeks, Thailand in February 2024 for vacation",
  receivedBloodProducts: "no",
  bloodProductsDetails: undefined,
  hadMalaria: "yes",
  malariaDetails: "Had malaria in 2021 while traveling, completed full treatment with artemisinin"
};

  return (
    <div className="min-h-[100vh] p-4 pt-2 bg-[#f8f8f8]">
      <div className="">
        <div className="mb-6">
          <BackButton
            fallbackUrl="/blood_bank/donors/appointment/form"
            className="hover:shadow-md"
          />
        </div>
        
        <div className="">
          <PreScreeningFormDisplay formData={formData} />
        </div>
      </div>
    </div>
  );
}