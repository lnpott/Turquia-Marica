const IMAGE_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC34jlTjYvblPnWg7zOI7PVTP71KJfm46WsNw_sU3X1HKEtYcCDezYnLsvgn5h6pJRPCKyfMQZdw084Yv7Ds1UAC5OYRxhLWRYN75cqu0IT4LunPqLhtyqp_sxwfN2DnVIjL0FA0cG6ZOqHjRjfVN1k2ZLKSul68BqBTP47loJqxm4xUK9DIifPohzTcQkJeGwv_rBIT054Rao_vRixkMqLGJu3mPIDT7NoRZRImtgZ62e8TKSn3cX5moOXmECv3lm7J-s'
const IMAGE_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBTeAaTNT7aG4fM-A82-0sxxFGrUbCKF7rE23wqoFjQUCVDoj-isExGnkUVxIWyYBiiG_nHHgEwy5t2QWex6GzHpPJQYpjqwj9Wr-YR0VQaIVbLhhUdkHfxlyEVN6LYNC7ePrg-uK7lTAYds1X3wDueHGHriO9gVjKw0C3sRDCLSgt5ySZdzLC2WDg1DuwvJ_VMCq9YbLkv7_fLKE8F8hCFUGUR0uaEPjRfO3_OzAp1wU9VorDcpgrNBID43VDAFTbQz-E'
const IMAGE_3 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAX8FG3nfQ_9o7iD0ElMyAaAaM1deW-6A4T5EaWvkxKFgnU1z2-vBY7FEu8vPRwRkscuNPnh2hX3Fgv0SwTRruqJVYxSwk_qVWR7kCEV-o81EVMWJppGZ4sQR-s834Md12Od-Nr1IYeDR3Sq1p4zGqvtyeKMc6nA9wpK5bUBf9GSePS4XwLidKw2fxhAzfPY5-2kDc_O0KMyRfQVeLN6cTVfFaz6G3Niq3Zj674WlBtvZugmP_oy22tploKINyzqyPzEto'

const ITEMS = [
  {
    src: IMAGE_1,
    alt: 'Experiência 1',
    label: 'Alegria que Contagia',
    className: 'col-span-1 md:col-span-2 row-span-2',
  },
  { src: IMAGE_2, alt: 'Experiência 2', className: 'col-span-1 row-span-1' },
  { src: IMAGE_3, alt: 'Experiência 3', className: 'col-span-1 row-span-1' },
]

function GallerySection() {
  return (
    <section className="w-full py-16 bg-surface-container-low px-4 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display-xl-mobile md:font-headline-lg text-display-xl-mobile md:text-headline-lg text-center text-primary mb-12">
          Momentos Turquia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] overflow-hidden">
          {ITEMS.map((item) => (
            <div
              key={item.alt}
              className={`${item.className} rounded-2xl overflow-hidden shadow-lg relative group`}
            >
              <img
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={item.src}
              />
              {item.label && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-headline-md font-bold">{item.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
