# Zadání technického úkolu – Frontend Developer

Vytvořit jednoduchou SPA aplikaci, která zobrazí seznam uživatelů z veřejného API a umožní zobrazit detail jako dialog nebo podstránku. Použít React + Redux Toolkit + TypeScript (ideálně) + MUI. Stylování stačí základní stylování z MUI, design hodnotíme druhotně.

## Specifikace

- Routování přes React Router (pokud použijete detail stránku)
- Data načítat pomocí fetch
- Kód strukturovaný ve složkách (pokud umíte nějakou konvenci, chceme ji vidět)

## API Endpoint

Zdrojem dat bude JSON API endpoint:
```
https://jsonplaceholder.typicode.com/users
```

## Požadované funkce

1. **Načtěte seznam uživatelů** a zobrazte jej v MUI tabulce '@mui/x-data-grid';
2. **Po kliknutí na položku** zobrazte detail uživatele v dialogu (nebo na nové stránce)
3. **Zobrazte několik atributů** v editovatelné formě (pomocí TextField komponenty MUI)
4. **Po kliknutí na tlačítko SAVE** nevykonávejte žádné API volání. **Vypište do console** JSON body, který by se odeslal na reálné API
5. **CANCEL nebo ZPĚT** zavře dialog nebo přesměruje zpět na předchozí stránku

## Stavová logika

- Použít Redux Toolkit slice pro seznam i vybraný detail
- Přidat loading a error stavy

## Odevzdání

- Odevzdejte jako ZIP archiv projektu včetně .git složky
- Sledujeme strukturu a styl commit zpráv. Použijte klidně konvenci

## Dodatečné informace

Pokud byste chtěli v projektu ukázat i něco navíc, necháváme to čistě na Vašem uvážení. Hlavním cílem je pochopit, jak přemýšlíte nad strukturou, prací se stavem a základní interakcí s API.

**⏰ Časový rámec:** Nepřesahujte rozsah práce přes 2-4 hodiny

## Použití AI

Je nám jasné, že k vypracování budete používat AI, a to je naprosto v pořádku – dokonce bychom vám doporučili použít Claude AI, který tento task zvládne na 1–2 prompty. Přesto vás chceme motivovat k tomu, aby bylo vidět, že jste výsledný kód ručně doladili a zadání pro AI bylo korigováno vaší zkušeností. 

**Co nás zajímá:**
- Jak jste strukturovali složky a proč
- Jaké Redux pattern jste zvolili a proč  
- Jak řešíte error handling a loading stavy
- Proč jste zvolili dialog vs. routing pro detail

Na osobním pohovoru se budeme ptát na proces vašeho rozhodování, ne na to, co vygenerovalo AI. Zajímá nás **proč**, ne **co**. AI dělá tu nudnou část, ale architekturu a čistotu pořád orchestrujete vy.

**Tip:** Pokud máte čas, stručný komentář proč jste zvolili daný pattern oceníme.

## Spuštění projektu

```bash
npm install
npm start
```

## Technologie v projektu

- React 18
- Redux Toolkit
- TypeScript
- Material-UI (MUI)
- React Router
- Webpack

---

**Poznámka:** Komponentu `TaskAssignment` v `src/layout/components/TaskAssignment.tsx` smažte a nahraďte svým řešením! 