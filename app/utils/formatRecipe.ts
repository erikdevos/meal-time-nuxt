export type RecipeBlock =
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'text'; text: string };

/**
 * The recipes in meals.json lost their line breaks: every "\n" became a literal "n"
 * ("Benodigdheden:nn- Wrapsn- Bonenn- Gehaktn-..."). Only the unambiguous cases can be
 * restored safely here:
 *   - ":nn"  -> a heading followed by a blank line
 *   - "n- "  -> the start of a new list item
 * Free-text lines cannot be told apart from real "n" letters. That needs a fix in the data
 * itself; once the data contains real line breaks these replacements simply do nothing.
 */
function restoreLineBreaks(raw: string): string {
  return raw.replace(/:nn/g, ':\n\n').replace(/n(?=- )/g, '\n');
}

/** Turn a recipe string into headings, lists and paragraphs for rendering. */
export function parseRecipe(raw?: string | null): RecipeBlock[] {
  if (!raw) return [];

  const blocks: RecipeBlock[] = [];
  const lines = restoreLineBreaks(raw)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (/^#+\s*/.test(line)) {
      blocks.push({ type: 'heading', text: line.replace(/^#+\s*/, '').replace(/:$/, '') });
    } else if (line.startsWith('- ')) {
      const item = line.slice(2).trim();
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'list') {
        last.items.push(item);
      } else {
        blocks.push({ type: 'list', items: [item] });
      }
    } else if (line.endsWith(':') && line.length <= 40) {
      blocks.push({ type: 'heading', text: line.slice(0, -1) });
    } else {
      blocks.push({ type: 'text', text: line });
    }
  }

  // A heading without colon that was followed by a blank line ends up as "Ingredientenn":
  // the real word plus one leftover "n". Words almost never end in "nn", so it is safe to
  // drop one "n", but only for the line that sits directly before a list.
  blocks.forEach((block, index) => {
    const next = blocks[index + 1];
    if (block.type !== 'list' && next?.type === 'list' && block.text.endsWith('nn')) {
      block.text = block.text.slice(0, -1);
    }
  });

  return blocks;
}
