import { render, screen, fireEvent } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/react')
jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  }
})

describe('SubscribeButton component', () => {
  it('should render correctly', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    })

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  })

  it('should redirect user to sign in whent not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    })
    const signInMocked = jest.mocked(signIn);

    render(
      <SubscribeButton />
    )

    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  })

  it('should redirect to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)
    const { push } = useRouterMocked()
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expire'
      },
      status: 'authenticated'
    })

    render(
      <SubscribeButton />
    )

    const subscribeButton = screen.getByText('Subscribe now');
    fireEvent.click(subscribeButton);

    expect(push).toHaveBeenCalledWith('/posts');
  })
})