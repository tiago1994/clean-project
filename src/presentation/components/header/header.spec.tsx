import React from 'react'
import { Header } from '@/presentation/components'
import { render, fireEvent, screen } from '@testing-library/react'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
