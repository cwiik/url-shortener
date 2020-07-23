import { nanoid } from 'nanoid';

export const GenerateShortUrl = (URL) => {
    const SHORTURL = nanoid(10);
    return `http://s.url/${SHORTURL}`;
};
