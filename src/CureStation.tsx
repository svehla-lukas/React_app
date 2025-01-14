import { Box, IconButton, Link as MuiLink, Paper, Typography } from '@mui/material'

import GitHubIcon from '@mui/icons-material/GitHub'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CureStation = () => {
  const commonSyntaxStyle = {
    tabSize: 2,
    whiteSpace: 'pre-wrap',
  }

  return (
    <Box>
      <Typography variant='h1'>Cure station Git repository: </Typography>
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
          variant='body1'
          href='https://github.com/svehla-lukas/Cure_Station/tree/main/Core'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Typography variant='body1'>GitHub: github.com/svehla-lukas/Cure_Station</Typography>
        </MuiLink>
      </Box>
      <Box>
        <Paper>
          <Typography variant='body1'>
            Tento článek pojednává o stavbě topení do vztvryovací stanice, pro resinovou tiskárnu
            {/* This pages snap the process of develop Wash and Cure station for my resin printer */}
            <strong>AnyCubic Photon Mono 2</strong>.
          </Typography>
          <Typography variant='body1'>
            {/* I start with bought station <strong>Sunlu UV Resin Curing Box</strong>. */}S
            tiskárnou jsem si pořídil vytvrzovací box <strong>Sunlu UV Resin Curing Box</strong>.
          </Typography>
          <Typography variant='body1'>
            Dostal jsem potřebu modely sušit a zároveň je vytvrzovat při zvýšené teplotě, což by
            mohlo zvýšit jejich pevnost. Pustil jsem se tedy do stavby přídavného topení s regulací
            teploty.
            {/* I need to dry the models, and I would like to cure at higher temperatures. So I decide
            to build heater with temperature regulation. */}
          </Typography>
          <Typography variant='body1'>
            Umývací stanici jsem si již provizorně postavil, pokud bude čas tak přijde její
            vylepšení a hezčí implementace.
          </Typography>
        </Paper>
        <Box
          component='img'
          src='https://cdn3.botland.cz/121938/sunlu-uv-resin-curing-box-pro-suseni-a-vytvrzovani-pryskyricnych-tisku-sunlu.jpg'
          alt='Sunlu UV Resin Curing Box'
          sx={{
            width: { xs: '100%', sm: '300px' },
            height: 'auto',
            borderRadius: '8px',
          }}
        />
        <Paper>
          <Typography variant='body1'>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Pro projekt jsem sáhnul pro STM32 MINI, osazené porocesorem LQFP48</li>
              <li>LCD display a Encoder s tlačítkem pro pohyb v menu</li>
              <li>
                Pro ohřev jsem použil vyřazený fén na vlasy z něhož poslouží topná spirála a
                ventilátor
              </li>
              <li>Teplotu měřím thermistorem vybraným z NTB baterie</li>
            </ul>
          </Typography>

          <Box
            component='img'
            src='embedded/rawControl.webp'
            alt='raw control.webp'
            sx={{
              width: { xs: '100%', sm: '500' },
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Paper>
        <Paper>
          <Typography variant='h1'>LCD</Typography>
          <Typography variant='body1'>
            Ze zásob jsem vytáhnul LCD displej - 16x2 znaků, s I2C komunikaci.
          </Typography>
          <Typography variant='body1'>
            Pro komunikaci jsem využil knihovnu od Khaled Magdy
            <MuiLink
              variant='body1'
              href='https://deepbluembedded.com/stm32-i2c-lcd-library-example-16x2-20x4-multiple-lcds/'
            >
              {' '}
              DeepBlueMbedded
            </MuiLink>
            <Typography variant='h1'>Menu</Typography>
          </Typography>
          <Typography variant='body1'>
            V menu se pohybuje pomocí encode a uživatel zde nastaví čas a požadovanou teplotu.
            {/* <ul>
              <li>Čas odpočtu</li>
              <li>Požadovanou teplotu</li>
            </ul> */}
            <Typography>Menu je složené z itemů s struktůrou:</Typography>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeMenu}
            </SyntaxHighlighter>
            Díki tomu se zle pohybovat mezi v menu pomocí pointeru na rodiře a děti atd..
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeMenuChange}
            </SyntaxHighlighter>
          </Typography>
        </Paper>
        <Paper>
          <Typography variant='h1'>Encoder</Typography>
          <Typography variant='body1'>
            První myšlenkou bylo samozřejmě použití TIM v módu encoder. Mám však špatné zkušenosti s
            propojením enkodéru z Číny s TIM. Tento mód nefunguje spolehlivě, a proto jsem našel
            lepší řešení s použitím GPIO vstupů. Bohužel jsem si nezapsal zdroj, takže jej sem
            vložím, až jej znovu naleznu.
            <Typography variant='body1'>
              Oproti knihovně TIM se zde používají vstupy z GPIO v módu External Interrupt Mode.
              Implementace je tedy více v rukou programátora. Při přerušení kontroluje, zda se
              hodnota na daném pinu změnila. Pokud ano, následuje porovnání s hodnotou druhého
              vstupu enkodéru a vyhodnocení směru. Posledním krokem je uložení aktuální hodnoty do
              paměti.
            </Typography>
            <Typography variant='body1'>
              Lze implementovat debounce, ale nestalose mi že by encoder přeskakoval.
            </Typography>
            <SyntaxHighlighter
              language='c'
              style={darcula}
              customStyle={commonSyntaxStyle}
              showLineNumbers
            >
              {codeEncoderSnippet}
            </SyntaxHighlighter>
          </Typography>
        </Paper>
        <Paper>
          <Typography variant='h1'>PI Regulátor</Typography>
          <Typography variant='body1'>
            Pro udržování teploty byl implementován PI regulátor. Vzhledem k tomu, že teplota má
            velkou setrvačnost, byl zvolen krok 0,5 sekundy. Pro I složku byl přidán anti-windup,
            což je saturace I složky, aby se nemohla integrovat do nekonečna.
          </Typography>
          <SyntaxHighlighter
            language='c'
            style={darcula}
            customStyle={commonSyntaxStyle}
            showLineNumbers
          >
            {codePiRegulator}
          </SyntaxHighlighter>
          <Typography variant='body1'>
            Výstup regulátoru je normalizován do hodnoty 0–1. Tato hodnota se zapisuje do střídy PWM
            generátoru, který ovládá výkon na topné spirále. Pokud regulace spadne do záporných
            hodnot, probíhá pouze chlazení ventilátorem.
          </Typography>
        </Paper>
      </Box>
      <Paper>
        <Typography variant='h1'>Výkonová elektronika</Typography>
        <Typography variant='body1'>
          Pro napájení topného tělesa i ventilátoru je nutné přidat externí 12 V zdroj, ke kterému
          se vloží step down měnič (Buck convertor) pro napájení mikrokontroléru.
        </Typography>
        <Typography variant='body1'>
          Topnou spirálu je nutné spouštět přerušovaně, čehož lze docilit buď pomocí relé nebo
          výkonového tranzisotru. Vzhledem k povaze regulátoru jsem se zvolil variantu tranzisotru.
          Mos-Fet budew spínán přes pomocný tranzistor PWM signálem z mikrokontroléru, takto můžu
          plynule regulovat v celém rozsahu napájecího napětí.
        </Typography>
      </Paper>
    </Box>
  )
}

