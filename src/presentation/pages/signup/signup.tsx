import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: state }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" data-testid="name" name="name" placeholder="Digite seu nome" />
          <Input type="email" data-testid="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" data-testid="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" data-testid="passwordConfirmation" name="passwordConfirmation" placeholder="Repita sua senha" />
          <button type="submit" data-testid="submit" disabled>Criar conta</button>
          <Link to="/login" className={Styles.link}>Voltar para login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
