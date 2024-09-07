import { PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@mui/material/styles'
import classNames from 'classnames/bind'
import Cookies from 'js-cookie'
import { LogoutModal } from '@/components'
import { ROUTES_DATA } from '@/constants/routes'
import { AppBar, Drawer, DrawerHeader } from './ProtectedLayoutStyle'

import style from './Protected.module.scss'

const cn = classNames.bind(style)

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const [logoutOpen, setLogoutOpen] = useState<boolean>(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    Cookies.remove('authToken')
    localStorage.removeItem('welcomeMessageShown')
    window.location.reload()
  }

  return (
    <>
      <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} onLogout={handleLogout} />
      <Box sx={{ display: 'flex' }} className={cn('protected')}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className={cn('protected__toolbar')}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: 'none' },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Box className={cn('protected__header')}>
              <Typography variant="h2" noWrap component="div">
                Pharmacy
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {ROUTES_DATA.map((text, index) => (
              <ListItem key={Number(index)} disablePadding sx={{ display: 'block' }}>
                <Link to={text.path} className={cn('protected__link')}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                      open
                        ? {
                            justifyContent: 'initial',
                          }
                        : {
                            justifyContent: 'center',
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: 'auto',
                            },
                      ]}
                    >
                      <text.icons />
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={[
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding sx={{ display: 'block', color: '#000' }}>
              <ListItemButton
                onClick={() => setLogoutOpen(true)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Log out"
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  )
}
