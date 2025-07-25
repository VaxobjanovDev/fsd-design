import React from 'react'
import { Posts } from 'entities/posts/ui/posts'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from 'features/language-switcher'
import { ThemeSwitcher } from 'features/theme-switcher'

const PostsPage = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <h1> {t('Hi welcome back')}</h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <Posts />
    </>
  )
}

export default PostsPage
