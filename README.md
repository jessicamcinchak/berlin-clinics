# Berlin clinics

A map of doctors & clinics for [Safer Sex Berlin](https://www.safersexberlin.com/) built on Airtable, OpenLayers, and React/Vite.

Preview it here https://jessicamcinchak.github.io/berlin-clinics/

## Develop

You'll need an Airtable base with these fields:
```ts
Name: string;
Tags: string[];
About: string;
Cost: string;
"How to get the appointment": string;
Languages: string[];
"Phone Number": string;
Website: string; // bitly for analytics tracking
"Website FULL": string; // display link
Coordinates: string; // lat,lon
Address: string;
Neighborhood: string;
```

Copy `.env.example` to `.env` and add your Airtable Personal Access Token and base ID

Run the app! Assumes Node and PNPM are installed globally

```
cd berlin-clinics
pnpm run dev
```
