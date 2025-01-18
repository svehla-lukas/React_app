import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const commonSyntaxStyle = {
  backgroundColor: '#2d2d2d',
  borderRadius: '4px',
  fontSize: '14px',
}

const article = {
  title: 'Dynamická alokace paměti v C: malloc, calloc a free',
  content: `V programovacím jazyce C umožňuje dynamická alokace paměti přidělovat paměť během běhu programu, což poskytuje větší flexibilitu oproti statické alokaci paměti. Hlavní funkce používané pro dynamickou alokaci paměti jsou malloc, calloc a free.`,
  sections: [
    {
      heading: '1. malloc()',
      content: `Funkce \`malloc()\` alokuje blok paměti o zadané velikosti. Paměť není inicializována a může obsahovat náhodné hodnoty.

**Syntaxe:**
\`void *malloc(size_t size);\`

**Příklad:**`,
      code: `#include <stdlib.h>
#include <stdio.h>

int main() {
    int *array = (int *)malloc(5 * sizeof(int));
    if (!array) {
        printf("Alokace paměti selhala$\\n");
        return 1;
    }

    for (int i = 0; i < 5; i++) {
        array[i] = i * i;
        printf("%d\\n", array[i]);
    }

    free(array); // Uvolnění alokované paměti
    return 0;
}`,
    },
    {
      heading: '2. calloc()',
      content: `Funkce \`calloc()\` alokuje blok paměti a inicializuje všechny bajty na nulu. Je užitečná, když potřebujete paměť inicializovanou nulou.

**Syntaxe:**
\`void *calloc(size_t num, size_t size);\`

**Příklad:**`,
      code: `#include <stdlib.h>
#include <stdio.h>

int main() {
    int *array = (int *)calloc(5, sizeof(int));
    if (!array) {
        printf("Alokace paměti selhala\\n");
        return 1;
    }

    for (int i = 0; i < 5; i++) {
        printf("%d\\n", array[i]);
    }

    free(array); // Uvolnění alokované paměti
    return 0;
}`,
    },
    {
      heading: '3. free()',
      content: `Funkce \`free()\` uvolňuje paměť dříve alokovanou funkcí \`malloc()\` nebo \`calloc()\`. Pokud paměť neuvolníte, může dojít k únikům paměti.

**Syntaxe:**
\`void free(void *ptr);\`

**Příklad:**`,
      code: `#include <stdlib.h>

int main() {
    int *array = (int *)malloc(5 * sizeof(int));
    if (!array) return 1;

    free(array); // Uvolnění alokované paměti
    return 0;
}`,
    },
    {
      heading: 'Výhody dynamické alokace paměti',
      content: `1. **Flexibilita:** Paměť lze alokovat na základě požadavků během běhu programu.
2. **Efektivní využití paměti:** Alokuje se pouze potřebná paměť, čímž se zabrání plýtvání.
3. **Dynamické struktury:** Umožňuje vytvářet dynamické datové struktury, jako jsou spojové seznamy a stromy.`,
    },
    {
      heading: 'Omezení statické alokace paměti',
      content: `1. **Pevná velikost:** Vyžaduje, aby velikost paměti byla známá při kompilaci.
2. **Plýtvání pamětí:** Nadměrná alokace vede k plýtvání pamětí, zatímco nedostatečná alokace může vést k nedostatku paměti pro úlohu.
3. **Žádná realokace:** Statická paměť nemůže během běhu programu růst ani se zmenšovat.`,
    },
  ],
}

const CodeSnippetMemoryAllocate = () => {
  return (
    <Box component={Paper} sx={{ padding: 2, margin: 2 }}>
      <Typography variant='h1' gutterBottom>
        {article.title}
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 2 }}>
        {article.content}
      </Typography>
      {article.sections.map((section, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant='h4' gutterBottom>
            {section.heading}
          </Typography>
          <Typography variant='body1' sx={{ whiteSpace: 'pre-line', marginBottom: 2 }}>
            {section.content}
          </Typography>
          {section.code && (
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {section.code}
            </SyntaxHighlighter>
          )}
        </Box>
      ))}
    </Box>
  )
}

const CodeSnippetCubeIdeCheatSheet = () => {
  const [markdown, setMarkdown] = useState<string>('')

  useEffect(() => {
    fetch('/React_app/codeSnippet/cubeIdeCheatSheet.md')
      .then(response => response.text())
      .then(text => setMarkdown(text))
      .catch(error => console.error('Failed to load Markdown:', error))
  }, [])
  return (
    <Box>
      <Paper>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Paper>
      <Typography variant='overline'>Tento obsah je exportov8n z .md</Typography>
    </Box>
  )
}

export { CodeSnippetCubeIdeCheatSheet, CodeSnippetMemoryAllocate }
