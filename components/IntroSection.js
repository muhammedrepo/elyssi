export default function IntroSection() {
  return (
    <div className="mb-16 text-center sm:mb-20 lg:mb-24">
      <div className="mx-auto w-full sm:w-3/4">
        <h3 className="mx-auto text-center font-butler text-2xl text-secondary sm:text-3xl sm:leading-tight md:text-4.5xl lg:text-5xl">
          Elyssi is a Stockholm-based, fashion and creativity company
        </h3>
        <p className="mx-auto mt-8 mb-12 font-hk text-secondary sm:mt-10 md:text-lg lg:pb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div
          className="relative mx-auto flex h-64 cursor-pointer items-center justify-center bg-cover bg-center bg-no-repeat sm:h-80 md:h-[25rem] lg:h-[32rem]"
          style={{ backgroundImage: `url(/images/video-image.png)` }}>
          <i className="bx bx-play-circle z-0 text-9xl text-white opacity-75"></i>
        </div>
      </div>
    </div>
  )
}
