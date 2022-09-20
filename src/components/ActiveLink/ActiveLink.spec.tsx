import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <ActiveLink
        href="/"
        activeClassName='active'
      >
        <a href="">Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toBeInTheDocument();
  })

  it('should receive active class if link is currently active', () => {
    const { getByText } = render(
      <ActiveLink
        href="/"
        activeClassName='active'
      >
        <a href="">Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toHaveClass('active')
  })
})