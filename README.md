# CloudArcade Starter Edition – Nebula Click Frenzy

**Live URL:** https://d2a2updreiq2f2.cloudfront.net

A simple, secure, browser-based click game built for the Cloud & DevOps Capstone Project 1.

## Features
- 15-second frantic orb-clicking rounds
- Real-time score, combo multiplier, and power-ups
- Beautiful particle explosions and neon animations
- Local leaderboard (persists in browser)
- Fully responsive

## Architecture
![Architecture Diagram](architecture.png)

Built with:
- Amazon S3 (Static Website Hosting)
- Amazon CloudFront (HTTPS + Global CDN)
- Amazon CloudWatch (Monitoring)

## How to Play
1. Open the live URL
2. Click **START 15-SECOND RUN**
3. Click glowing orbs as fast as possible
4. Submit your score at the end

## Testing Evidence
- Game works end-to-end
- HTTPS secured
- CloudWatch metrics captured

## Testing Screenshots

![Game with HTTPS](screenshots/screenshot-1-https-padlock.png)
![Gameplay - Orb explosions](screenshots/screenshot-2-game-playing.png)
![Leaderboard after submit](screenshots/screenshot-3-leaderboard.png)
![CloudFront Monitoring](screenshots/screenshot-4-cloudfront-monitoring.png)
![CloudFront Origin Settings](screenshots/screenshot-5-cloudfront-origin.png)
**Submitted as part of Cloud & DevOps Capstone Project 1**
