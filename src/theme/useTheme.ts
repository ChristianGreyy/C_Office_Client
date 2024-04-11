import { useEffect, useState } from 'react'
import _ from 'lodash'

import { ALL_THEMES, CURRENT_THEME } from '@/configs'
import { getFromLS, setToLS } from '@/utils'
import { IAppTheme } from '@/interfaces'

export const useTheme = () => {
  const themes = getFromLS(ALL_THEMES)
  const [theme, setTheme] = useState<IAppTheme>(themes)
  const [themeLoaded, setThemeLoaded] = useState(false)

  const setCurrentTheme = (theme: IAppTheme) => {
    setToLS(CURRENT_THEME, theme)
    setTheme(theme)
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.theme, 'font'))
    return allFonts
  }

  useEffect(() => {
    const localTheme = getFromLS(CURRENT_THEME)
    !localTheme ? setTheme(themes?.theme?.light) : setTheme(localTheme)
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, themes, setCurrentTheme, getFonts }
}
