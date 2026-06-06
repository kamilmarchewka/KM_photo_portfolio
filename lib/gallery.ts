export function generateGalleryRows(photos: string[]): any[] {
  let rows: any[] = [];
  const queue = [...photos];

  // Prefixy: --h dla poziomych, wszystko inne (w tym --v) traktujemy jako pion
  const isHorizontal = (photoUrl: string | undefined): boolean => {
    if (!photoUrl) return false;
    return photoUrl.includes("--h");
  };

  // --- KROK 1: Główny podział ---
  while (queue.length > 0) {
    const p0 = queue[0];
    const p1 = queue[1];
    const p2 = queue[2];

    const h0 = isHorizontal(p0);
    const h1 = isHorizontal(p1);
    const h2 = isHorizontal(p2);

    if (queue.length >= 2 && h0 && h1) {
      rows.push({ type: "two-horizontal", photos: queue.splice(0, 2) });
      continue;
    }
    if (queue.length >= 3 && !h0 && h1 && h2) {
      rows.push({ type: "mixed-left", photos: queue.splice(0, 3) });
      continue;
    }
    if (queue.length >= 3 && h0 && h1 && !h2) {
      rows.push({ type: "mixed-right", photos: queue.splice(0, 3) });
      continue;
    }
    if (queue.length >= 3 && !h0 && !h1 && !h2) {
      rows.push({ type: "three-vertical", photos: queue.splice(0, 3) });
      continue;
    }
    if (queue.length >= 2 && !h0 && !h1) {
      rows.push({ type: "two-vertical", photos: queue.splice(0, 2) });
      continue;
    }
    if (queue.length >= 2 && !h0 && h1) {
      rows.push({ type: "vertical-horizontal", photos: queue.splice(0, 2) });
      continue;
    }
    if (queue.length >= 2 && h0 && !h1) {
      rows.push({ type: "horizontal-vertical", photos: queue.splice(0, 2) });
      continue;
    }

    rows.push({ type: "full-single", photos: queue.splice(0, 1) });
  }

  // --- KROK 2: POSTPROCESSING (Tylko usuwanie pojedynczego pionowego) ---
  const singleIdx = rows.findIndex((r) => r.type === "full-single");

  if (singleIdx !== -1) {
    const singleRow = rows[singleIdx];
    const singlePhoto = singleRow.photos[0];

    // Sprawdzamy, czy to pojedyncze zdjęcie jest pionowe
    if (!isHorizontal(singlePhoto)) {
      // Szukamy układu trzech pionowych [V, V, V]
      const threeVertIdx = rows.findIndex((r) => r.type === "three-vertical");

      if (threeVertIdx !== -1) {
        const targetRow = rows[threeVertIdx];
        const stolenPhoto = targetRow.photos.pop(); // Zabieramy jedno z trzech zdjęć
        targetRow.type = "two-vertical"; // Zmieniamy [V, V, V] na [V, V]

        // Zamieniamy dotychczasowy samotny wiersz na [V, V]
        singleRow.type = "two-vertical";
        singleRow.photos = [stolenPhoto, singlePhoto];
      }
    }
  }

  console.log("rows: ", rows);
  console.log("dupskoooo");

  return rows;
}
