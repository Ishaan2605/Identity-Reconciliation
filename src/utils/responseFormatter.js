"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = (primary, all) => {
    const emails = new Set();
    const phones = new Set();
    const secondaryIds = [];
    for (const c of [primary, ...all]) {
        if (c.email)
            emails.add(c.email);
        if (c.phoneNumber)
            phones.add(c.phoneNumber);
        if (c.id !== primary.id)
            secondaryIds.push(c.id);
    }
    return {
        primaryContactId: primary.id,
        emails: [primary.email, ...[...emails].filter(e => e !== primary.email)],
        phoneNumbers: [primary.phoneNumber, ...[...phones].filter(p => p !== primary.phoneNumber)],
        secondaryContactIds: secondaryIds,
    };
};
exports.formatResponse = formatResponse;
