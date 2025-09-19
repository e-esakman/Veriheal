### VeriHeal

Tagline: Proof of care, not just cure.

### Overview

VeriHeal is a mobile-first React Native prototype focused on secure verification in healthcare scenarios. The app is designed to allow users to prove eligibility for healthcare services while protecting privacy. It explores wallet integration and zkTLS (Zero-Knowledge TLS) to provide secure verification, though these features are currently in a concept/skeleton stage.

This repo contains the app’s UI structure and prototype screens, prepared for hackathon submission.

### Features

User Type Selection – Choose between categories like Cancer, Mental Health, or Addiction

Wallet Connection (Planned) – Intended to securely link user accounts

ID Upload & Verification Workflow – Prototype screens for uploading IDs and verifying credentials

Dashboard & Profile Screens – Basic layout for user interaction

Badges & Proof Placeholders – Conceptual representation of verified credentials

Mobile-first UI built with React Native and compatible with Expo

⚠️ Note: Wallet connection and zkTLS integration were attempted but are not fully functional in this prototype.

### Installation

Clone the repository:

git clone https://github.com/e-esakman/Veriheal.git
cd Veriheal


### Install dependencies:

npm install


Run the app using Expo (Android recommended):

npx expo start


Keep your .env file locally for any API keys (this file is not included in the repo for security).

### Usage

The app currently runs as a UI prototype.

Screens simulate workflow for user registration, wallet connection, ID upload, and verification.

Any integration with wallets or zkTLS is not functional, intended for demonstration purposes.

File Structure

screens/ – Screens like Profile, Verify, Dashboard

components/ – Reusable UI components

_layout.tsx – App layout and navigation

Prepared for XION Hackathon submission as a prototype.

### License

This project is licensed under the MIT License — see the LICENSE file.
