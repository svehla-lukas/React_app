import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material'

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
  const codeRead = `uint8_t *adcValue = I2C_PCF8591_read_raw_ch(0);
float *voltage = I2C_PCF8591_read_ch(0);`

  const codeWrite = `uint8_t adcValue = 128;
I2C_PCF8591_write_raw(adcValue);

float setVoltage = 1.2;
I2C_PCF8591_write(setVoltage);`

  const codeExample = `#include "main.h"
#include "I2C_PCF8591.h"

I2C_HandleTypeDef hi2c1;

int main(void) {
    HAL_Init();
    SystemClock_Config();
    MX_GPIO_Init();
    MX_I2C1_Init();
    HAL_StatusTypeDef i2cResult;
    float *voltage = NULL;

    i2cResult = I2C_PCF8591_init(0, 0, 3.3);
    if (i2cResult == HAL_OK){
        sprintf('init complete')
    } 
    while (1) {
        voltage = I2C_PCF8591_read_analog_ch(0);
        if (voltage =! NULL){
            i2cResult = I2C_PCF8591_write(*voltage);
            if (i2cResult == HAL_OK){
                sprintf('data written')
            } 
        } 
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
          <Typography variant='body1'>GitHub: github.com/svehla-lukas/PCF8591_stm32</Typography>
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
          <ListItemText>- Podpora I2C: Připojení k PCF8591 pomocí sběrnice I2C.</ListItemText>

          <ListItemText>
            - Snadné API: Funkce pro inicializaci, čtení analogových hodnot a generování analogových
            výstupů.
          </ListItemText>

          <ListItemText>
            - Flexibilita: Možnost nastavení konfigurace kanálů a základních parametrů.
          </ListItemText>
          <Box
            sx={{
              paddingTop: '16px',
            }}
          >
            <Typography variant='h2'>Popis chipu PCF8591</Typography>
            <Typography>
              PCF8591 je integrovaný obvod od společnosti NXP (dříve Philips), který kombinuje
              4kanálový 8bitový ADC (analogově-digitální převodník) a 1kanálový 8bitový DAC
              (digitálně-analogový převodník). Tento obvod komunikuje přes sběrnici I2C, což
              umožňuje snadné připojení k mikroprocesorům nebo mikrokontrolérům. Vlastnosti:
            </Typography>
            <Typography variant='body1'>
              <List>
                <ListItemText>
                  <Typography variant='body1Bold'>ADC:</Typography>
                  <List sx={{ paddingLeft: '16px' }}>
                    <ListItemText>- 4 kanály pro analogové vstupy.</ListItemText>
                    <ListItemText>- Rozlišení 8 bitů (hodnoty 0–255).</ListItemText>
                    <ListItemText>
                      - Možnost konfigurace vstupních režimů:
                      <List sx={{ paddingLeft: '16px' }}>
                        <ListItemText>- Jednotlivé kanály (single-ended).</ListItemText>
                        <ListItemText>- Diferenciální vstupy.</ListItemText>
                        <ListItemText>- Kombinovaný režim.</ListItemText>
                      </List>
                    </ListItemText>
                  </List>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1Bold'>DAC:</Typography>
                  <List sx={{ paddingLeft: '16px' }}>
                    <ListItemText>- Jednokanálový digitálně-analogový převodník.</ListItemText>
                    <ListItemText>- Rozlišení 8 bitů.</ListItemText>
                  </List>
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1Bold'>Komunikace:</Typography> - Rozhraní I2C s možností
                  adresace až 8 zařízení ma jedné sběrnici.
                </ListItemText>
                <ListItemText>
                  <Typography variant='body1Bold'>Napájení:</Typography>
                  <List sx={{ paddingLeft: '16px' }}>
                    <ListItemText>- Provozní napětí: 2,5–6 V.</ListItemText>
                    <ListItemText>
                      - Typické referenční napětí: 3,3 V nebo 5 V (závisí na aplikaci).
                    </ListItemText>
                  </List>
                </ListItemText>
              </List>
            </Typography>
          </Box>
        </List>
      </Paper>
      <Paper>
        <Typography variant='h2'>Použití knihovny</Typography>
        <List>
          <Paper>
            <ListItemText>
              1. Inicializace: Nejprve je třeba zavolat funkci PCF8591_Init, která inicializuje
              komunikaci přes I2C.
            </ListItemText>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeInitLibrary}
            </SyntaxHighlighter>
            <List>
              <ListItemText>
                - enableAnalogOutput: Nastavte na 1 pro povolení výstupu DAC, 0 pro deaktivaci.
              </ListItemText>
              <ListItemText>
                - inputMode: Konfigurace vstupního režimu (např. jednostranný nebo diferenciální).
              </ListItemText>
              <ListItemText>
                - referenceVoltage: Referenční napětí pro převody ADC. Při úspěchu vrací: HAL_OK,
                jinak chybový stav.
              </ListItemText>
            </List>
          </Paper>
          <Paper>
            <ListItemText>2. Čtení hodnot ADC z konkrétního kanálu lze použít funkci.</ListItemText>
            <ListItemText>
              Pozor funkce vrací ukazatele na adresu kde je hodnota uložená!
            </ListItemText>
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
            <ListItemText>
              3. Nastavení DAC pro vygenerování analogové hodnoty pomocí DAC lze použít funkci.
            </ListItemText>
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
        <Typography variant='h2'>Příklad implementace</Typography>
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
