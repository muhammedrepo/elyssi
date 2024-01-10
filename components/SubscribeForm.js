export default function SubscribeForm() {
  return (
    <form className="pt-10 sm:pt-12">
      <div className="mx-auto flex w-5/6 flex-col items-center justify-center sm:w-3/4 sm:flex-row lg:w-3/5 xl:w-1/2">
        <label
          htmlFor="cta_email"
          className="relative block h-0 w-0 overflow-hidden">
          Email
        </label>
        <input
          type="email"
          name="cta_email"
          id="cta_email"
          placeholder="ENTER YOUR EMAIL"
          className="form-input border-white bg-transparent text-sm uppercase text-white placeholder-grey-dark"
        />
        <button
          type="button"
          className="primary-button mt-4 w-full sm:ml-5 sm:mt-0 sm:w-auto"
          aria-label="Subscribe button">
          SUBSCRIBE
        </button>
      </div>
    </form>
  )
}
