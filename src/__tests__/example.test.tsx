/**
 * Example unit test file
 * This demonstrates how to write tests for React components
 */

import { render, screen } from '@/__tests__/utils/test-utils'
import '@testing-library/jest-dom'

// Example component to test
function ExampleComponent({ title, onClick }: { title: string; onClick?: () => void }) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

describe('ExampleComponent', () => {
  it('renders the title', () => {
    render(<ExampleComponent title="Hello World" />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders a button', () => {
    render(<ExampleComponent title="Test" />)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', async () => {
    const handleClick = jest.fn()
    render(<ExampleComponent title="Test" onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /click me/i })
    button.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('has correct accessibility attributes', () => {
    render(<ExampleComponent title="Test" />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Test')
  })
})
