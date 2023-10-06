import { useContext, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { Language, UiContext } from 'fleed/context/ui';
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export const LANGS:Language[] = [
  {
    value: 'en',
    label: 'English',
    icon: '/flags/US.svg',
  },
  {
    value: 'es',
    label: 'Spanish',
    icon: '/flags/CO.svg',
  },
 
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { setLanguage , state : { language} }  = useContext(UiContext)
  const router = useRouter()
  console.log(router)
  const handleOpen = (event:React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
    console.log(event)
    
  };

  const handleClose = () => {
    setOpen(null);
  
  };

  const changeLanguage = (language:Language) => {
  
      router.replace(router.asPath, router.asPath, { locale: language.value })
    setLanguage(language)
    handleClose()
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={language.icon} alt={language.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value}  onClick={()=> changeLanguage(option as Language)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
