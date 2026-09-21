/** The Stripe wordmark, repeated in 17 of the prototypes. Size and colour come
 *  from whichever class the caller puts on it, exactly as in the originals —
 *  the path fills with `currentColor` unless a `fill` is passed. */
export function StripeWordmark({
  className,
  label = 'Stripe',
}: {
  className?: string
  label?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 25"
      xmlns="http://www.w3.org/2000/svg"
      {...(label ? { 'aria-label': label } : { 'aria-hidden': true })}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60 12.9C60 8.6 57.9 5.3 54 5.3C50.1 5.3 47.6 8.6 47.6 12.9C47.6 17.9 50.5 20.5 54.6 20.5C56.6 20.5 58.1 20 59.3 19.2V16C58.1 16.7 56.7 17.2 55 17.2C53.3 17.2 51.8 16.6 51.6 14.5H59.9C59.9 14.3 60 13.4 60 12.9ZM51.5 11.7C51.5 9.7 52.7 8.9 53.9 8.9C55.1 8.9 56.3 9.7 56.3 11.7H51.5ZM41.2 5.3C39.5 5.3 38.4 6.1 37.8 6.6L37.6 5.6H34V24.5L37.9 23.7V20.1C38.5 20.5 39.4 21.1 40.9 21.1C44.1 21.1 46.9 18.5 46.9 12.9C46.9 8 44 5.3 41.2 5.3ZM40.3 17.5C39.2 17.5 38.6 17.1 38.2 16.7L37.9 9.5C38.3 9.1 39 8.7 40 8.7C41.6 8.7 42.7 10.5 42.7 13.1C42.7 15.8 41.6 17.5 40.3 17.5ZM28.3 4.5L32.2 3.7V0.5L28.3 1.3V4.5ZM28.3 5.6H32.2V20.2H28.3V5.6ZM24.2 6.8L24 5.6H20.5V20.2H24.4V10C25.3 8.8 26.8 9 27.3 9.2V5.6C26.7 5.4 25 5.1 24.2 6.8ZM16.5 2L12.7 2.8V16.1C12.7 18.6 14.6 20.5 17.1 20.5C18.5 20.5 19.5 20.3 20 20V16.8C19.6 17 16.5 17.8 16.5 15.3V9H20V5.6H16.5V2ZM4.7 9.8C4.7 9.2 5.2 8.9 6 8.9C7.1 8.9 8.6 9.2 9.7 9.9V6.2C8.5 5.7 7.3 5.3 6 5.3C2.6 5.3 0.5 7 0.5 9.9C0.5 14.5 6.7 13.8 6.7 15.8C6.7 16.5 6.1 16.8 5.2 16.8C4 16.8 2.4 16.3 1.1 15.5V19.2C2.6 19.9 4 20.2 5.2 20.2C8.7 20.2 10.9 18.6 10.9 15.7C10.9 10.7 4.7 11.5 4.7 9.8Z"
      />
    </svg>
  )
}
