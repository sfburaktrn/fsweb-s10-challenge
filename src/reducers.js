import { NOT_EKLE, NOT_SIL, INITIAL_LOAD } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(data) {
  localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export function reducer(state = baslangicDegerleri, action) {
  switch (action.type) {
    case INITIAL_LOAD:
      return {
        ...state,
        notlar: baslangicNotlariniGetir(s10chLocalStorageKey).notlar,
      };
    case NOT_EKLE:
      let newNote = action.payload;
      let copyNotes = [...state.notlar];
      let resultNotesArray = [...copyNotes, newNote];
      let gelenS = {
        ...state,
        notlar: [...resultNotesArray],
      };
      localStorageStateYaz(gelenS);

      return gelenS;

    case NOT_SIL:
      let selectedNote = action.payload;
      let copyNotes2 = [...state.notlar];
      let resultNotesArray2 = copyNotes2.filter(
        (note) => note.id !== selectedNote
      );
      let gelenS2 = {
        ...state,
        notlar: resultNotesArray2,
      };
      localStorageStateYaz(gelenS2);

      return gelenS2;

    default:
      return state;
  }
}