const codeMenu = `typedef struct MenuItem{
  char name[16];
  struct MenuItem *parent;
  struct MenuItem **children;
  uint8_t numChildren;
  char action[6];
  uint16_t value;
} MenuItem;`

const codeMenuChange = `if (currentMenuItem->children && currentMenuItem->numChildren > 0) {
  currentMenuItem = currentMenuItem->children[0];
} else if (currentMenuItem->parent) {
  currentMenuItem = currentMenuItem->parent;
}`
const codeEncoderSnippet = `void handleEncoderInterrupt(uint16_t GPIO_Pin) { 
  if (GPIO_Pin == GPIO_PIN_0) {
  // CCW decoder
  B = HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_1);
  if (B != prevB) {
    if (B == GPIO_PIN_SET) {
      if (A == GPIO_PIN_RESET) {
        encoderCallback(MENU_LEFT);
      }
    }
    prevB = B;
  }
  ...
}`

const codePiRegulator = `
float error = setpoint - measuredValue;
// P
float proportional = pid->kp * error; 
// I
pid->integral += error * dt;
// anti wind-up
if (pid->integral > errorLimit) {
  pid->integral = errorLimit;
} else if (pid->integral < -errorLimit) {
  pid->integral = -errorLimit;
}
float integral = pid->ki * pid->integral;
// Output
return  proportional + integral;`
export default CureStation
