export interface CartItem {
  productId: string
  title: string
  price: number
  image: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

const CART_STORAGE_KEY = 'shopping_cart'

export function getCart(): Cart {
  try {
    if (typeof window === 'undefined') {
      return { items: [] }
    }
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : { items: [] }
  } catch (error) {
    return { items: [] }
  }
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem): Cart {
  const cart = getCart()
  const existingItem = cart.items.find((i) => i.productId === item.productId)

  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.items.push(item)
  }

  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): Cart {
  const cart = getCart()
  cart.items = cart.items.filter((item) => item.productId !== productId)
  saveCart(cart)
  return cart
}

export function updateCartItemQuantity(productId: string, quantity: number): Cart {
  const cart = getCart()
  const item = cart.items.find((i) => i.productId === productId)

  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId)
    } else {
      item.quantity = quantity
    }
  }

  saveCart(cart)
  return cart
}

export function clearCart(): Cart {
  const cart: Cart = { items: [] }
  saveCart(cart)
  return cart
}

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartItemCount(cart: Cart): number {
  return cart.items.reduce((count, item) => count + item.quantity, 0)
}
