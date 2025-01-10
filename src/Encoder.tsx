import { Box, List, ListItem, Link as MuiLink, Paper, Typography } from '@mui/material'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Encoder = () => {
  const commonSyntaxStyle = {
    tabSize: 2,
    whiteSpace: 'pre-wrap',
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h1'>Encoder with GPIO</Typography>
        <Box
          component='img'
          src='embedded/encoderPhoto.png'
          alt='img encoder CCW'
          sx={{
            width: { xs: '100%', sm: '300px' },
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Paper>
        <Typography variant='body1'>
          Pro použití levného enkodéru mi knihovna HAL nikdy nefungovala správně. Hlavním problémem
          bylo, že každé otočení nebylo správně detekováno. Našel jsem způsob, jak to vyřešit pomocí
          GPIO a externích přerušení. Tento přístup je nejen přehledný, ale především funkční a
          nevyžaduje debouce.
        </Typography>
        <Typography variant='body1'>
          Tento kód vychází z práce Jana Summana, který zveřejnil toto video:{' '}
          <MuiLink
            variant='body1'
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.youtube.com/watch?v=i7uhvK2AL_s&t=1006s&ab_channel=jansunman'
          >
            youtube.com:
          </MuiLink>
        </Typography>
        <Typography variant='h2'>Nastavení CubeIde</Typography>
        <Typography variant='body1'>
          Ve STM32IDE jsem nakonfiguroval dva GPIO vstupy jako GPIO_EXTI s externím přerušením a
          aktivoval režim přerušení NVIC. Nyní se při změně stavu na GPIO automaticky vyvolá
          přerušení.
        </Typography>
        <Typography variant='body1'></Typography>
        <Paper variant='codeBox'>
          <SyntaxHighlighter
            language='c'
            style={darcula}
            customStyle={commonSyntaxStyle}
            showLineNumbers
          >
            {`void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
  handleEncoderInterrupt(GPIO_Pin);
}`}
          </SyntaxHighlighter>
        </Paper>
      </Paper>
      <Paper>
        <Typography variant='h1'>Identifikace směru</Typography>
        <Typography variant='body1'>
          O tom, jak funguje enkodér, si jistě můžete přečíst na Wikipedii, takže to shrnu jen
          stručně. V klidovém stavu je na výstupních pinech enkodéru (CLK - žlutá pin0, DT - modrá
          pin1) vysoká úroveň napětí. Pojďme se nyní podrobněji podívat na jeho funkci při otočení.
        </Typography>
        <Typography variant='h2'>CW = direction</Typography>
        <Typography variant='body1'>
          Na jednu otáčku encoduru se provedou 4 přechody to znamená vyvolají se 4 interupry. Každý
          interupt se vyhodnotí v codu, ale až ten čtvrtý vyvolá změnu konečný handle kterým reaguji
          na otočení encoderu.
        </Typography>
        <Box
          component='img'
          src='embedded/encoderCW.webp'
          alt='img encoder CCW'
          sx={{
            width: { xs: '100%', sm: '350px' },
            height: 'auto',
            borderRadius: '8px',
          }}
        />
        <Typography variant='body1'>
          1. hrana - vyvolá se pin1 DT (modrá) a stáhne se na GND.
          <List>
            <ListItem>řádek 3 - Ověření, od kterého pinu přišlo přerušení, nesplněno.</ListItem>
            <ListItem>řádek 15 - Kontrola hodnoty pin0 splněna.</ListItem>
            <ListItem>řádek 17 - pin0 A = True.</ListItem>
            <ListItem>řádek 18 - pin0 A != prevA (defaultně True) nesplněno.</ListItem>
            <ListItem>prevA = True; prevB = True.</ListItem>
          </List>
          2. hrana - vyvolá se pin0 CLK (žlutá) a stáhne se na GND.
          <List>
            <ListItem>řádek 3 - Kontrola hodnoty pinu 1 splněna.</ListItem>
            <ListItem>řádek 5 - pin1 B = False.</ListItem>
            <ListItem>řádek 6 - hodnota (pin1 B = False) != (prevB = True) splněna.</ListItem>
            <ListItem>řádek 7 - hodnota (pin1 B = False) == True nesplněna.</ListItem>
            <ListItem>řádek 12 - Přepisuje se hodnota prevB = False.</ListItem>
            <ListItem>prevA = True; prevB = False.</ListItem>
          </List>
          3. hrana - vyvolá se pin1 DT (modrá) zpět na 5V.
          <List>
            <ListItem>řádek 15 - Kontrola hodnoty pin0 splněna.</ListItem>
            <ListItem>řádek 17 - pin0 A = False.</ListItem>
            <ListItem>řádek 18 - (pin0 A = False) != (prevA = True) splněna.</ListItem>
            <ListItem>řádek 19 - (pin0 A = False) == True nesplněna.</ListItem>
            <ListItem>řádek 24 - Přepisuje se hodnota prevA = False.</ListItem>
            <ListItem>prevA = False; prevB = False.</ListItem>
          </List>
          4. hrana - vyvolá se pin0 CLK (žlutá) zpět na 5V.
          <List>
            <ListItem>řádek 3 - Ověření pinu přerušení splněno.</ListItem>
            <ListItem>řádek 5 - pin1 B = True.</ListItem>
            <ListItem>řádek 6 - hodnota (pin1 B = True) != (prevB = False) splněna.</ListItem>
            <ListItem>řádek 7 - hodnota (pin1 B = True) == True splněna.</ListItem>
            <ListItem>řádek 8 - hodnota (pin0 A = True) == True splněna.</ListItem>
            <ListItem>řádek 9 - Vyvolá se encoder callback.</ListItem>
            <ListItem>řádek 12 - Přepisuje se hodnota prevB = True.</ListItem>
            <ListItem>prevA = False; prevB = True.</ListItem>
          </List>
        </Typography>
      </Paper>
      <Paper>
        <Typography variant='h2'>CCW = direction</Typography>
        <Box
          component='img'
          src='embedded/encoderCCW.webp'
          alt='img encoder CW'
          sx={{
            width: { xs: '100%', sm: '500px' },
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Paper>

      <Paper>
        <Typography variant='h1'>Komplení kód</Typography>
        <Paper variant='codeBox'>
          <SyntaxHighlighter
            language='c'
            style={darcula}
            customStyle={commonSyntaxStyle}
            showLineNumbers
          >
            {codeSnippet}
          </SyntaxHighlighter>
        </Paper>
      </Paper>
    </Box>
  )
}

const codeSnippet = `void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin) {
  static GPIO_PinState A, B, prevA = GPIO_PIN_SET, prevB = GPIO_PIN_SET;
  if (GPIO_Pin == GPIO_PIN_0) {
    // CW decoder
    B = HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_1);
    if (B != prevB) {
      if (B == GPIO_PIN_SET) {
        if (A == GPIO_PIN_RESET) {
          encoderCallback(MENU_LEFT);
        }
      }
      prevB = B;
    }
  }
  if (GPIO_Pin == GPIO_PIN_1) {
    // CCW decoder
    A = HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0);
    if (A != prevA) {
      if (A == GPIO_PIN_SET) {
        if (B == GPIO_PIN_RESET) {
          encoderCallback(MENU_RIGHT);
        }
      }
      prevA = A;
    }
  }

}`
export default Encoder
