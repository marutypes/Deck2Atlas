# Deck 2 Atlas

I created this little [Next.js](https://nextjs.org/) to allow you turn your Magic: The
Gathering decklists into texture atlases for use in a separate VRChat world I hope to release soon.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## APIs Used

- [Scryfall](https://scryfall.com/) for images and card autocomplete
- [Deckstats](https://deckstats.net) for decklist fetching
- [AWS S3](https://aws.amazon.com/pm/serv-s3/?trk=936e5692-d2c9-4e52-a837-088366a7ac3f&sc_channel=ps&s_kwcid=AL!4422!3!536324434071!e!!g!!aws%20s3&ef_id=Cj0KCQjwn9CgBhDjARIsAD15h0AktQOQT3x5Aj_yTiFXeLCg35zXPyE2ZnCMn_iklBj9APT2qU05qNkaAp8nEALw_wcB:G:s&s_kwcid=AL!4422!3!536324434071!e!!g!!aws%20s3) for image storage and retrieval