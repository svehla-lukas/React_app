import { Box, IconButton, List, ListItem, Link as MuiLink, Paper, Typography } from '@mui/material'

import GitHubIcon from '@mui/icons-material/GitHub'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const PCF8591 = () => {
  const commonSyntaxStyle = {
    tabSize: 2,
    whiteSpace: 'pre-wrap',
  }
  const codeInitLibrary = `#include "I2C_PCF8591.h"

        void setup() {
             I2C_PCF8591_init(0, 0, 3.3);
        }`
  const codeRead = `uint8_t adcValue = I2C_PCF8591_read_raw_analog_ch(0);
float voltage = I2C_PCF8591_read_analog_ch(0);`

  const codeWrite = `uint8_t *adcValue = 128;
I2C_PCF8591_write_ain_raw(adcValue);

float *setVoltage = 1.2;
I2C_PCF8591_write_ain(setVoltage);`

  const codeExample = `#include "main.h"
#include "I2C_PCF8591.h"

I2C_HandleTypeDef hi2c1;

int main(void) {
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_I2C1_Init();

    PCF8591_Init(&hi2c1, 0x48);

    while (1) {
        uint8_t adcValue = PCF8591_Read(0); // Čtení z kanálu 0
        PCF8591_Write(adcValue); // Nastavení DAC na stejnou hodnotu
        HAL_Delay(100);
    }
}`
  return (
    <Box>
      <Typography variant='h1'>Knihovna PCF8591 pro STM32 </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
        <IconButton
          onClick={() => window.open('https://github.com/svehla-lukas', '_blank')}
          sx={{
            display: 'flex',
            color: 'black',
          }}
        >
          <GitHubIcon />
        </IconButton>
        <MuiLink
          href='https://github.com/svehla-lukas/PCF8591_stm32'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>GitHub: github.com/svehla-lukas/Cure_Station</Typography>
        </MuiLink>
      </Box>
      <Box
        component={'img'}
        src='embedded/PCB_Board_PCF_8591_T.jpg'
        alt='img PCB board'
        sx={{
          width: { xs: '100%', sm: '300px' },
          height: 'auto',
        }}
      />
      <Paper>
        <Typography variant='h2'>Úvod</Typography>
        <Typography variant='body1'>
          Knihovna PCF8591 byla vytvořena pro ovládání analogově-digitálního převodníku (ADC)
          PCF8591 pomocí mikrokontrolérů STM32. ADC PCF8591 poskytuje 4 analogové vstupy a jeden
          analogový výstup, což je vhodné pro aplikace vyžadující jednoduché měření nebo generování
          analogových signálů. Knihovna byla navržena s důrazem na modularitu a snadnou integraci do
          existujících projektů STM32. Komunikuje s PCF8591 přes I2C sběrnici a poskytuje jednoduché
          API pro čtení a zápis hodnot.
        </Typography>
        <Typography variant='h3'>Klíčové vlastnosti:</Typography>
        <List>
          <ListItem>- Podpora I2C: Připojení k PCF8591 pomocí sběrnice I2C.</ListItem>

          <ListItem>
            - Snadné API: Funkce pro inicializaci, čtení analogových hodnot a generování analogových
            výstupů.
          </ListItem>

          <ListItem>
            - Flexibilita: Možnost nastavení konfigurace kanálů a základních parametrů.
          </ListItem>

          <ListItem>- Výkonnost: Efektivní řízení přístupu k I2C zařízením.</ListItem>
        </List>
      </Paper>
      <Paper>
        <Typography variant='h2'>Použití knihovny</Typography>
        <List>
          <Paper>
            <ListItem>
              1. Inicializace: Nejprve je třeba zavolat funkci PCF8591_Init, která inicializuje
              komunikaci přes I2C.
            </ListItem>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeInitLibrary}
            </SyntaxHighlighter>
            <List>
              <ListItem>
                - enableAnalogOutput: Nastavte na 1 pro povolení výstupu DAC, 0 pro deaktivaci.
              </ListItem>
              <ListItem>
                - inputMode: Konfigurace vstupního režimu (např. jednostranný nebo diferenciální).
              </ListItem>
              <ListItem>
                - referenceVoltage: Referenční napětí pro převody ADC. Při úspěchu vrací: HAL_OK,
                jinak chybový stav.
              </ListItem>
            </List>
          </Paper>
          <Paper>
            <ListItem>2. Čtení hodnot ADC z konkrétního kanálu lze použít funkci.</ListItem>
            <ListItem>Pozor funkce vrací ukazatele na adresu kde je hodnota uložená!</ListItem>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeRead}
            </SyntaxHighlighter>
          </Paper>
          <Paper>
            <ListItem>
              3. Nastavení DAC pro vygenerování analogové hodnoty pomocí DAC lze použít funkci.
            </ListItem>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeWrite}
            </SyntaxHighlighter>
          </Paper>
        </List>
      </Paper>
      <Paper>
        <Typography variant='h1'>Příklad implementace</Typography>
        <SyntaxHighlighter
          language='c'
          style={darcula}
          customStyle={commonSyntaxStyle}
          showLineNumbers
        >
          {codeExample}
        </SyntaxHighlighter>
      </Paper>
    </Box>
  )
}

export default PCF8591
