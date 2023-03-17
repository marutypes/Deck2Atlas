import * as crypto from 'crypto';
import dashify from 'dashify';
import {cleanCardName} from './scryfall';

export function hashForDeck(cards: string[], commanders: string[]) {
    const concatenatedString = cards.concat(commanders).join('-');
    const hash = crypto.createHash('sha256').update(concatenatedString).digest('hex');
    const shortUrlSegment = hash.substring(0, 6);

    if (commanders.length > 0) {
        const name = dashify(cleanCardName(commanders[0]));
        return `${name}-${shortUrlSegment}`;
    } else if (cards.length > 0) {
        const name = dashify(cleanCardName(cards[0]));
        return `${name}-${shortUrlSegment}`;
    }
}