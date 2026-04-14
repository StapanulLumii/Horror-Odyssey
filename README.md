# Horror Odyssey

Un joc de aventură text horror-detectiv, în limba română.

## Joacă

**→ [https://stapanullumii.github.io/Horror-Odyssey/](https://stapanullumii.github.io/Horror-Odyssey/)**

## Despre

Detectivul este chemat într-un sat izolat din Moldova, Bucovăț, pentru a rezolva un caz de dispariție vechi de douăzeci de ani. Alegerile tale determină deznodământul — 5 finaluri posibile.

### Mecanici

- Creare de personaj: nume, vârstă, gen, rasă, îmbrăcăminte
- 4 statistici: **Sănătate**, **Sanitate**, **Percepție**, **Curaj**
- Alegeri condiționate de statistici (unele opțiuni se deblochează la praguri de percepție/curaj)
- Moarte automată la sănătate 0, nebunie la sanitate 0
- Ambianță dinamică: efecte vizuale (ploaie, ceață, lumânare, sânge, corbi, gol) și audio sintetizat per atmosferă

## Rulare locală

```bash
npm install
npm run dev
```

## Stack

React · TypeScript · Vite · Web Audio API · Google Fonts (Creepster, Nosifer, Special Elite)

## Deploy

Publicat automat pe GitHub Pages la fiecare push pe `main` prin workflow-ul din `.github/workflows/deploy.yml`.
