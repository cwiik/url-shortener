import { nanoid } from 'nanoid';

export const GenerateShortUrl = () => {
    const SHORTURL = nanoid(10);
    return SHORTURL;
};
