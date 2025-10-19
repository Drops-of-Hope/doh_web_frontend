import { formatDisplayDate, mapBloodGroupToDisplay } from './appointmentUtils';

export interface NormalizedDonor {
  id: number | string;
  name: string;
  bloodGroup?: string;
  contact?: string;
  city?: string;
  lastDonation?: string;
  lastDonationRaw?: string | number | Date;
  pointsEarned?: number;
  numberOfDonations?: number;
  donationBadge?: string;
}

function firstDefined<T>(...vals: Array<T | undefined | null>): T | undefined {
  for (const v of vals) if (v !== undefined && v !== null) return v as T;
  return undefined;
}

export function normalizeDonor(raw: any): NormalizedDonor {
  const id = firstDefined(raw.id, raw._id, raw.donorId, raw.donor?.id) ?? '';

  const name = firstDefined(
    raw.name,
    raw.fullName,
    raw.user?.name,
    raw.user?.fullName,
    raw.donor?.name,
    raw.personName
  ) ?? '';

  const rawBloodGroup = firstDefined(
    raw.bloodGroup,
    raw.user?.bloodGroup,
    raw.donor?.bloodGroup,
    raw.bloodDonation?.user?.bloodGroup,
    raw.user?.blood_donation?.bloodGroup
  );
  const bloodGroup = rawBloodGroup ? mapBloodGroupToDisplay(rawBloodGroup) : undefined;

  const contact = firstDefined(
    raw.contact,
    raw.phone,
    raw.phoneNumber,
    raw.user?.phone,
    raw.user?.contact,
    raw.donor?.contact
  );

  const city = firstDefined(
    raw.city,
    raw.address?.city,
    raw.user?.city,
    raw.user?.address?.city,
    raw.donor?.city
  );

  const rawLast = firstDefined(
    raw.lastDonation,
    raw.last_donation,
    raw.lastDonationDate,
    raw.last_donated_at,
    raw.bloodDonation?.startTime,
    raw.donations?.[0]?.startTime,
    raw.donations?.[0]?.date
  );

  const lastDonation = rawLast ? formatDisplayDate(rawLast) : undefined;

  const numberOfDonations = firstDefined(
    raw.numberOfDonations,
    raw.totalDonations,
    raw.donations?.length,
    raw.user?.numberOfDonations,
    raw.user?.donationCount
  );

  const pointsEarned = firstDefined(
    raw.pointsEarned,
    raw.points,
    raw.user?.pointsEarned,
    raw.user?.points,
    raw.points_earned
  );

  // derive a simple badge from numberOfDonations (preferred) or points
  let donationBadge: string | undefined;
  const donationsNum = typeof numberOfDonations === 'number' ? numberOfDonations : Number(numberOfDonations || 0);
  const pointsNum = typeof pointsEarned === 'number' ? pointsEarned : Number(pointsEarned || 0);

  if (donationsNum >= 20 || pointsNum >= 1000) donationBadge = 'Platinum';
  else if (donationsNum >= 10 || pointsNum >= 500) donationBadge = 'Gold';
  else if (donationsNum >= 5 || pointsNum >= 200) donationBadge = 'Silver';
  else if (donationsNum >= 1 || pointsNum >= 10) donationBadge = 'Bronze';
  else donationBadge = 'New';

  return {
    id,
    name,
    bloodGroup,
    contact,
    city,
    lastDonation,
    lastDonationRaw: rawLast ?? undefined,
    pointsEarned: pointsNum || undefined,
    numberOfDonations: donationsNum || undefined,
    donationBadge,
  };
}

export default normalizeDonor;
