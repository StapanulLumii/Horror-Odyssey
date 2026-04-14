import type { Story } from "../engine";
import { defaultEndingNodes } from "../engine";

export const mainStory: Story = {
  startSceneId: "office_night",
  nodes: {
    ...defaultEndingNodes,

    office_night: {
      type: "scene",
      id: "office_night",
      mood: "rain",
      text:
        "Ploaia bate în geamul biroului. Un plic murdar, fără timbru, așteaptă pe masă. Înăuntru: o fotografie veche cu o fetiță zâmbind lângă un dulap negru. Pe spate, scris cu cerneală roșie: 'Bucovăț. Vino. Deja știe.'",
      choices: [
        {
          id: "read_now",
          text: "Studiezi fiecare detaliu al fotografiei.",
          effects: { perception: 8, sanity: -4 },
          next: "photo_detail",
        },
        {
          id: "whiskey",
          text: "Torni un pahar și amâni.",
          effects: { courage: -5, sanity: 3 },
          next: "delayed_start",
        },
        {
          id: "call_chief",
          text: "Suni la sediu să verifici cazul.",
          effects: { perception: 3 },
          next: "chief_call",
        },
      ],
    },

    photo_detail: {
      type: "scene",
      id: "photo_detail",
      mood: "candle",
      text:
        "În ușa dulapului, abia vizibil, conturul unei mâini de adult ce apasă de dinăuntru. Fetița zâmbește, dar ochii par să privească ceva din spatele tău.",
      choices: [
        {
          id: "leave_now",
          text: "Pleci spre Bucovăț înainte de zori.",
          effects: { courage: 4 },
          next: "drive",
        },
      ],
    },

    delayed_start: {
      type: "scene",
      id: "delayed_start",
      mood: "fog",
      text:
        "Te trezești pe birou la opt dimineața. Plicul e desfăcut. Nu-ți amintești să-l fi deschis.",
      choices: [
        {
          id: "go",
          text: "Iei mașina și pleci.",
          effects: { sanity: -3 },
          next: "drive",
        },
      ],
    },

    chief_call: {
      type: "scene",
      id: "chief_call",
      text:
        "Sergentul de serviciu tace prea mult. 'Bucovăț? Nu mai avem post acolo de șase ani. Ultima patrulă... n-a mai raportat.' Apoi închide brusc.",
      choices: [
        {
          id: "go_anyway",
          text: "Pleci oricum.",
          effects: { courage: 6, perception: 2 },
          next: "drive",
        },
        {
          id: "hesitate",
          text: "Eziți. Te întorci la fotografie.",
          next: "photo_detail",
        },
      ],
    },

    drive: {
      type: "scene",
      id: "drive",
      mood: "fog",
      text:
        "Drumul către Bucovăț urcă printr-o pădure deasă. Radio-ul se transformă în static. Felinarele mașinii luminează ceva alb printre copaci — prea înalt să fie un cerb.",
      choices: [
        {
          id: "keep_driving",
          text: "Apeși pe accelerație, fără să privești.",
          effects: { courage: -3 },
          next: "village_entry",
        },
        {
          id: "stop_look",
          text: "Oprești și te uiți atent.",
          requires: { courage: 30 },
          effects: { perception: 8, sanity: -10 },
          next: "forest_figure",
        },
      ],
    },

    forest_figure: {
      type: "scene",
      id: "forest_figure",
      mood: "void",
      text:
        "Figura nu are față. Doar un costum de mireasă pătat de pământ. Stă perfect nemișcată. Când clipești, e cu trei metri mai aproape.",
      choices: [
        {
          id: "run",
          text: "Urci în mașină și fugi.",
          effects: { courage: -5 },
          next: "village_entry",
        },
        {
          id: "speak",
          text: "O întrebi ce vrea.",
          requires: { courage: 55 },
          effects: { sanity: -15, perception: 12 },
          next: "bride_whisper",
        },
      ],
    },

    bride_whisper: {
      type: "scene",
      id: "bride_whisper",
      mood: "void",
      text:
        "'El i-a luat rochia mea,' șoptește vocea fără gură. 'Dacă deschizi dulapul, o să-l găsești purtând-o.' Apoi dispare. Ai un fir lung de păr negru între degete.",
      choices: [
        {
          id: "drive_on",
          text: "Pui firul în buzunar și pleci mai departe.",
          next: "village_entry",
        },
      ],
    },

    village_entry: {
      type: "scene",
      id: "village_entry",
      mood: "fog",
      text:
        "Bucovăț — două zeci de case, o biserică, o primărie. Nicio lumină. Un singur om te așteaptă în piață: preotul, într-o rasă uzată. În spatele lui, primarul, palid, cu mâinile tremurând.",
      choices: [
        {
          id: "talk_priest",
          text: "Te apropii de preot.",
          next: "priest_path",
        },
        {
          id: "talk_mayor",
          text: "Îl abordezi pe primar.",
          next: "mayor_path",
        },
        {
          id: "go_house",
          text: "Îi ignori și întrebi de casa din fotografie.",
          effects: { courage: 5, sanity: -4 },
          next: "house_arrival",
        },
      ],
    },

    priest_path: {
      type: "scene",
      id: "priest_path",
      mood: "candle",
      text:
        "Preotul zâmbește obosit. 'Părinte Iftode. Te așteptam. Dumnealui' — arată spre primar — 'n-a vrut să te chemăm. A venit fata în visele noastre iarăși, acum trei nopți.' Îți întinde o cheie grea, de fier.",
      choices: [
        {
          id: "take_key",
          text: "Iei cheia și îi ceri să explice.",
          effects: { perception: 6 },
          next: "priest_confession",
        },
        {
          id: "refuse_key",
          text: "Refuzi cheia. 'Mai întâi, adevărul.'",
          effects: { courage: 5 },
          next: "priest_confession",
        },
      ],
    },

    priest_confession: {
      type: "scene",
      id: "priest_confession",
      mood: "candle",
      text:
        "'Acum două decenii, un om a adus aici ritualul. Fetița Anica a fost prima. Casa e închisă de atunci, dar auzim uneori cineva umblând înăuntru. Poate nu e Dumnezeu cel care a răspuns.' Îi tremură bărbia.",
      choices: [
        {
          id: "ask_name",
          text: "'Cum se numea omul care a adus ritualul?'",
          requires: { perception: 55 },
          effects: { perception: 5 },
          next: "priest_name",
        },
        {
          id: "go_to_house_priest",
          text: "Pleci spre casă cu cheia.",
          next: "house_arrival",
        },
      ],
    },

    priest_name: {
      type: "scene",
      id: "priest_name",
      mood: "candle",
      text:
        "Preotul se cutremură. 'Omul... eram eu. Atunci eram tânăr și nebun. Dacă-l oprești, poate Dumnezeu mă iartă.' Îți dă și un crucifix de lemn, uzat.",
      choices: [
        {
          id: "take_cross",
          text: "Iei crucifixul și pleci spre casă.",
          effects: { courage: 10, sanity: 5 },
          next: "house_arrival",
        },
      ],
    },

    mayor_path: {
      type: "scene",
      id: "mayor_path",
      mood: "fog",
      text:
        "Primarul te prinde de rever. 'Nu-l asculta pe preot. El a început totul. E în arhivă — am copii. Vino.' Te trage spre primărie.",
      choices: [
        {
          id: "go_archive",
          text: "Îl urmezi în arhivă.",
          effects: { perception: 4 },
          next: "archive",
        },
        {
          id: "refuse_mayor",
          text: "Îl dai la o parte și mergi spre casă.",
          effects: { courage: 5 },
          next: "house_arrival",
        },
      ],
    },

    archive: {
      type: "scene",
      id: "archive",
      mood: "candle",
      text:
        "Un dosar ud de mucegai: fotografii cu ritualul, fiecare cu un chip înconjurat. Preotul tânăr, zâmbind. Primarul, copil, în prim-plan — ținând cuțitul.",
      choices: [
        {
          id: "confront_mayor",
          text: "'Tu ai fost copilul cu cuțitul.'",
          requires: { perception: 50 },
          effects: { perception: 6, sanity: -5 },
          next: "mayor_confession",
        },
        {
          id: "take_photos",
          text: "Iei dosarul și pleci spre casă.",
          effects: { perception: 5 },
          next: "house_arrival",
        },
      ],
    },

    mayor_confession: {
      type: "scene",
      id: "mayor_confession",
      mood: "void",
      text:
        "'Eram un copil. M-a pus să o țin.' Primarul plânge. 'De atunci trăiesc cu ea în oglindă. Te rog, dacă intri în casă, nu deschide dulapul fără să spui numele corect.' Îți dă un bilețel cu un nume: ANICA GHERMAN.",
      choices: [
        {
          id: "take_name",
          text: "Iei bilețelul și mergi la casă.",
          effects: { perception: 10 },
          next: "house_arrival",
        },
      ],
    },

    house_arrival: {
      type: "scene",
      id: "house_arrival",
      mood: "fog",
      text:
        "Casa stă la marginea pădurii, înconjurată de iarbă uscată. Ușa de la intrare e întredeschisă, deși primarul ți-a spus că n-a mai intrat nimeni de 20 de ani. Se aude un scârțâit ritmic înăuntru.",
      choices: [
        {
          id: "enter_door",
          text: "Împingi ușa și intri.",
          effects: { courage: -3 },
          next: "house_foyer",
        },
        {
          id: "circle_house",
          text: "Ocolești casa, căutând o intrare alternativă.",
          requires: { perception: 45 },
          effects: { perception: 8 },
          next: "cellar_window",
        },
      ],
    },

    cellar_window: {
      type: "scene",
      id: "cellar_window",
      mood: "fog",
      text:
        "La spate, un geam de pivniță spart. Din interior miroase a fier și a ceva dulce. Poți coborî direct la subsol.",
      choices: [
        {
          id: "climb_in",
          text: "Intri prin geam.",
          effects: { courage: 4 },
          next: "basement",
        },
        {
          id: "go_front",
          text: "Te întorci și intri pe ușă.",
          next: "house_foyer",
        },
      ],
    },

    house_foyer: {
      type: "scene",
      id: "house_foyer",
      mood: "candle",
      text:
        "Trei scări: una urcă spre pod, una coboară la pivniță, iar alta duce la o ușă încuiată pe care scrie 'BIBLIOTECĂ'. Scârțâitul vine de sus.",
      choices: [
        {
          id: "go_attic",
          text: "Urci în pod.",
          effects: { sanity: -5 },
          next: "attic",
        },
        {
          id: "go_basement",
          text: "Cobori în pivniță.",
          effects: { courage: -5 },
          next: "basement",
        },
        {
          id: "go_library",
          text: "Forțezi ușa de la bibliotecă.",
          requires: { courage: 40 },
          next: "library",
        },
      ],
    },

    attic: {
      type: "scene",
      id: "attic",
      mood: "blood",
      text:
        "Un scaun se leagănă singur. Deasupra lui, o rochie albă, pătată, atârnată de grindă. Pe podea, un cerc de sare. În mijloc, o ușă de dulap — prea mică pentru un adult.",
      choices: [
        {
          id: "open_closet",
          text: "Deschizi ușa dulapului.",
          effects: { sanity: -20 },
          next: "closet_inside",
        },
        {
          id: "break_sale",
          text: "Rupi cercul de sare cu piciorul.",
          effects: { sanity: -10, courage: 5 },
          next: "attic_released",
        },
      ],
    },

    closet_inside: {
      type: "scene",
      id: "closet_inside",
      mood: "void",
      text:
        "În dulap, o fetiță de șase ani, palidă, cu ochii închiși. Respiră. Dar umbra ei, pe peretele din spate, aparține unui bărbat adult purtând rochie.",
      choices: [
        {
          id: "speak_name",
          text: "Îi șoptești numele: 'Anica.'",
          requires: { perception: 60 },
          effects: { sanity: 10 },
          next: "anica_freed",
        },
        {
          id: "grab_girl",
          text: "O iei în brațe și fugi.",
          effects: { sanity: -15, health: -15 },
          next: "shadow_strike",
        },
      ],
    },

    attic_released: {
      type: "scene",
      id: "attic_released",
      mood: "void",
      text:
        "Aerul se răcește brusc. Rochia cade de pe grindă. Dulapul se deschide singur, gol. O pală de vânt te împinge spre scări.",
      choices: [
        {
          id: "descend",
          text: "Cobori înapoi în foyer.",
          next: "basement",
        },
      ],
    },

    shadow_strike: {
      type: "scene",
      id: "shadow_strike",
      mood: "blood",
      text:
        "Umbra rupe fetița din brațele tale ca și cum nu ai fi cântărit nimic. Cazi pe trepte. Ceva îți taie umărul — un cuțit de bucătărie, rugina veche de două decenii.",
      choices: [
        {
          id: "get_up",
          text: "Te ridici și fugi spre pivniță.",
          effects: { health: -10 },
          next: "basement",
        },
      ],
    },

    anica_freed: {
      type: "scene",
      id: "anica_freed",
      mood: "candle",
      text:
        "Fetița deschide ochii. Umbra de pe perete urlă fără sunet și se destramă. 'Mi-era sete,' spune ea. 'Douăzeci de ani.' O iei de mână. Mâna e caldă.",
      choices: [
        {
          id: "take_her_out",
          text: "O duci afară din casă.",
          effects: { sanity: 15, courage: 10 },
          next: "good_ending",
        },
        {
          id: "finish_ritual",
          text: "'Arată-mi unde e ritualul. Să-l închid pentru totdeauna.'",
          requires: { courage: 70, perception: 70 },
          next: "ritual_room",
        },
      ],
    },

    basement: {
      type: "scene",
      id: "basement",
      mood: "blood",
      text:
        "Pivnița pute a fier. Pe pereți, cuvinte scrise cu ceva întunecat: 'EA NU A FOST PRIMA.' La capăt, o ușă de lemn, zăvorâtă cu un lanț proaspăt.",
      choices: [
        {
          id: "break_chain",
          text: "Rupi lanțul cu o bară ruginită.",
          requires: { courage: 45 },
          effects: { courage: 5 },
          next: "ritual_room",
        },
        {
          id: "examine_writing",
          text: "Examinezi scrisul pe perete.",
          effects: { perception: 8, sanity: -5 },
          next: "basement_names",
        },
      ],
    },

    basement_names: {
      type: "scene",
      id: "basement_names",
      mood: "void",
      text:
        "Nu e o singură propoziție — sunt nume. Șaptesprezece, fiecare cu o dată. Anica e ultima, dar prima pe perete. Se adaugă singur un nume nou, în timp real: al tău.",
      choices: [
        {
          id: "flee",
          text: "Fugi înapoi sus.",
          effects: { sanity: -15, courage: -10 },
          next: "house_foyer",
        },
        {
          id: "break_chain2",
          text: "Îți ștergi numele cu mâneca și rupi lanțul.",
          requires: { courage: 40 },
          effects: { courage: 8, sanity: -5 },
          next: "ritual_room",
        },
      ],
    },

    library: {
      type: "scene",
      id: "library",
      mood: "candle",
      text:
        "O cameră plină de cărți mucegăite. Pe birou, un jurnal deschis, scris mai recent decât ar trebui. Ultima intrare, cu cerneală încă umedă: 'Dacă detectivul ajunge, o să fie al optsprezecelea.'",
      choices: [
        {
          id: "read_journal",
          text: "Citești jurnalul.",
          effects: { perception: 15, sanity: -10 },
          next: "library_truth",
        },
        {
          id: "burn_book",
          text: "Pui chibrit jurnalului.",
          effects: { sanity: -5, courage: 10 },
          next: "library_fire",
        },
      ],
    },

    library_truth: {
      type: "scene",
      id: "library_truth",
      mood: "void",
      text:
        "Ritualul cere 18 morți pentru a chema 'Martorul'. Fiecare victimă ține alta înăuntru — casa e un stomac. Anica le-a ținut pe toate. Dacă moare, scapă toate. Dacă trăiește, urmează a optsprezecea: tu.",
      choices: [
        {
          id: "to_ritual_informed",
          text: "Mergi în camera ritualului cu cunoașterea.",
          effects: { perception: 10 },
          next: "ritual_room",
        },
      ],
    },

    library_fire: {
      type: "scene",
      id: "library_fire",
      mood: "blood",
      text:
        "Jurnalul arde cu flacără verde. Casa geme. Tavanul se crapă. Trebuie să pleci sau să termini ce ai început.",
      choices: [
        {
          id: "ritual_burning",
          text: "Cobori spre pivniță prin fumul gros.",
          effects: { health: -10 },
          next: "ritual_room",
        },
        {
          id: "bad_flee",
          text: "Fugi afară din casă.",
          next: "bad_ending",
        },
      ],
    },

    ritual_room: {
      type: "scene",
      id: "ritual_room",
      mood: "void",
      text:
        "O cameră circulară, fără fereastră. În centru, un altar de piatră cu 17 lumânări negre aprinse. Lângă altar, figura fără față din pădure te așteaptă, purtând rochia albă.",
      choices: [
        {
          id: "destroy_altar",
          text: "Răstorni altarul.",
          requires: { courage: 55 },
          effects: { health: -15, sanity: -10 },
          next: "good_ending",
        },
        {
          id: "speak_ritual",
          text: "Rostești numele: 'Anica Gherman. Te eliberez.'",
          requires: { perception: 65 },
          effects: { sanity: -5 },
          next: "good_ending",
        },
        {
          id: "join_ritual",
          text: "Te așezi pe altar. 'Arată-mi.'",
          requires: { courage: 75, perception: 60 },
          next: "secret_ending",
        },
        {
          id: "escape_ritual",
          text: "Fugi înapoi la mașină.",
          effects: { courage: -15 },
          next: "bad_ending",
        },
      ],
    },

    good_ending: {
      type: "ending",
      id: "good_ending",
      kind: "good",
      mood: "candle",
      text:
        "Lumânările se sting una câte una. Casa se prăbușește după tine, dar Anica e afară, în iarbă. Satul respiră prima oară de două decenii. Primarul îngenunchează. Preotul plânge. Tu te întorci în oraș cu un fir de păr negru în buzunar — și cu numele tău șters de pe pereți.",
    },

    bad_ending: {
      type: "ending",
      id: "bad_ending",
      kind: "bad",
      mood: "ravens",
      text:
        "Conduci înapoi la oraș fără să privești în oglinda retrovizoare. Radio-ul spune ceva despre un copil dispărut, în alt sat. În noaptea următoare, primești un plic fără timbru pe birou. Pe spate, aceeași cerneală roșie: 'Deja știe.'",
    },

    secret_ending: {
      type: "ending",
      id: "secret_ending",
      kind: "secret",
      mood: "void",
      text:
        "Lumânările se apleacă toate spre tine. Martorul te primește ca pe al optsprezecelea. Nu mai simți frig. Nu mai simți nimic. Anica iese prin ușă, liberă, dar casa are acum un nou locatar — tu, în fiecare oglindă, pentru totdeauna. E o liniște pe care ai căutat-o fără să știi.",
    },
  },
};
