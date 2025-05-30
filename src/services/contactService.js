"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identify = void 0;
const client_1 = require("@prisma/client");
const responseFormatter_1 = require("../utils/responseFormatter");
const prisma = new client_1.PrismaClient();
const identify = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, phoneNumber }) {
    if (!email && !phoneNumber)
        throw new Error('Email or phone number required');
    const contacts = yield prisma.contact.findMany({
        where: {
            OR: [
                { email: email || undefined },
                { phoneNumber: phoneNumber || undefined },
            ],
        },
        orderBy: { createdAt: 'asc' },
    });
    if (contacts.length === 0) {
        const newContact = yield prisma.contact.create({
            data: { email, phoneNumber, linkPrecedence: 'primary' },
        });
        return (0, responseFormatter_1.formatResponse)(newContact, []);
    }
    const primary = contacts.find(c => c.linkPrecedence === 'primary') || contacts[0];
    const allRelated = yield prisma.contact.findMany({
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
        yield prisma.contact.create({
            data: {
                email,
                phoneNumber,
                linkedId: primary.id,
                linkPrecedence: 'secondary',
            },
        });
    }
    const finalContacts = yield prisma.contact.findMany({
        where: {
            OR: [
                { id: primary.id },
                { linkedId: primary.id },
            ],
        },
        orderBy: { createdAt: 'asc' },
    });
    return (0, responseFormatter_1.formatResponse)(primary, finalContacts);
});
exports.identify = identify;
