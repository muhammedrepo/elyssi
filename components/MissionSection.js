export default function MissionSection() {
  return (
    <div
      className="mb-16 w-full bg-cover bg-center bg-no-repeat sm:mb-20 lg:mb-24"
      style={{ backgroundImage: 'url(/images/bg-mission.png)' }}>
      <div className="mx-auto flex w-5/6 flex-col justify-between py-16 text-center sm:w-3/4 sm:text-left md:w-5/6 md:flex-row md:py-20">
        <div className="md:w-1/2">
          <div className="px-4">
            <h4 className="font-butler text-3xl font-medium text-white">
              Our Mission
            </h4>
            <p className="pt-6 font-hk text-base text-white md:pt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="pt-12 md:w-1/2 md:pt-0">
          <div className="px-4">
            <h4 className="font-butler text-3xl font-medium text-white">
              Our Vision
            </h4>
            <p className="pt-6 font-hk text-base text-white md:pt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
