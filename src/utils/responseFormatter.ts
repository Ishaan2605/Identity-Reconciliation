import { Contact } from '@prisma/client';

export const formatResponse = (primary: Contact, all: Contact[]) => {
  const emails = new Set<string>();
  const phones = new Set<string>();
  const secondaryIds: number[] = [];

  for (const c of [primary, ...all]) {
    if (c.email) emails.add(c.email);
    if (c.phoneNumber) phones.add(c.phoneNumber);
    if (c.id !== primary.id) secondaryIds.push(c.id);
  }

  return {
    primaryContactId: primary.id,
    emails: [primary.email!, ...[...emails].filter(e => e !== primary.email)],
    phoneNumbers: [primary.phoneNumber!, ...[...phones].filter(p => p !== primary.phoneNumber)],
    secondaryContactIds: secondaryIds,
  };
};
