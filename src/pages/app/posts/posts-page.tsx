import React from 'react'
import { Posts } from 'entities/posts/ui/posts'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from 'features/language-switcher'

export const PostsPage = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <h1> {t('Hi welcome back')}</h1>
        <LanguageSwitcher />
      </div>
      <Posts />
    </>
  )
}
