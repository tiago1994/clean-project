import React, { memo, useContext } from 'react'
import Styles from './header.styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const logout = (): any => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{ getCurrentAccount().name }</span>
          <a data-testid="logout" onClick={logout} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
