// identify if class is missing

export function missingClass(string?: string, prefix?: string): boolean {
  if (string === undefined) {
    return true;
  }
  // class missing

  const regex = prefix !== undefined ? new RegExp(` ?${prefix}`, "g") : "";
  // true when prefix is missing
  return string.match(regex) === null;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  const res = hex.length === 1 ? "0" + hex : hex;
  return res;
}

export function rgbToHex(rgb: string): string {
  const rgbArr = rgb.split(" ");

  function getHexArr(rgbArr: string[]): string[] {
    const hexArr = [];
    for (const key of rgbArr) {
      hexArr.push(componentToHex(Number(key)));
    }
    return hexArr;
  }

  const hexArr = getHexArr(rgbArr);
  const res = "#" + hexArr.join("");
  return res;
}
export function getCSSVariable(key: string): string {
  const property = getComputedStyle(document.documentElement).getPropertyValue(
    key
  );

  return property;
}

export function capitaliseFirstLetter(str: string): string {
  const arr = str.split(" ");

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
}
