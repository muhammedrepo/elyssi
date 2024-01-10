export default function Search({ submitHandler, setQuery }) {
  return (
    <form
      className="relative mb-16 flex w-full items-center"
      onSubmit={submitHandler}>
      <label
        htmlFor="search_form"
        className="relative block h-0 w-0 overflow-hidden">
        Search
      </label>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        id="search_form"
        placeholder="Search the Blog"
        className="form-input pr-10 text-base text-grey-darkest transition-all"
      />
      <button
        className="absolute right-0 top-0 mt-4 mr-3 focus:outline-none"
        aria-label="Search button">
        <i className="bx bx-search text-2xl"></i>
      </button>
    </form>
  )
}
