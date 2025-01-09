import '@mui/material/Paper'
import '@mui/material/Link'

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    codeBox: true
  }
}

// not function :(
// declare module '@mui/material/Link' {
//   interface LinkPropsVariantOverrides {
//     drawer: true
//   }
// }

declare module '@mui/material/styles' {
  interface TypographyVariants {
    codeName: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    codeName?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    codeName: true
  }
}
