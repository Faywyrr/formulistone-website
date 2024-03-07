const URL = "https://login.univ-cotedazur.fr/login";
const VALUE_REGEX = `<input type="hidden" name="execution" value="([^"]*)"/>`;
const DATA_REGEX =
  /<tr class="mdc-data-table__row">\s*?<td class="mdc-data-table__cell"><code><kbd>(.*?)<\/kbd><\/code><\/td>\s*?<td class="mdc-data-table__cell">\s*?<code><kbd>(.*?)<\/kbd><\/code>\s*?<\/td>\s*?<\/tr>/g;

export function loginEnt(username: string, password: string) {
  return getExecution().then((execution) => {
    if (!execution) return null;

    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
        _eventId: "submit",
        execution,
      }),
    }).then(async (res) => {
      const html = await res.text();

      let match;
      const data = {} as Record<string, string>;

      while ((match = DATA_REGEX.exec(html)) !== null) {
        if (match[2].startsWith("[") && match[2].endsWith("]"))
          match[2] = match[2].slice(1, -1);

        data[match[1] as string] = match[2];
      }

      if (res.status !== 200) return null;

      return data;
    });
  });
}

export function getExecution() {
  return fetch(URL)
    .then((res) => res.text())
    .then((html) => {
      const match = html.match(VALUE_REGEX);
      if (match) return match[1];

      return null;
    });
}
