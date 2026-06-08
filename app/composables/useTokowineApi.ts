const apiBaseUrl = 'https://api.ezlink.dev/tokowinepop/web'

export type TokowineCategory = {
  id: string
  category: string
  logourl: string
  subcategory: Array<{
    id: string
    subcategory: string
    logourl: string
  }>
}

type CategoryResponse = {
  data?: {
    category?: TokowineCategory[]
  }
  success: boolean
  message: string
}

export type FooterData = {
  businessname: string
  address: string
  email: string
  hpno: string
  instagram: string
  facebook: string
  tiktok: string
  tokopedia: string
  shopee: string
  lat: string
  lon: string
}

type FooterResponse = {
  data?: FooterData
  success: boolean
  message: string
}

export type HomeData = {
  slider: Array<{
    promoname: string
    bannerimgurl: string
  }>
  promo: Array<{
    id: string
    promoname: string
    bannerurl: string
    isdetail: string
  }>
  delivery: string
  deliverybannerurl: string
  lat: string
  lon: string
  bestcoll: Array<{
    id: string
    brand: string
    logourl: string
  }>
  bestseller: Array<{
    id: string
    brandname: string
    productname: string
    stock: string
    price: string
    promoprice: string | null
    slug: string
    productimageurl: string
  }>
}

type HomeResponse = HomeData | {
  data?: HomeData
  success?: boolean
  message?: string
}

export type ProductDetailData = {
  id: number
  sku: string
  productname: string
  brandname: string
  category: string
  subcategory: string
  price: number
  productdesc: string
  weight: number
  stock: string
  slug: string
  promoprice: string | null
  images: Array<{
    imageurl: string
    mainimage: number
  }>
}

type ProductDetailResponse = {
  data?: ProductDetailData
  success: boolean
  message: string
}

export const fetchTokowineCategories = async () => {
  const response = await $fetch<CategoryResponse>(`${apiBaseUrl}/category`)
  return response.data?.category || []
}

export const fetchTokowineFooter = async () => {
  const response = await $fetch<FooterResponse>(`${apiBaseUrl}/footer`)
  return response.data || null
}

export const fetchTokowineHome = async () => {
  const response = await $fetch<HomeResponse>(`${apiBaseUrl}/home`)
  if ('data' in response && response.data) return response.data
  return response as HomeData
}

export const fetchTokowineProductDetail = async (slug: string) => {
  const response = await $fetch<ProductDetailResponse>(`${apiBaseUrl}/productdetail`, {
    params: { slug }
  })
  return response.data || null
}

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const formatRupiahValue = (value: string | number | null) => {
  if (value === null || value === '') return ''
  const numericValue = Number(value)
  if (Number.isNaN(numericValue)) return String(value)
  return `Rp ${numericValue.toLocaleString('id-ID')}`
}

export const hasPromoPrice = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') return false
  const numericValue = Number(value)
  return !Number.isNaN(numericValue) && numericValue > 0
}

export const mapsUrl = (lat?: string | null, lon?: string | null) => {
  if (!lat || !lon) return '#'
  return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lon}`)}`
}

export const whatsappUrl = (phone?: string | null) => {
  const digits = (phone || '').replace(/\D/g, '')
  if (!digits) return '#'
  const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  return `https://wa.me/${normalized}`
}
