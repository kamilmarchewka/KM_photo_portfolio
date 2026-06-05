export function generateGalleryRows(photos: string[]): any[] {
  const rows: any[] = [];
  const queue = [...photos];

  // Prefixy: --h dla poziomych, wszystko inne (w tym --v) traktujemy jako pion
  const isHorizontal = (photoUrl: string | undefined): boolean => {
    if (!photoUrl) return false;
    return photoUrl.includes("--h");
  };

  while (queue.length > 0) {
    const p0 = queue[0];
    const p1 = queue[1];
    const p2 = queue[2];

    const h0 = isHorizontal(p0);
    const h1 = isHorizontal(p1);
    const h2 = isHorizontal(p2);

    // 1. UKŁAD: DWA POZIOME [H, H]
    if (queue.length >= 2 && h0 && h1) {
      rows.push({ type: "two-horizontal", photos: queue.splice(0, 2) });
      continue;
    }

    // 2. UKŁAD: MIKS LEWY [V, H, H]
    if (queue.length >= 3 && !h0 && h1 && h2) {
      rows.push({ type: "mixed-left", photos: queue.splice(0, 3) });
      continue;
    }

    // 3. UKŁAD: MIKS PRAWY [H, H, V]
    if (queue.length >= 3 && h0 && h1 && !h2) {
      rows.push({ type: "mixed-right", photos: queue.splice(0, 3) });
      continue;
    }

    // 4. UKŁAD: TRZY PIONOWE [V, V, V]
    if (queue.length >= 3 && !h0 && !h1 && !h2) {
      rows.push({ type: "three-vertical", photos: queue.splice(0, 3) });
      continue;
    }

    // 5. UKŁAD: PION + POZIOM [V, H]
    if (queue.length >= 2 && !h0 && h1) {
      rows.push({ type: "vertical-horizontal", photos: queue.splice(0, 2) });
      continue;
    }

    // 6. UKŁAD: POZIOM + PION [H, V]
    if (queue.length >= 2 && h0 && !h1) {
      rows.push({ type: "horizontal-vertical", photos: queue.splice(0, 2) });
      continue;
    }

    // 7. AWARYJNE DOMYKANIE OGONA
    rows.push({ type: "full-single", photos: queue.splice(0, 1) });
  }

  console.log("rows: ", rows);
  console.log("dupskoooo");

  return rows;
}
