"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identify = void 0;
const client_1 = require("@prisma/client");
const responseFormatter_1 = require("../utils/responseFormatter");
const prisma = new client_1.PrismaClient();
const identify = async ({ email, phoneNumber }) => {
    if (!email && !phoneNumber)
        throw new Error('Email or phone number required');
    const contacts = await prisma.contact.findMany({
        where: {
            OR: [
                { email: email || undefined },
                { phoneNumber: phoneNumber || undefined },
            ],
        },
        orderBy: { createdAt: 'asc' },
    });
    if (contacts.length === 0) {
        const newContact = await prisma.contact.create({
            data: { email, phoneNumber, linkPrecedence: 'primary' },
        });
        return (0, responseFormatter_1.formatResponse)(newContact, []);
    }
    const primary = (contacts.find(c => c.linkPrecedence === 'primary') || contacts[0]);
    const allRelated = await prisma.contact.findMany({
        where: {
            OR: [
                { id: primary.id },
                { linkedId: primary.id },
                { linkedId: { in: contacts.map(c => c.id) } },
            ],
        },
        orderBy: { createdAt: 'asc' },
    });
    const alreadyExists = allRelated.some(c => c.email === email && c.phoneNumber === phoneNumber);
    if (!alreadyExists) {
        await prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkedId: primary.id,
                linkPrecedence: 'secondary',
            },
        });
    }
    const finalContacts = await prisma.contact.findMany({
        where: {
            OR: [
                { id: primary.id },
                { linkedId: primary.id },
            ],
        },
        orderBy: { createdAt: 'asc' },
    });
    return (0, responseFormatter_1.formatResponse)(primary, finalContacts);
};
exports.identify = identify;
