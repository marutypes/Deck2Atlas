const STARTS_WITH_NUMBER = /^(\d+)/;
const STRIP_STUFF = /\[.*\]/;
const COMMANDER = /!\s?Commander$/;

export function parseDecklist(list: string): [string[], string[]] {
    const parsedDecklist = [];
    const parsedCommanders = [];
    const lines = list
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => !line.startsWith("//"))
      .filter((line) => line.length > 0);
  
    for (const line of lines) {
      const match = STARTS_WITH_NUMBER.exec(line);
      if (match) {
        const number = parseInt(match[0]);
        const [_num, ...rest] = line.split(" ");
        const restOfLine = rest.join(" ");
        for (let i = 0; i < number; i++) {
          if (line.match(COMMANDER)) {
            parsedCommanders.push(restOfLine.replace(COMMANDER, "").trim());
          } else {
            parsedDecklist.push(restOfLine);
          }
        }
      } else if (line.match(COMMANDER)) {
        parsedCommanders.push(line.replace(COMMANDER, "").trim());
      } else {
        parsedDecklist.push(line);
      }
    }

    return [parsedDecklist, parsedCommanders];
  }
  